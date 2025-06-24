type Props = {
  className?: string;
};

export function SpotifyLogo({ className }: Props) {
  return (
    <img
      src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png"
      className={className}
      alt="Spotify Logo"
    />
  );
}
