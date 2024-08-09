import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import stylisRTLPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';

function StyleInput(props){
    
    const [showPass,setShowPass] = useState(0)
    const [search,setSearch] = useState('')
    const cacheRtl = createCache({
        key: "muirtl",
        stylisPlugins: [stylisRTLPlugin]
      });
    const cacheltR = createCache({
        key: "muiltr",
        stylisPlugins: []
      });
    return(
        //<CacheProvider value={props.direction==="rtl"?cacheRtl:cacheltR} style={{position:"relative"}}>
            <><TextField label={props.title} 
                className={props.class}
                defaultValue={props.defaultValue}
                onChange={(e)=>props.action(e.target.value)}
                onKeyDown={(e)=>props.doAction?props.doAction(e):''}
                type={props.password&&!showPass?"password":"text"}
                fullWidth = {props.fullWidth}

            />
            {props.password?<i className={`fa ${showPass?"fa-eye-slash":"fa-eye"} 
            ${props.direction==="rtl"?"showPassRTL":"showPass"}`}
            onClick={()=>setShowPass(showPass?0:1)}></i>:<></>}
            {props.icon?<div className={props.direction==="rtl"?"showPassRTL":"showPass"}>
                {props.icon}</div>:<></>}</>
            
        //</CacheProvider>
    )
}
export default StyleInput