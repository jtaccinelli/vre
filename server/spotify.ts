import { config } from "@app/config";

import { AuthHandler } from "./auth";

export class SpotifyHandler {
  accessToken;
  endpoints;

  constructor(auth: AuthHandler) {
    this.accessToken = auth.accessToken;
    this.endpoints = config.spotify.endpoints;
  }

  async fetch<Response>(endpoint: string, options: RequestInit = {}) {
    if (!this.accessToken) return undefined;

    const headers = new Headers(options?.headers ?? {});
    headers.set("Authorization", `Bearer ${this.accessToken}`);

    try {
      const response = await fetch(endpoint, {
        ...options,
        headers,
      });

      return await response.json<Response>();
    } catch (error) {
      console.error(error);
    }
  }

  async fetchUser(id: string) {
    console.log("id", id, typeof this?.fetch);
    return await this.fetch<User>(this.endpoints.users + `/${id}`);
  }

  async fetchCurrentUser() {
    return await this.fetch<CurrentUser>(config.spotify.endpoints.me);
  }

  async fetchPlaylist(id: string) {
    return await this.fetch<Playlist>(this.endpoints.playlists + `/${id}`);
  }

  async fetchUsersFromPlaylist(playlist: Playlist) {
    const tracks = playlist.tracks.items;
    const [...ids] = new Set(tracks.map((item) => item.added_by.id));
    const users = await Promise.all(ids.map(this.fetchUser.bind(this)));
    return users.filter((user) => !!user);
  }
}
