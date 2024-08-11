import React, { useEffect,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import SideBar from '../components/SideBar';
import { setMessage } from '../actions';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const EditorPage = () => {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.editor.message);
    const typingTimeoutRef = useRef(null);

    useEffect(() => {
        // Listen for incoming messages
        socket.on('receive_message', (data) => {
            dispatch(setMessage(data.message)); // Update the editor with the received message
        });

        return () => {
            socket.off('receive_message');
        };
    }, [dispatch]);

    // const handleChange = (newMessage) => {
    //     dispatch(setMessage(newMessage));
    //     socket.emit('send_message', { message: newMessage });
    // };
    const handleChange = (newMessage) => {
        // Clear any previous typing timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // setMessage(newMessage);
        dispatch(setMessage(newMessage));

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
