import React from 'react'

const SheetCard = () => {
  return (
    <a href='/sheetEditor' className='flex items-center gap-x-3 p-1 hover:bg-green-100 rounded-e-full rounded-s-full'>
        <svg className='ms-4' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#48752C"><path d="M280-280h80v-200h-80v200Zm320 0h80v-400h-80v400Zm-160 0h80v-120h-80v120Zm0-200h80v-80h-80v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
        <div className="w-full flex justify-between px-1 pe-16">
            <span className="font-bold text-xl ">Sheet1</span>
            <strong>18-8-2025</strong>
        </div>
        <div className=" rounded-full p-1 hover:bg-gray-300">
        <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#5f6368"><path d="M480.46-119.67q-30.46 0-51.13-21.01-20.66-21.01-20.66-50.52 0-29.43 20.61-51.28 20.6-21.85 50.26-21.85 30.46 0 51.13 21.78 20.66 21.78 20.66 51.16 0 29.39-20.56 50.56-20.55 21.16-50.31 21.16Zm0-289q-30.46 0-51.13-20.61-20.66-20.6-20.66-50.26 0-30.46 20.61-51.13 20.6-20.66 50.26-20.66 30.46 0 51.13 20.56 20.66 20.55 20.66 50.31 0 30.46-20.56 51.13-20.55 20.66-50.31 20.66Zm0-287q-30.46 0-51.13-21.49-20.66-21.49-20.66-51.66 0-30.18 20.61-51.18 20.6-21 50.26-21 30.46 0 51.13 21.06 20.66 21.05 20.66 51.02 0 30.38-20.56 51.82-20.55 21.43-50.31 21.43Z"/></svg>
        </div>
    </a>
  )
}

export default SheetCard