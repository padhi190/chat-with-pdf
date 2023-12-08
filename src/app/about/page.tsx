import React from 'react'

const About = () => {
  return (
    <figure className="p-8 max-w-7xl md:flex bg-slate-100 rounded-xl md:p-0">
    <img className="w-24 h-24 mx-auto rounded-full md:w-48 md:h-auto md:rounded-r-none md:rounded-l-xl" src="/pitra.jpeg" alt="" width="384" height="512" />
    <div className="pt-6 space-y-8 text-center md:p-8 md:text-left">
      <blockquote>
        <p className="text-lg font-medium text-slate-600">
        This proof of concept, known as ChatPDF, aims to provide a unique and interactive experience for users to delve into the annual report through a chat interface. The PDF document is divided into smaller sections, and each section is stored in a database with its corresponding embedding vector. When users ask questions, a similarity search is performed against the embedding vectors to retrieve relevant sections.
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