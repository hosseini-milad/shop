import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import StyleInput from "../../../components/Button/Input";
import formtrans from "../../../translate/forms";
import tabletrans from "../../../translate/tables";

function ProductClassPolicy(props) {
  const content = props.content;
  console.log(content);
  return (
    <div className="serviceItem">
      
      <StyleInput
        title={formtrans.Percentage[props.lang]}
        direction={props.direction}
        // defaultValue={content ? content.className : ""}
        class={"formInput"}
        action={(e) =>
          props.setClassChange((prevState) => ({
            ...prevState,
            percentage: e,
          }))
        }
      />
    </div>
  );
}
export default ProductClassPolicy;
