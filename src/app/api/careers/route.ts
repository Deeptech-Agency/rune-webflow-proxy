import { NextResponse } from "next/server";
import { fetchAllCollectionItems } from "@/lib/webflow";

export const runtime = "nodejs";

const JOB_TYPE_MAP: Record<string, string> = {
  a5a323e8c3fb30370cc81ef83bdc52ea: "Full-time",
  fd77d1791abe035901eef4f985b60013: "Contract",
  "90b983dce2bd88c8393e8a398e4705a1": "Part-time",
  "1c1d1734922fdc29e9ad937671f2ba6a": "Intern",
};

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

    const enrichedItems = items.map((item) => {
      const rawType = item.fieldData?.["job-type"];
      return {
        ...item,
        fieldData: {
          ...item.fieldData,
          "job-type-label":
            JOB_TYPE_MAP[rawType as string] || (rawType ? String(rawType) : ""),
        },
      };
    });

    return NextResponse.json({
      ok: true,
      count: enrichedItems.length,
      items: enrichedItems,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch careers";
    console.error("Careers fetch error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
