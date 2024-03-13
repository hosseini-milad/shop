import React, { useRef ,useEffect, useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import StyleInput from "../../../components/Button/Input"
import formtrans from "../../../translate/forms"
import tabletrans from "../../../translate/tables"

function ClassDetails(props){
    const content=props.content 
    return(
        <div className="serviceItem">
          <StyleInput title={formtrans.title[props.lang]} direction={props.direction} 
              defaultValue={content?content.className:''} class={"formInput"}
              action={(e)=>props.setClassChange(prevState => ({
                ...prevState,
                className:e
              }))}/>
              {/*<StyleInput title={formtrans.classcode[props.lang]} direction={props.direction} 
              defaultValue={content?content.classEn:''} class={"formInput"}
              action={(e)=>props.setClassChange(prevState => ({
                ...prevState,
                classEn:e
              }))}/>
              <StyleInput title={formtrans.category[props.lang]} direction={props.direction} 
              defaultValue={content?content.classCat:''} class={"formInput"}
              action={(e)=>props.setClassChange(prevState => ({
                ...prevState,
                classCat:e
              }))}/>*/}
        </div>
    )
}
export default ClassDetails