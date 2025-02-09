import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import StyleInput from "../../../components/Button/Input";
import formtrans from "../../../translate/forms";
import tabletrans from "../../../translate/tables";

function ClassDetails(props) {
  const content = props.content;
  return (
    <div className="serviceItem">
      <StyleInput
        title={formtrans.title[props.lang]}
        direction={props.direction}
        defaultValue={content ? content.name : ""}
        class={"formInput"}
        action={(e) =>
          props.setClassChange((prevState) => ({
            ...prevState,
            name: e,
          }))
        }
      />
    </div>
  );
}
export default ClassDetails;
