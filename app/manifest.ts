import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Study Hive",
    short_name: "Study Hive",
    description:
      "Online tutoring by post-graduate professionals and medical students.",
    start_url: "/",
    display: "standalone",
    background_color: "#FEE2B0",
    theme_color: "#3D2418",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
