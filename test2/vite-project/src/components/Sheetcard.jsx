import React from 'react'

const Sheetcard = () => {
  return (
    <a href='/sheetEditor' className='flex items-center gap-x-3 p-2 hover:bg-green-50 rounded-e-full rounded-s-full'>
        <svg className='ms-4' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#48752C"><path d="M280-280h80v-200h-80v200Zm320 0h80v-400h-80v400Zm-160 0h80v-120h-80v120Zm0-200h80v-80h-80v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
        <div className="w-full flex justify-between px-1 pe-16">
            <span className="font-bold text-xl ">Sheet1</span>
            <strong>18-8-2025</strong>
        </div>
    </a>
  )
}

export default Sheetcard