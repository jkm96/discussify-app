import React from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';
import './custom.css'

const editorConfiguration = {
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            // 'highlight',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            // 'codeBlock',
            'outdent',
            'alignment',
            'indent',
            '|',
            // 'fontFamily',
            // 'fontBackgroundColor',
            // 'fontSize',
            // 'fontColor',
            // '|',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo'
        ],
      shouldNotGroupWhenFull: true
    },
};

function CustomEditor(props) {
    const {initialData, onChange} = props;
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        onChange(data); // Pass the content back to the parent component
    };

    return (
        <div className='dark:text-white dark:bg-black'>
            <CKEditor
                editor={Editor}
                config={editorConfiguration}
                data={initialData}
                onChange={handleEditorChange} // Use the local handler for onChange event
            />
        </div>
    );
}

export default CustomEditor;
