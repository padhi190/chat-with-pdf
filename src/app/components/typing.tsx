export default function Typing() {
  return (
    <>
      <div className="chat chat-start">
        <div className="flex justify-center gap-1 pt-4 align-bottom chat-bubble chat-bubble-accent">
          <div className="w-3 h-3 bg-gray-800 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 rounded-full animate-bounce animation-delay-200 bg-slate-800"></div>
          <div className="w-3 h-3 rounded-full animate-bounce animation-delay-400 bg-slate-800"></div>
        </div>
      </div>
    </>
  );
}
