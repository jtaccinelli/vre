import { SpotifyHandler } from "@server/spotify";

export class PlaylistHandler {
  kv: KVNamespace;
  spotify: SpotifyHandler;

  constructor(kv: KVNamespace, spotify: SpotifyHandler) {
    this.kv = kv;
    this.spotify = spotify;
  }

  async get(id: string): Promise<Playlist | undefined> {
    const cached = await this.kv.get<Playlist>(id, { type: "json" });
    if (cached) return cached;

    const playlist = await this.spotify.fetchPlaylist(id);
    if (playlist) await this.store(playlist);
    return playlist;
  }

  async store(playlist: Playlist): Promise<void> {
    await this.kv.put(playlist.id, JSON.stringify(playlist));
  }
}
