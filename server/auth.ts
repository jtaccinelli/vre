import { Buffer } from "node:buffer";
import { randomBytes } from "node:crypto";

import { SessionHandler } from "./session";
import { config } from "@app/config";
import { redirect } from "react-router";
import { RoomHandler } from "./room";

export class AuthHandler {
  static async init(
    request: Request,
    session: SessionHandler,
    room: RoomHandler,
  ) {
    return new this(request, session, room);
  }

  // -- CLASS INSTANCE VARIABLES & METHODS
  session: SessionHandler;
  room: RoomHandler;

  state: string;
  redirectUri: string;

  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  clientId: string;
  clientSecret: string;

  get basicAuthToken() {
    const token = `${this.clientId}:${this.clientSecret}`;
    return Buffer.from(token).toString("base64");
  }

  constructor(request: Request, session: SessionHandler, room: RoomHandler) {
    this.state = Buffer.from(randomBytes(48)).toString("hex");
    this.session = session;
    this.room = room;

    // Generate redirect uri based on application site
    const url = new URL(request.url);
    this.redirectUri = `${url.origin}${config.spotify.details.redirectUri}`;

    // Set values fetched from sessions
    this.accessToken = this.session.get(SessionHandler.KEY__ACCESS_TOKEN);
    this.refreshToken = this.session.get(SessionHandler.KEY__REFERSH_TOKEN);
    this.expiresAt = this.session.get(SessionHandler.KEY__EXPIRES_AT);
    this.clientId = this.session.get(SessionHandler.KEY__CLIENT_ID);
    this.clientSecret = this.session.get(SessionHandler.KEY__CLIENT_SECRET);
  }

  // -- SENDS USER TO AUTHORIZATION PLACE

  async authoriseUser(roomId: string) {
    const [room] = await this.room.get(roomId);
    if (!room) throw Error("No room found.");

    this.session.set(SessionHandler.KEY__ROOM_ID, room.id);
    this.session.set(SessionHandler.KEY__CLIENT_ID, room.clientId);
    this.session.set(SessionHandler.KEY__CLIENT_SECRET, room.clientSecret);

    const url = new URL(config.spotify.endpoints.authorise);

    url.searchParams.set("response_type", "code");
    url.searchParams.set("show_dialog", "true");
    url.searchParams.set("state", this.state);
    url.searchParams.set("redirect_uri", this.redirectUri);
    url.searchParams.set("client_id", room.clientId);
    url.searchParams.set("scope", config.spotify.details.scope);

    throw redirect(url.toString(), {
      headers: {
        "Set-Cookie": await this.session.commit(),
      },
    });
  }

  // -- FETCHES ACCESS TOKEN W/ USER CODE FROM AUTH

  async signUserIn(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    if (!code) throw Error("No Code Sent");

    const url = new URL(config.spotify.endpoints.token);

    const headers = new Headers();
    headers.set("Authorization", `Basic ${this.basicAuthToken}`);
    headers.set("Content-Type", "application/x-www-form-urlencoded");

    const body = new URLSearchParams();
    body.set("grant_type", "authorization_code");
    body.set("redirect_uri", this.redirectUri);
    body.set("code", code);

    const response = await fetch(url, {
      method: "POST",
      body: body.toString(),
      headers,
    });

    const data = await response.json<{
      expires_in: number;
      access_token: string;
      refresh_token: string;
    }>();

    if (!data.access_token) throw new Error(data.toString());

    const expiresAt = Date.now() + data.expires_in * 1000;

    this.session.set(SessionHandler.KEY__ACCESS_TOKEN, data.access_token);
    this.session.set(SessionHandler.KEY__REFERSH_TOKEN, data.refresh_token);
    this.session.set(SessionHandler.KEY__EXPIRES_AT, expiresAt);

    throw redirect("/", {
      headers: {
        "Set-Cookie": await this.session.commit(),
      },
    });
  }

  async refreshUserToken() {
    const url = new URL(config.spotify.endpoints.token);

    const headers = new Headers();
    headers.set("Authorization", `Basic ${this.basicAuthToken}`);
    headers.set("Content-Type", "application/x-www-form-urlencoded");

    const body = new URLSearchParams();
    body.set("grant_type", "refresh_token");
    body.set("refresh_token", this.refreshToken);

    const response = await fetch(url, {
      method: "POST",
      body: body.toString(),
      headers,
    });

    const data = await response.json<{
      expires_in: number;
      access_token: string;
    }>();

    if (!data.access_token) {
      await this.signUserOut();
    }

    const expiresAt = Date.now() + data.expires_in * 1000;

    this.session.set(SessionHandler.KEY__ACCESS_TOKEN, data.access_token);
    this.session.set(SessionHandler.KEY__EXPIRES_AT, expiresAt);

    throw redirect("/", {
      headers: {
        "Set-Cookie": await this.session.commit(),
      },
    });
  }

  async signUserOut() {
    this.session.unset(SessionHandler.KEY__ACCESS_TOKEN);
    this.session.unset(SessionHandler.KEY__REFERSH_TOKEN);
    this.session.unset(SessionHandler.KEY__EXPIRES_AT);
    this.session.unset(SessionHandler.KEY__CLIENT_ID);
    this.session.unset(SessionHandler.KEY__CLIENT_SECRET);

    throw redirect("/", {
      headers: {
        "Set-Cookie": await this.session.commit(),
      },
    });
  }
}
