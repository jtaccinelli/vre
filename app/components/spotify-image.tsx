import { type ComponentProps } from "react";

type Props = ComponentProps<"img"> & {
  image?: Image;
};

export function SpotifyImage({ image, ...props }: Props) {
  if (!image) return <div {...props}></div>;

  return (
    <img src={image.url} width={image.width} height={image.height} {...props} />
  );
}
