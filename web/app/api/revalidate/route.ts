import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expectedSecret = process.env.REVIEW_TOKEN || process.env.REVALIDATE_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json({ message: "Invalid secret token" }, { status: 401 });
  }

  try {
    revalidatePath("/blog");
    revalidatePath("/blog/[slug]", "page");
    revalidatePath("/sitemap.xml");
    revalidateTag("blog-posts", "default");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
