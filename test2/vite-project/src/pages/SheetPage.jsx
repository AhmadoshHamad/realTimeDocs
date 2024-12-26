import React, { useEffect, useRef,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import SideBar from '../components/SideBar';
import { setMessage } from '../actions';
import io from 'socket.io-client';
import '../cssFiles/editor.css';
import axios from 'axios';
import { Spreadsheet } from 'react-spreadsheet';
import { useParams,useLoaderData } from 'react-router-dom';

const socket = io('http://127.0.0.1:5001');

const SheetPage = () => {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.editor.message);
    const typingTimeoutRef = useRef(null);
    const [, setData] = useState(null);
    const[documents, setDocuments] = useState([]);
    const {id} = useParams();  

    
    const [spreadsheetData, setSpreadsheetData] = useState( [[{ 'value': 'A1' }, { 'value': 'B1' }, { 'value': 'C1' }], [{ 'value': 'A2' }, { 'value': 'B2' }, { 'value': 'C2' }], [{ 'value': 'A3' }, { 'value': 'B3' }, { 'value': 'C3' }]]);
    
 
    useEffect(() => {
        axios.get(`http://127.0.0.1:5001/documents/${id}`)
            .then(response => {
                let dataString = response.data.document_content;
    
                // Replace single quotes with double quotes
                dataString = dataString.replace(/'/g, '"');
    
                // Parse the JSON string
                const data = JSON.parse(dataString);
                setSpreadsheetData(data);
                console.log(data);
            })
            .catch(error => {
               console.error('Error fetching data:', error);
            });
    }, []);
    
    
    
    

    // Listen for incoming messages using redux saga
    useEffect(() => {
        // Listen for incoming messages
        socket.on('receive_message', (data) => {
            // dispatch(setMessage(data.message)); // Update the editor with the received message
            // const splittedData = data.message.split(',');
            // const newData = splittedData.map((item) => {
            //     return { value: item.trim() };
            // });
            // console.log(newData,"hhhhhh");
            // setSpreadsheetData((prevData) => [...prevData, newData]);
            setSpreadsheetData(data.message);
            // console.log(spreadsheetData);
            
        });

        return () => {
            socket.off('receive_message');
        };
    }, [dispatch]);





    // handles the change in the editor
    const handleChange = (newMessage) => {
        // Clear any previous typing timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // dispatch(setMessage(newMessage));
        // setSpreadsheetData(newMessage);
        // console.log(spreadsheetData , "hello");

        
        // Set a new typing timeout
        typingTimeoutRef.current = setTimeout(() => {
          
            // socket.emit('send_message', { message: out });
            dispatch({ type: 'SEND_MESSAGE', payload: newMessage });
            typingTimeoutRef.current = null;
            // setSpreadsheetData(newMessage);
            // console.log(spreadsheetData , "ahmad");
            axios.put(`http://127.0.0.1:5001/documents/${id}`,{
                id : id,
                document_content: JSON.stringify(newMessage)
            })
            .then(response => {

                console.log("succesfully updated", response);
                // alert("Document updated successfully");
                
                // setLoading(false);
            })
            .catch(error => {
               console.log(error);
              
            });

        }, 300); // 300ms timeout
    };


    // useEffect(() => {
    //     id = localStorage.getItem('id');
    //     axios.get(`http://127.0.0.1:5001/documents/${id}/users`)
    // },[]);
// const spreadsheetData = 
// ];

    return (
        <>
        <div className="flex">
            <SideBar isDocs={false} className="fixed top-0 left-0 w-full h-full z-10" />
            <div className="flex-1  overflow-x-auto" style={{marginLeft:'300px'}}>
                <Spreadsheet onChange={handleChange} data={spreadsheetData} />
            </div>
        </div>
    </>
    
    );
};

export default SheetPage;
