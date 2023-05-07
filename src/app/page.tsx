"use client"

import { FormEvent, useState } from 'react';
import { Answer } from './api/completion/route';
import endent from 'endent';
import Chat, { Source, Message } from './components/chat';





export default function Home() {

  const initialMessage: Message[] = [{
    role: 'assistant',
    content: "Hi, I'm your AI Assistant. What do you want to know from Upland's annual report?"
  }]

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessage);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage: Message = {
      role: 'user',
      content: query
    }
    setMessages(prev => ([...prev ?? [], newMessage]));

    const searchResp = await fetch('/api/search', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query, matches: 3 })
    });
    const sources = await searchResp.json() as Source[];
    console.log(sources)

    const context = endent`
    Upland annual report data:
    ${sources?.map((d: any) => d.content).join("\n\n")}
    `;

    const answerResp = await fetch('/api/completion', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        context,
        question: query
      })
    })
    const answer = await answerResp.json() as Answer;
    console.log(answer);

    const newAnswer = answer.message;
    setMessages(prev => ([...prev ?? [], { content: newAnswer.content, role: newAnswer.role, sources }]))
    setQuery("");
  }

  return (
    <main className="flex flex-col items-center min-h-screen p-24 bg-slate-800">
      <div className="flex flex-col justify-between w-full gap-8 px-4 py-8 rounded-md h-[48rem] bg-slate-50">
        <div className="pb-4 overflow-auto">
          <Chat messages={messages} /> 
          </div>
        <form className='flex gap-4' onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="type your question"
            className="w-full input"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="btn btn-primary">Send</button>
        </form>
      </div>
    </main>
  );
}
