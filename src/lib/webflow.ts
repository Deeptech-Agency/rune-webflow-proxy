const WEBFLOW_API_BASE = "https://api.webflow.com/v2";

function getHeaders() {
  const token = process.env.WEBFLOW_API_TOKEN;
  if (!token) throw new Error("Missing WEBFLOW_API_TOKEN environment variable");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export interface WebflowItem {
  id: string;
  cmsLocaleId?: string;
  lastPublished?: string | null;
  lastUpdated?: string | null;
  createdOn?: string | null;
  isArchived?: boolean;
  fieldData: Record<string, unknown>;
}

interface WebflowListResponse {
  items: WebflowItem[];
  pagination?: {
    limit?: number;
    offset?: number;
    total?: number;
  };
}

function buildPaginatedUrl(collectionId: string, offset: number, limit: number): string {
  const url = new URL(`${WEBFLOW_API_BASE}/collections/${collectionId}/items`);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));
  return url.toString();
}

export async function fetchAllCollectionItems(collectionId: string): Promise<WebflowItem[]> {
  const limit = 100;
  let offset = 0;
  const allItems: WebflowItem[] = [];

  while (true) {
    const url = buildPaginatedUrl(collectionId, offset, limit);
    const res = await fetch(url, {
      headers: getHeaders(),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Webflow list items failed: ${res.status} ${res.statusText} - ${body}`);
    }

    const data = (await res.json()) as WebflowListResponse;
    const items = data.items ?? [];
    allItems.push(...items);

    const total = data.pagination?.total ?? 0;
    if (offset + limit >= total) break;
    offset += limit;
  }

  return allItems;
}

export async function fetchCollectionItem(
  collectionId: string,
  itemId: string
): Promise<WebflowItem | null> {
  const url = `${WEBFLOW_API_BASE}/collections/${collectionId}/items/${itemId}`;
  const res = await fetch(url, {
    headers: getHeaders(),
    next: { revalidate: 60 },
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Webflow get item failed: ${res.status} ${res.statusText} - ${body}`);
  }

  return (await res.json()) as WebflowItem;
}
