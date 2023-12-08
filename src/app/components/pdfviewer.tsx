import React from 'react'

const PDFViewer = () => {
    return (
      <div className='w-full h-full'>
        <iframe src="2022.pdf" width='100%' height='auto' className='h-full'/>
      </div>
    );
}

export default PDFViewer