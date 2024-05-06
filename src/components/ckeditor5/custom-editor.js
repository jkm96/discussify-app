import React from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';

const editorConfiguration = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    '|',
    'outdent',
    'indent',
    '|',
    'imageUpload',
    'blockQuote',
    'insertTable',
    'mediaEmbed',
    'undo',
    'redo',
  ],
};

function CustomEditor(props) {
  const { initialData, onChange } = props;

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    onChange(data); // Pass the content back to the parent component
  };

  return (
    <CKEditor
      editor={Editor}
      config={editorConfiguration}
      data={initialData}
      onChange={handleEditorChange} // Use the local handler for onChange event
    />
  );
}

export default CustomEditor;
