import { NextResponse } from "next/server";
import { fetchCollectionItem } from "@/lib/webflow";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const collectionId = process.env.WEBFLOW_COLLECTION_ID;
  if (!collectionId) {
    return NextResponse.json(
      { error: "WEBFLOW_COLLECTION_ID not configured" },
      { status: 500 }
    );
  }

  try {
    const item = await fetchCollectionItem(collectionId, id);
    if (!item) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, item });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch career";
    console.error("Career fetch error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
