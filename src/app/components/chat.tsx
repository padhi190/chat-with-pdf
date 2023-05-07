import Typing from './typing';

export interface Source {
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
    <div className="chat chat-end">
      <div className="chat-bubble chat-bubble-primary">{content}</div>
    </div>
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
    <div className="chat chat-start">
      <div className="chat-bubble chat-bubble-accent">{content}</div>
      {/* {JSON.stringify(sources)} */}
    </div>
  );
};

export default function Chat({ messages, isLoading }: Props) {
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
    </div>
  );
}
