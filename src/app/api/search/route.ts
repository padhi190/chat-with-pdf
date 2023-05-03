import { Supabase } from '@/utils/supabase';

export async function POST(req: Request) {
  const { query, matches } = (await req.json()) as {
    query: string;
    matches: number;
  };

  console.log(query, matches);

  const input = query.replace(/\n/g, ' ');

  const res = await fetch('https://api.openai.com/v1/embeddings', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify({
      model: 'text-embedding-ada-002',
      input,
    }),
  });

  const json = await res.json();
  const embedding = json.data[0].embedding;
  console.log(embedding);

  const supabase = Supabase.getInstance();

  const { data: chunks, error } = await supabase.rpc('match_documents', {
    query_embedding: embedding,
    match_count: matches,
  });

  console.log(chunks);

  if (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }

  return new Response(JSON.stringify(chunks), { status: 200 });
}
