export const config = {
  spotify: {
    endpoints: {
      authorise: "https://accounts.spotify.com/authorize",
      token: "https://accounts.spotify.com/api/token",
      me: "https://api.spotify.com/v1/me",
      playlists: "https://api.spotify.com/v1/playlists",
      users: "https://api.spotify.com/v1/users",
    },
    details: {
      scope: "user-read-private user-read-email",
      challengeMethod: "S256",
      redirectUri: "/api/auth/callback",
    },
  },
};
