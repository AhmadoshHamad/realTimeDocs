import {React , useEffect, useState} from 'react';
import Card from '../components/Card';
import AddCard from '../components/AddCard';
import 'bootstrap-icons/font/bootstrap-icons.css';
import folder from '../assets/images/folder.png';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
// import  {Alert}  from "flowbite-react";
import DashboardNavbar from '../components/DashboardNavbar';
import SheetCard from "../components/Sheetcard";

const SheetDashboardPage = () => {
  const [documents, setDocuments] = useState([]);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem('id');
      const response = await axios.get(`http://127.0.0.1:5001/users/${id}/documents`);
      console.log(response.data);
      setDocuments(response.data);
    };
  
    fetchData();
  }, []);
  const location = useLocation();
  const { user } = location.state || {}; // Accessing the user object
  console.log(user);
  
  
  return (
    <>
    
<DashboardNavbar  Isdocs={false} ></DashboardNavbar>

    <div className="w-full flex bg-[#f1f3f4] justify-center ">
      <div className="mt-8 px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 place-items-center " style={{maxWidth: '1000px'}}>
        <AddCard Isdocs={false} />
      </div>
    </div>

    <div className="w-full flex  justify-center  ">

      <div className="mt-8 px-16 w-4/5 flex flex-col gap-6  " style={{maxWidth: '1000px'}}>
          <div className="flex justify-between ps-6 pe-10">
            <span className='text-xl font-bold'>Sheet Name</span>
            <span className='text-xl font-bold'>Last modified</span>
          </div>
          {/* {documents.map((document) => {
            return <Sheetcard key={document.id} document={document} />;
          })} */}
          <SheetCard />
         
          

      </div>
    </div>
       
    </>
  )
}

export default SheetDashboardPage





        // </div> */}