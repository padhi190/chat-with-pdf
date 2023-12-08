import { motion } from 'framer-motion';
import Typing from './typing';
import { useEffect, useRef } from 'react';

export interface Source {
  id: number;
  content: String;
  metadata: {
    loc: {
      lines: {
        to: Number;
        from: Number;
      };
      pageNumber: Number;
    };
    pdf: {
      info: {
        Title: String;
        Author: String;
        Creator: String;
        ModDate: String;
        Subject: String;
        Keywords: String;
        Producer: String;
        CreationDate: String;
        IsXFAPresent: Boolean;
        PDFFormatVersion: String;
        IsAcroFormPresent: Boolean;
      };
      version: String;
      totalPages: Number;
    };
    source: String;
  };
  similarity: Number;
}

export interface Message {
  role: 'user' | 'system' | 'assistant';
  content: String;
  sources?: Source[];
}

interface Props {
  messages: Message[];
  isLoading: boolean;
}

const ChatUser = ({ content }: { content: String }) => {
  return (
    <motion.div
      initial={{x: 2000}}
      animate={{x: 0 }}
      transition={{ type: 'spring', bounce: 0.1, duration: 0.6 }}
      className="chat chat-end">
      <div className="bg-indigo-600 chat-bubble chat-bubble-primary">{content}</div>
    </motion.div>
  );
};

const SourceComp = ({ source, index }: { source: Source; index: number }) => {
  return (
    <>
      <div className="mt-2 border rounded-lg collapse collapse-arrow border-slate-100">
        <input type="checkbox" className="peer" />
        <div className="collapse-title">
          {`Source ${index}: `}
          {source.metadata.source.split('/')[7]} page{` ${source.metadata.loc.pageNumber.toString()}`} {`(line ${source.metadata.loc.lines.from} - ${source.metadata.loc.lines.to})`}
        </div>
        <div
          className="collapse-content">
          <p>{source.content}</p>
        </div>
      </div>
    </>
  );
};

const ChatAssistant = ({
  content,
  sources,
}: {
  content: String;
  sources?: Source[];
}) => {
  return (
    <motion.div
      initial={{x: -2000}}
      animate={{ x: 0 }}
      transition={{ type: 'spring', bounce: 0.1, duration: 0.6 }}
      className="chat chat-start">
      <div className="chat-bubble chat-bubble-accent">
        <div className="mb-4">{content}</div>

        {sources?.map((source, i) => (
          <SourceComp key={source.id} source={source} index={i + 1} />
        ))}
      </div>
    </motion.div>
  );
};

const Chat = ({messages, isLoading }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  },[messages, isLoading])
  return (
    <div className="flex flex-col gap-4">
      {messages.map((message, i) =>
        message.role === 'assistant' ? (
          <ChatAssistant
            key={i}
            content={message.content}
            sources={message.sources}
          />
        ) : (
          <ChatUser key={i} content={message.content} />
        )
      )}
      {isLoading && <Typing />}
      <div ref={ref} className='w-10 h-10 '></div>
    </div>
  );
}

export default Chat;