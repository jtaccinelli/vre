import { type ComponentProps } from "react";

type Props = ComponentProps<"img"> & {
  image?: Image;
  url?: string | null;
};

export function SpotifyImage({ image, url, ...props }: Props) {
  const src = url ?? image?.url;
  if (!src) return <div {...props}></div>;

  return (
    <img
      src={src}
      width={image?.width}
      height={image?.height}
      {...props}
    />
  );
}
