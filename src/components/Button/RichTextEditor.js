import { useRef } from "react";
import env from "../../env"
import { Editor } from '@tinymce/tinymce-react';

function RichTextEditor(props){
    const editorRef = useRef(null);
    const content = props.content
    return(
        <Editor
            apiKey={env.editorApi}
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue={content?content[props.value]:''}
            onEditorChange={(e)=>props.action(e)}
            init={{
            height: props.height?props.height:400,
            menubar: false,
            plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }
        }
        />
    )
}
export default RichTextEditor