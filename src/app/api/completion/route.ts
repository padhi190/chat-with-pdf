import endent from 'endent';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type Answer = {
  message: Message;
  finish_reason: string;
  index: number;
};

export async function POST(req: Request) {
  const { question, context } = (await req.json()) as {
    question: String;
    context: String;
  };

  console.log('context', context);

  const PROMPT = endent`You are a helpful AI assistant and finance expert that will answer based on Upland's annual report data. Use the text provided to form your     answer, but avoid copying word-for-word. Try to use your own words when possible. Be accurate, helpful, concise, and clear.
        
  ${context}
  `;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: PROMPT,
        },
        {
          role: 'user',
          content: question,
        },
      ],
      max_tokens: 150,
      temperature: 0.0,
    }),
  });

  if (res.status !== 200) {
    throw new Error('OpenAI API returned an error');
  }

  const data = await res.json();

  return new Response(JSON.stringify(data.choices[0] as Answer));
}
