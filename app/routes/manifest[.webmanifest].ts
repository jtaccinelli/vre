import { json } from "@remix-run/cloudflare";

export const loader = () => {
  return json(
    {
      short_name: "PWA",
      name: "Remix PWA",
      start_url: "/",
      display: "standalone",
      background_color: "#d3d7dd",
      theme_color: "#c34138",
      icons: [
        {
          src: "icons/ios/16.png",
          sizes: "16x16",
        },
        {
          src: "icons/ios/20.png",
          sizes: "20x20",
        },
        {
          src: "icons/ios/29.png",
          sizes: "29x29",
        },
        {
          src: "icons/ios/32.png",
          sizes: "32x32",
        },
        {
          src: "icons/ios/40.png",
          sizes: "40x40",
        },
        {
          src: "icons/ios/50.png",
          sizes: "50x50",
        },
        {
          src: "icons/ios/57.png",
          sizes: "57x57",
        },
        {
          src: "icons/ios/58.png",
          sizes: "58x58",
        },
        {
          src: "icons/ios/60.png",
          sizes: "60x60",
        },
        {
          src: "icons/ios/64.png",
          sizes: "64x64",
        },
        {
          src: "icons/ios/72.png",
          sizes: "72x72",
        },
        {
          src: "icons/ios/76.png",
          sizes: "76x76",
        },
        {
          src: "icons/ios/80.png",
          sizes: "80x80",
        },
        {
          src: "icons/ios/87.png",
          sizes: "87x87",
        },
        {
          src: "icons/ios/100.png",
          sizes: "100x100",
        },
        {
          src: "icons/ios/114.png",
          sizes: "114x114",
        },
        {
          src: "icons/ios/120.png",
          sizes: "120x120",
        },
        {
          src: "icons/ios/128.png",
          sizes: "128x128",
        },
        {
          src: "icons/ios/144.png",
          sizes: "144x144",
        },
        {
          src: "icons/ios/152.png",
          sizes: "152x152",
        },
        {
          src: "icons/ios/167.png",
          sizes: "167x167",
        },
        {
          src: "icons/ios/180.png",
          sizes: "180x180",
        },
        {
          src: "icons/ios/192.png",
          sizes: "192x192",
        },
        {
          src: "icons/ios/256.png",
          sizes: "256x256",
        },
        {
          src: "icons/ios/512.png",
          sizes: "512x512",
        },
        {
          src: "icons/ios/1024.png",
          sizes: "1024x1024",
        },
      ],
    },
    {
      headers: {
        "Cache-Control": "public, max-age=600",
        "Content-Type": "application/manifest+json",
      },
    },
  );
};
