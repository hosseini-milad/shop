import { useState } from "react"
import tabletrans from "../translate/tables"
import StyleInput from "./Button/Input"
import env from "../env"

function SMS(props){
    const [message,setMessage] = useState()
    const [content,setContent] = useState()
    console.log(props.userList)
    const smsSent=() => {
      
      const postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({message:message,
          users:props.userList.map(item=>item._id)})
        }
        console.log(postOptions)
     fetch(env.siteApi + "/panel/user/sendSMS",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
          setContent(result)
          setTimeout(()=> setContent(''),5000)
      },
      (error) => {
        console.log(error);
      }
      
  )}
    return(
    <dialog id="modal">
      <div className="popup-brand">
        <div className="popup-header">
          <h5>{props.title}</h5>
          <i className="fa-solid fa-close close-modal" style={{color: "#ff0000",cursor: "pointer"}}
          onClick={()=>props.close(0)}></i>
        </div>
        <div className="popup-wrapper">
            <div className="brand-name-popup">
              <p>{props.text}</p>
          </div> 
        </div>
        <div className="modalFooter">
          <StyleInput title={tabletrans.message[props.lang]}
              class="modalNew" direction={props.direction}
              action={(e)=>setMessage(e)}
          />
          <div className="add-brand-btn" onClick={smsSent}>
              <i className="fa-solid fa-plus fa-sm" style={{color: "#00dbdb"}}></i>
              ارسال
          </div>
        </div>
        <small>{content?content.sentStatus:""}</small>
      </div>
    </dialog>
    )
}
export default SMS