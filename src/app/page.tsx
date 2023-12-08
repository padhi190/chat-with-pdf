"use client"

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Answer } from './api/completion/route';
import endent from 'endent';
import Chat, { Source, Message } from './components/chat';
import PDFViewer from './components/pdfviewer';

export default function Home() {

  const initialMessage: Message[] = [{
    role: 'assistant',
    content: "Hi, I'm your AI Assistant. What would you like to know from Upland's annual report?"
  }]

  const [messages, setMessages] = useState<Message[]>(initialMessage);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  // const messageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  },[])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!inputRef.current) return;
    // messageRef?.current?.scrollIntoView({ behavior: 'smooth' });

    const query = inputRef.current.value

    const newMessage: Message = {
      role: 'user',
      content: query
    }
    setMessages(prev => ([...prev ?? [], newMessage]));

    inputRef.current.value = '';

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
    setIsLoading(false);
    const answer = await answerResp.json() as Answer;
    console.log(answer);

    const newAnswer = answer.message;
    setMessages(prev => ([...prev ?? [], { content: newAnswer.content, role: newAnswer.role, sources }]))
    // messageRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="flex w-full gap-2">
      <div className="flex flex-col justify-between w-1/2 ">
        <div className='flex flex-col justify-between h-[40rem] bg-slate-50 rounded-xl px-4 py-8 gap-8'>
          <div className="pb-4 overflow-x-hidden">
            <Chat messages={messages} isLoading={isLoading} />
          </div>
          <form className="flex gap-4" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              placeholder="e.g. what was upland's revenue in 2022"
              id="query"
              className="w-full input"
              autoComplete="off"
            />
            <button className="bg-indigo-600 btn btn-primary">Send</button>
          </form>
        </div>
        <Card />
      </div>
      <div className="w-1/2 h-auto">
        <PDFViewer />
      </div>
    </div>
  );
}

function Card() {
  return <figure className="h-48 max-w-full p-8 mt-8 md:flex bg-slate-100 rounded-xl md:p-0">
    <img className="w-24 h-24 mx-auto rounded-full md:w-48 md:h-48 md:rounded-r-none md:rounded-l-xl" src="/pitra.jpeg" alt="" width="384" height="512" />
    <div className="pt-6 space-y-4 text-center md:p-6 md:text-left">
      <blockquote>
        <p className="font-medium text-slate-600 text-md">
        Here&apos;s how it works: The PDF document is divided into smaller sections, and each section is stored in a database with its corresponding embedding vector. When users ask questions, a similarity search is performed against the embedding vectors to retrieve relevant sections.
        </p>
      </blockquote>
      <figcaption className="font-medium">
        <div className="text-sky-500 dark:text-sky-400">
          Pitra Pamungkas
        </div>
        <div className="text-slate-700 dark:text-slate-500">
          Front End Engineer
        </div>
      </figcaption>
    </div>
  </figure>;
}

