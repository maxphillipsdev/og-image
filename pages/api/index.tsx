import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const loadedFont = fetch(new URL("../../assets/jbm.ttf", import.meta.url)).then(
  (res) => res.arrayBuffer()
);

export default async function handler(req: NextRequest) {
  const fontData = await loadedFont;

  try {
    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "~/maxphillipsdev";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#151718",
            fontFamily: "JetBrains Mono",
            fontWeight: "400",
            fontSize: "48px",
            textAlign: "center",
          }}
        ></div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "JetBrains Mono",
            data: fontData,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}