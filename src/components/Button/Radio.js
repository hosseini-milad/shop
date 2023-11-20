import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import React ,{ useState } from 'react';

function StyleRadio(props){
    
    return(
        <>
        <p>{props.title}</p>
        <div className="radio-wrapper">
            {props.options&&props.options.map((opt,i)=>(
                <React.Fragment key={i}>
                <label htmlFor={opt}>{opt[props.label]}</label>
                <input type="radio" name="type" id={opt} 
                    onClick={(e)=>{props.action(opt);props.setTab(i)}} 
                    defaultChecked={opt["english"]===props.defaultValue}
                /></React.Fragment>
            ))}
        </div></>
    )
}
export default StyleRadio