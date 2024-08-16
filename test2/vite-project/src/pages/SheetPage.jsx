import React, { useEffect, useRef,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import SideBar from '../components/SideBar';
import { setMessage } from '../actions';
import io from 'socket.io-client';
import '../cssFiles/editor.css';
import axios from 'axios';
import { Spreadsheet } from 'react-spreadsheet';

const socket = io('http://localhost:5000');

const SheetPage = () => {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.editor.message);
    const typingTimeoutRef = useRef(null);
    const [, setData] = useState(null);
    const[documents, setDocuments] = useState([]);
    const [spreadsheetData, setSpreadsheetData] = useState( [
        [ {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}, ] ,
        [ { value: "Strawberry" } , { value: "Cookies" } ] ,
        [] ]);

    // useEffect(() => {
    //     axios.get('http://localhost:5000/documents/')
    // });
    

    // useEffect(() => {
    //     // Replace with your API endpoint
    //     axios.get('http://localhost:5000/documents/1')
    //         .then(response => {
    //             setData(response.data);
    //             setMessage(response.data.document_content);
    //             console.log(response.data.document_content);
                
    //             // setLoading(false);
    //         })
    //         .catch(error => {
    //            console.log(error);
              
    //         });
    // }, []);

    // Listen for incoming messages using redux saga
    useEffect(() => {
        // Listen for incoming messages
        socket.on('receive_message', (data) => {
            // dispatch(setMessage(data.message)); // Update the editor with the received message
            const splittedData = data.message.split(',');
            const newData = splittedData.map((item) => {
                return { value: item.trim() };
            });
            console.log(newData,"hhhhhh");
            // setSpreadsheetData((prevData) => [...prevData, newData]);
            setSpreadsheetData(data.message);
            console.log(spreadsheetData);
            
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
            dispatch({ type: 'SEND_MESSAGE', payload: newMessage });
            typingTimeoutRef.current = null;
            setSpreadsheetData(newMessage);
            console.log(spreadsheetData , "ahmad");
            // axios.put('http://localhost:5000/documents/1',{
            //     id : 1,
            //     document_content: newMessage
            // })
            // .then(response => {

            //     console.log("succesfully updated", response);
            //     // alert("Document updated successfully");
                
            //     // setLoading(false);
            // })
            // .catch(error => {
            //    console.log(error);
              
            // });

        }, 300); // 300ms timeout
    };


    // useEffect(() => {
    //     id = localStorage.getItem('id');
    //     axios.get(`http://localhost:5000/documents/${id}/users`)
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
