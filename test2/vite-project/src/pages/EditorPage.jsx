import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { Editor } from '@tinymce/tinymce-react';
import SideBar from '../components/SideBar';

const socket = io('http://localhost:5000');




const EditorPage = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    
    const typingTimeoutRef = useRef(null);


    useEffect(() => {
        // Listen for incoming messages
        socket.on('receive_message', (data) => {
            setMessage(data.message); // Update the editor with the received message
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, []);

    const handleChange = (newMessage) => {
        // Clear any previous typing timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        setMessage(newMessage);

        // Set a new typing timeout
        typingTimeoutRef.current = setTimeout(() => {
            // Send the message after typing has stopped
            socket.emit('send_message', { message: newMessage });
            typingTimeoutRef.current = null;
        }, 250); // Adjust the delay (in milliseconds) as necessary
    };



    return (
        <>
            
            <SideBar />
            <div className="" style={{ marginLeft: '300px' }}>
                <Editor
                    apiKey='wsydvry22j6a0sfnfvdqruw5e722cy7bsuqomzhhqqhl0k9p'
                    init={{
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
                    onEditorChange={handleChange}
                    value={message}
                />
            </div>
        </>
    );
};

export default EditorPage;
