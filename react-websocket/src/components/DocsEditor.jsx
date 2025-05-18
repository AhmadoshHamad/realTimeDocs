import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useRef, useCallback } from 'react';


// Custom modules with image handler
const modules = {
  toolbar: {
    container: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    handlers: {}
  },
  clipboard: {
    matchVisual: false,
  }
};

const DocsEditor = ({
    value,
    onChange
}) => {
    const quillRef = useRef(null);
    
    
    return (
      <ReactQuill 
        ref={quillRef}
        theme="snow" 
        value={value} 
        onChange={onChange}
        modules={modules}
        preserveWhitespace={true} 

      />
    );
}

export default DocsEditor

