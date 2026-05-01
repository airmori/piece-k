interface Env {
  REACTIONS_KV: KVNamespace;
}

interface ReactionCounts {
  heart: number;
  love: number;
  fire: number;
}

const VALID_TYPES = ["heart", "love", "fire"] as const;
type ReactionType = (typeof VALID_TYPES)[number];

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const slug = context.params.slug as string;
  const key = `reactions:${slug}`;

  const raw = await context.env.REACTIONS_KV.get(key);
  const counts: ReactionCounts = raw
    ? JSON.parse(raw)
    : { heart: 0, love: 0, fire: 0 };

  return jsonResponse(counts);
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const slug = context.params.slug as string;
  const key = `reactions:${slug}`;

  const { type } = await context.request.json<{ type: string }>();

  if (!VALID_TYPES.includes(type as ReactionType)) {
    return jsonResponse({ error: "Invalid reaction type" }, 400);
  }

  const raw = await context.env.REACTIONS_KV.get(key);
  const counts: ReactionCounts = raw
    ? JSON.parse(raw)
    : { heart: 0, love: 0, fire: 0 };

  counts[type as ReactionType] += 1;

  await context.env.REACTIONS_KV.put(key, JSON.stringify(counts));

  return jsonResponse(counts);
};
