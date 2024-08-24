import clsx from "clsx";
import { ComponentProps } from "react";

type Props = ComponentProps<"img"> & {
  image?: SpotifyApi.ImageObject;
};

export function SpotifyImage({ image, alt, className, ...props }: Props) {
  if (!image) {
    return <div className={clsx(className, "bg-gray-950")} />;
  }

  return (
    <img
      src={image.url}
      height={image.height}
      width={image.width}
      alt={alt}
      className={className}
      {...props}
    />
  );
}
