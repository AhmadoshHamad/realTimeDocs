import React from 'react';
import SideBar from '../components/SideBar';
import { Editor } from '@tinymce/tinymce-react';


const DashboardPage = () => {
  return (
    <>
        <SideBar />
        <div style={{marginLeft : '300px'}}>
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
            initialValue="Welcome to TinyMCE!"
            // onEditorChange={handleEditorChange}

            />
        </div>
    </>
  )
}

export default DashboardPage