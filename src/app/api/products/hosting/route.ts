import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const type = (url.searchParams.get("type") || "linux") as
    | "linux"
    | "wordpress"
    | "joomla";

  const payload = {
    tabDescription:
      type === "linux"
        ? "Linux tabanlı projeler için ideal."
        : type === "wordpress"
          ? "WordPress siteleriniz için optimize edilmiştir."
          : "Joomla altyapısı ile uyumlu plan.",
  };

  return Response.json(payload, { status: 200 });
}

