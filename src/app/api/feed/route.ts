const MEDIUM_FEED_URL = "https://medium.com/feed/@info_69552";

export async function GET() {
  const res = await fetch(MEDIUM_FEED_URL, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return new Response("Failed to fetch feed", { status: 502 });
  }

  const xml = await res.text();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}
