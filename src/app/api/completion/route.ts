export async function POST(req: Request) {
    const { prompt } = (await req.json()) as { prompt: string };

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant and finance expert that will answer based on Upland's annual report data. Use the text provided to form your answer, but avoid copying word-for-word. Try to use your own words when possible. Be accurate, helpful, concise, and clear."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 150,
      temperature: 0.0,
    })
  });

  if (res.status !== 200) {
    throw new Error("OpenAI API returned an error");
  }
    
    const data = await res.json();

  return new Response(JSON.stringify(data.choices[0]))
}