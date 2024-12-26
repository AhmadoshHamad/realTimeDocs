import React, { useEffect, useRef, useState } from 'react';
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

const DocsEditorPage = () => {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.editor.message);
    const typingTimeoutRef = useRef(null);
    const [data, setData] = useState(null);
    const[documents, setDocuments] = useState([]);
    const {id} = useParams();   
    // const document =  useLoaderData();

    useEffect(() => {
        // Replace with your API endpoint
        axios.get(`http://127.0.0.1:5001/documents/${id}`)
            .then(response => {
                setData(response.data);
                setMessage(response.data.document_content);
                console.log(response.data.document_content);
                
                // setLoading(false);
            })
            .catch(error => {
               console.log(error);
              
            });
    }, []);

    // Listen for incoming messages using redux saga
    useEffect(() => {
        // Listen for incoming messages
        socket.on('receive_message', (data) => {
            dispatch(setMessage(data.message)); // Update the editor with the received message
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

        dispatch(setMessage(newMessage));

        // Set a new typing timeout
        typingTimeoutRef.current = setTimeout(() => {
            dispatch({ type: 'SEND_MESSAGE', payload: newMessage });
            typingTimeoutRef.current = null;

            axios.put(`http://127.0.0.1:5001/documents/${id}`,{
                id : id,
                document_content: newMessage
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



    return (
        <>
            <SideBar isDocs={true} />
            <div className="extended" >
                {/* <textarea className='w-full' name="" id="" onChange={handleChange}  value={data?.document_content} ></textarea> */}
                <Editor
                    apiKey='wsydvry22j6a0sfnfvdqruw5e722cy7bsuqomzhhqqhl0k9p'
                    init={{
                        height: '1000px',
                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                        tinycomments_mode: 'embedded',
                        tinycomments_author: 'Author name',
                        mergetags_list: [
                            { value: 'First.Name', title: 'First Name' },
                            { value: 'Email', title: 'Email' },
                        ],
                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                    }}
                    initialValue={data?.document_content}
                    // initialValue={message}
                    onEditorChange={handleChange}
                    value={message} 
                />
            </div>
        </>
    );
};

// const documentLoader = async ({params, setData, setMessage}) => {
//     const response = await fetch(`http://127.0.0.1:5001/documents/${params.id}`);
//     const data = await response.json();
//     setData(response.data);
//     setMessage(data.document_content);
//     console.log(response.data.document_content);
//     return data;
// };

// export  {EditorPage as default, documentLoader};
export default DocsEditorPage;
