export const config = {
  spotify: {
    // Endpoints
    accessTokenEndpoint: "https://accounts.spotify.com/api/token",
    apiEndpoint: "https://api.spotify.com/v1",
    loginEndpoint: "https://accounts.spotify.com/authorize",
    // Auth Details
    clientId: "ebe9c3147cae485cbc84fe018fb6281b",
    clientSecret: "f2624dfb706547ab96a8283e584168f2",
    redirectUri: "/account/callback",
  },
  keys: {
    session: {
      accessToken: "spotify-accessToken",
      refreshToken: "spotify-refreshToken",
      fetchedOn: "spotify-fetchedOn",
    },
  },
};
