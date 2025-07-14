import {
  type AppLoadContext,
  createCookie,
  type Session,
  type SessionStorage,
} from "react-router";

import { createWorkersKVSessionStorage } from "@react-router/cloudflare";

export class SessionHandler {
  // -- CLASS STATIC VARIABLES & METHODS

  static COOKIE_KEY = "__session";
  static COOKIE_SECRET = "r3m1xr0ck5";

  static KEY__ACCESS_TOKEN = "__spotifyAccessToken";
  static KEY__REFERSH_TOKEN = "__spotifyRefreshToken";
  static KEY__EXPIRES_AT = "__spotifyExpiresAt";
  static KEY__ROOM_ID = "__spotifyRoomId";
  static KEY__CLIENT_ID = "__spotifyClientId";
  static KEY__CLIENT_SECRET = "__spotifyClientSecret";

  static async init(request: Request, kv: KVNamespace) {
    const cookie = createCookie(SessionHandler.COOKIE_KEY, {
      secrets: [SessionHandler.COOKIE_SECRET],
      sameSite: "lax",
    });

    const storage = createWorkersKVSessionStorage({
      cookie,
      kv,
    });

    const session = await storage
      .getSession(request.headers.get("Cookie"))
      .catch(() => storage.getSession());

    return new this(storage, session);
  }

  // -- CLASS INSTANCE VARIABLES & METHODS

  storage;
  session;

  constructor(storage: SessionStorage, session: Session) {
    this.storage = storage;
    this.session = session;
  }

  get id() {
    return this.session.id;
  }

  get has() {
    return this.session.has;
  }

  get get() {
    return this.session.get;
  }

  get flash() {
    return this.session.flash;
  }

  get unset() {
    return this.session.unset;
  }

  get set() {
    return this.session.set;
  }

  destroy() {
    return this.storage.destroySession(this.session);
  }

  commit() {
    return this.storage.commitSession(this.session);
  }
}
