import React from 'react';
import { useEffect,useState } from 'react';
import { dropdown,openSidebar } from './sidebarMethods';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SideBar = ({isDocs}) => {
  console.log(isDocs);
  
    // const [isSubmenuHidden, setIsSubmenuHidden] = useState(true);
    // const [isArrowRotated, setIsArrowRotated] = useState(false);
    // const [isSidebarHidden, setIsSidebarHidden] = useState(false);
    const [documents, setDocuments] = useState([]);
    // const [id, setId] = useState(1);
     
    const navigate = useNavigate();
    const id = localStorage.getItem('id'); 
    useEffect(() => {
      const fetchData = async () => {
        const id = localStorage.getItem('id');
        const response = await axios.get(`http://172.23.194.171:5000/users/${id}/documents`);
        console.log(response.data);
        setDocuments(response.data);
      };
    
      fetchData();
    }, []);

    // useEffect(() => {
    //   const fetchDocuments = async () => {
    //     const id = localStorage.getItem('id'); // Hardcoded ID
  
    //     // Check if ID is correctly set
    //     if (typeof id === 'undefined' || id === null) {
    //       alert("No ID found!");
    //       navigate('/login'); // Redirect to login page
    //       return;
    //     }
  
    //     try {
    //       const response = await axios.get(`http://172.23.194.171:5000/users/${id}/documents`);
    //       console.log(response.data);
    //       setDocuments(response.data);
    //     } catch (error) {
    //       console.error("Error fetching documents:", error.response || error.message);
    //       alert("Failed to fetch documents. Please check the console for details.");
    //     }
    //   };
  
    //   fetchDocuments();
    // }, [navigate]);
    
    const createDoc= () =>{
      console.log("hello");
      
    }



    function logout(){
      localStorage.removeItem('id');
      window.location.href = '/login';
    }


  
return (
    <>
        <span
      className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
      onClick={openSidebar}
    >
      <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md "></i>
    </span>
    <div
      className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 hidden md:block"
    >
      <div className="text-gray-100 text-xl">
        <div className="p-2.5 mt-1 flex items-center">
          <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
          <h1 className="font-bold text-gray-200 text-[15px] ml-3">Folderizer</h1>
          <i
            className="bi bi-x cursor-pointer ml-28 lg:hidden"
            onClick={openSidebar}
          ></i>
        </div>
        <div className="my-2 bg-gray-600 h-[1px]"></div>
      </div>
      <div
        className="p-x-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white"
      >
        <i className="bi bi-search text-sm"></i>
        <input
          type="text"
          placeholder="Search"
          className="text-[15px] ml-4 w-full bg-transparent border-none"
          style={{ outline: 'none' }}
        />
      </div>
      <a href={isDocs?'/docs':'/sheets'}
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <i className="bi bi-house-door-fill"></i>
        <span className="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
      </a>
      <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <i className="bi bi-bookmark-fill"></i>
        <span className="text-[15px] ml-4 text-gray-200 font-bold">Bookmark</span>
      </div>
      <div className="my-4 bg-gray-600 h-[1px]"></div>
      <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        onClick={dropdown}
      >
        {/* <i className="bi bi-chat-left-text-fill"></i> */}
        <i className="bi bi-file-earmark-fill"></i>
        <div className="flex justify-between w-full items-center">
          <span className="text-[15px] ml-4 text-gray-200 font-bold">Docs</span>
          <span className="text-sm rotate-180" id="arrow">
            <i className="bi bi-chevron-down"></i>
          </span>
        </div>
      </div>
      <div
      className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
      id="submenu"
    >
      {(documents.length === 0 || isDocs) ? (
        <p>No documents available.</p>
      ) : (
        documents.map((doc) => (
          <a
            key={doc.id} // Ensure each item has a unique key
            className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1 block"
            href={`/editor/${doc.id}`}
          >
            {doc.name} {/* Assuming 'name' is the field to display */}
          </a>
        ))
      )}
    </div>
      
      <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <i className="bi bi-box-arrow-in-right"></i>
        <button className="text-[15px] ml-4 text-gray-200 font-bold" type='submit' onClick={logout}>Logout</button>
      </div>
    </div>
    </>
    
);
}

export default SideBar