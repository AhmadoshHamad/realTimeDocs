import React, {useState} from 'react'
import ReactCardFlip from 'react-card-flip'
import loginImage from '../assets/images/folder.png';
import axios from 'axios';


const socketURL = import.meta.env.VITE_SOCKET_URL + ":" + import.meta.env.VITE_SOCKET_PORT;

const AddCard = ({Isdocs}) => {
    const [isFlipped,SetIsFlipped] = useState(false);
    const [name,setName] = useState('');

    function flipCard(){
        event.preventDefault(); // Prevent default form submission
        SetIsFlipped(!isFlipped);
    }

    async function addDocument(event){
        event.preventDefault(); // Prevent default form submission
        try{
            const id = localStorage.getItem('id');
            const response = await axios.post(`${socketURL}/documents/${id}`, {
                name: name
            });
            console.log(response.data);

        }catch(error){
            console.error(error);
        }
}


  return (
    <ReactCardFlip flipDirection='horizontal' isFlipped = {isFlipped}>
       
    
    <div className="card card-back max-w-xs rounded overflow-hidden shadow-lg bg-white h-full" onMouseEnter={flipCard}>
            <div className="absolute inset-0 flex items-center justify-center">
                <strong className="text-4xl">+</strong>
            </div>
            <img className="w-full invisible" src={loginImage} alt="Card" />
            <div className="px-6 py-4 invisible">
                <div className="font-bold text-xl mb-2">Card Title</div>
                <small className="text-gray-700 text-base hidden">
                    updated at 23/7/2021
                </small>
                <br />
            </div>
    </div>
    <div className="card  max-w-xs rounded overflow-hidden shadow-lg w-full h-full flex justify-center items-center" onMouseLeave={flipCard} style={{ backgroundColor: Isdocs ?'#8eddec':'#48752c' }}>
        <form  className="w-3/4 flex flex-col items-center mt-6 gap-y-1 px-2 mb-5" onSubmit={addDocument}>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Doc Name"
                                    className="w-full rounded-md p-2 m-2 outline-none mt-7 border-none"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <button type="submit" className='p-1 px-5 mt-3 rounded bg-slate-800 text-white font-bold'>Create</button>
                                <br /><br /> 
        </form>
    </div>

    </ReactCardFlip>
  )
}

export default AddCard