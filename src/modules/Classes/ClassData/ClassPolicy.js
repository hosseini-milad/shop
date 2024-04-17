import React, { useRef ,useEffect, useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import StyleInput from "../../../components/Button/Input"
import formtrans from "../../../translate/forms"
import tabletrans from "../../../translate/tables"

function ClassPolicy(props){
    const content=props.content
    console.log(content)
    return(
        <div className="serviceItem">
          <strong>لیست سیاست های فروش</strong>
          <ul>
            {content&&content.map((policy,i)=>(
              <li key={i}>{policy.policyName}
              ({policy.category?policy.category.title:''})</li>
            ))}
          </ul>
        </div>
    )
}
export default ClassPolicy