import { NextResponse } from "next/server";
import { fetchAllCollectionItems } from "@/lib/webflow";

export const runtime = "nodejs";

export async function GET() {
  const collectionId = process.env.WEBFLOW_COLLECTION_ID;
  if (!collectionId) {
    return NextResponse.json(
      { error: "WEBFLOW_COLLECTION_ID not configured" },
      { status: 500 }
    );
  }

  try {
    const items = await fetchAllCollectionItems(collectionId);
    return NextResponse.json({ ok: true, count: items.length, items });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch careers";
    console.error("Careers fetch error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
