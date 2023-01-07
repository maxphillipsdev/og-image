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

    const hasSpace = searchParams.has("space");

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#151718",
            fontFamily: "JetBrains Mono",
            fontWeight: "400",
            fontSize: "48px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              color: "#E93D82",
              paddingRight: hasSpace ? "1rem" : "unset",
            }}
          >
            ~/maxphillipsdev
          </span>
          {hasTitle && (
            <span
              style={{
                color: "#FEECF4",
              }}
            >
              {title}
            </span>
          )}
        </div>
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
