import React, { useEffect, useState } from "react"
import env from "../../env"
import statustrans from "../../translate/status"
import Status from "./Status"

function StatusBar(props){
  const lang = props.lang
  const token=props.token
  const [content,setContent]=useState("")
  useEffect(() => {
    const postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json',
        "x-access-token":token&&token.token,"userId":token&&token.userId},
        body:JSON.stringify({filters:props.filters,date:props.filters.date})
      }
   fetch(env.siteApi + "/panel/product/list-status",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
        setContent('')
        setTimeout(()=> setContent(result),200)
    },
    (error) => {
      console.log(error);
    }
    
)},[props.filters])
  
    return(
        <div className="user-statue">
          {content&&content.map((status,i)=>(status.count?
            <div className="statue-all statue-div" key={i} 
              onClick={()=>props.setFilters(prevState => ({
                ...prevState,
                status:status.status==="all"?"":status.status
              }))}>
              <p>{statustrans[status.status][lang]}</p>
              <Status status={status.status} text={status.count} lang={lang}/>
            </div>:<React.Fragment key={i}></React.Fragment>
          ))}
        </div>
    )
}
export default StatusBar