import React from 'react'
import loginImage from '../assets/images/folder.png';
const Card = ({document}) => {
    console.log(document['collaborators']);
    
return (
    <a href={`/editor/${document.id}`} className="max-w-xs rounded overflow-hidden shadow-lg bg-white hover:outline hover:outline-1">
        <div style={{width: '500px', height: '150px', overflow: 'hidden'}}>
            <iframe className='h-96' src={`http://192.168.1.117:5173/editor/${document.id}`} style={{width: '100%', transform: 'scale(0.4)', transformOrigin: '0px 0px'}}></iframe>
        </div>
        <div className="px-6 py-4 border-t-2">
            <div className="font-bold text-xl mb-2">{document.name}</div>
            <small className="text-gray-700 text-base">
                {document.updated_at}
            </small>
        </div>
       
        <div className="flex ml-4 pb-3 items-center space-x-3">
            <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#1e293b"><path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/></svg>
            </div>
            <div className="">
    {document['collaborators'].slice(0, 3).map((collaborator, index) => {
        // Generate a random color
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

        return (
            <span
                key={index}
                title={collaborator.username}
                className="rounded-full p-1 px-[10.5px] text-white font-bold text-center"
                style={{
                    position: 'relative',
                    zIndex: document['collaborators'].length - index,
                    left: `${-index * 8}px`,
                    backgroundColor: randomColor, // Set random background color
                }}
            >
                {collaborator.username.toUpperCase().slice(0, 1)}
            </span>
        );
    })}
    
    {document['collaborators'].length > 3 && (
        <span
            className="rounded-full p-1 px-[10.5px] bg-gray-500 text-white font-bold text-[15px] text-center"
            style={{
                position: 'relative',
                zIndex: 0,
                left: '-24px', // Adjust this to align correctly
            }}
        >
            +{document['collaborators'].length - 3}
        </span>
    )}
    </div>
</div>


    </a>
);
};
export default Card