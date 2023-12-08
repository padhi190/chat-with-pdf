import React from 'react'

const About = () => {
  return (
    <figure className="max-w-3xl p-8 md:flex bg-slate-100 rounded-xl md:p-0 dark:bg-slate-800">
    <img className="w-24 h-24 mx-auto rounded-full md:w-48 md:h-auto md:rounded-r-none md:rounded-l-xl" src="/pitra.jpeg" alt="" width="384" height="512" />
    <div className="pt-6 space-y-8 text-center md:p-8 md:text-left">
      <blockquote>
        <p className="text-lg font-medium">
        This proof of concept, known as ChatPDF, aims to provide a unique and interactive experience for users to delve into the annual report through a chat interface.
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
  </figure>
  );
}

export default About