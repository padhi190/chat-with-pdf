

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen p-24 bg-slate-800">
      <div className="flex flex-col justify-between w-full gap-8 px-4 py-8 rounded-md h-[48rem] bg-slate-50">
        <div className="pb-4 overflow-auto">
          <div className="chat chat-start">
            <div className="chat-bubble">
              Hi, I'm your AI Assistant. What do you want to know?
            </div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-primary">
              What was Adestra's revenue?
            </div>
          </div>
        </div>

        <form className='flex gap-4'>
          <input
            type="text"
            placeholder="type your question"
            className="w-full input"
          />
          <button className="btn btn-primary">Send</button>
        </form>
      </div>
    </main>
  );
}
