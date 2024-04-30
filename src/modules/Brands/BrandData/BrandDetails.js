import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import StyleInput from "../../../components/Button/Input";
import formtrans from "../../../translate/forms";
import tabletrans from "../../../translate/tables";

function BrandDetails(props) {
  const editorRef = useRef(null);
  const content = props.content;
  return (
    <div className="serviceItem">
      <StyleInput
        title={formtrans.title[props.lang]}
        direction={props.direction}
        defaultValue={content ? content.title : ""}
        class={"formInput"}
        action={(e) =>
          props.setBrandChange((prevState) => ({
            ...prevState,
            title: e,
          }))
        }
      />
      <StyleInput
        title={formtrans.enTitle[props.lang]}
        direction={props.direction}
        defaultValue={content ? content.enTitle : ""}
        class={"formInput"}
        action={(e) =>
          props.setBrandChange((prevState) => ({
            ...prevState,
            enTitle: e,
          }))
        }
      />
      <StyleInput
        title={formtrans.brandCode[props.lang]}
        direction={props.direction}
        defaultValue={content ? content.brandCode : ""}
        class={"formInput"}
        action={(e) =>
          props.setBrandChange((prevState) => ({
            ...prevState,
            brandCode: e,
          }))
        }
      />
      <div className="content">
        <Editor
          apiKey="qosmvwu6wq395cpq7ay8ud8j9d21cf4cdgkxwmpz317vpy2i"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={content ? content.fullDesc : ""}
          onEditorChange={(e) =>
            props.setBrandChange((prevState) => ({
              ...prevState,
              fullDesc: e,
            }))
          }
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>
    </div>
  );
}
export default BrandDetails;
