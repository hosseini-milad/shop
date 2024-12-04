import { useRef,useEffect } from "react"
function ErrorActionKey(props){
  const focusPop=props.focusPop
  const color = props.color?props.color:"lignBlue"
  const icon = props.icon?props.icon:"info"
  const keyHandle=(e)=>{
    // e.keyCode===13?(props.close()):null
    if(props.preKey&&props.preKey){
      props.action();
      props.close();
      
    }
      
  }
  const ClickHandler=(e)=>{
    if(props.preKey&&props.preKey) {
      props.action();
      props.close();
    }
  }
  useEffect(() => {
    
    if(!props.title)
      {focusPop.current&&focusPop.current.focus()}
      console.log(props.title)
      props.setPreKey&&props.setPreKey(1)

  }, [props.title]);
  
    return(
    <div className="delete-modal">
      <div className="modal-backdrop show-modal">
          <div className="d-m-box" style={{borderColor:color}}>
            <div className="d-m-icon">
              <div className="icon-wrapper" style={{backgroundColor: color}}>
                <i className={`fa fa-solid fa-${icon}`} 
                style={{color: "#ffffff"}}></i></div>
            </div>
            <div className="d-m-content">
              <p className="popTitle">{props.title}</p>
              <div className="sure-checkbox">
                {/* <input type="checkbox" name="sure checkbox" id="sure"/> */}
                <label for="sure">{props.text}</label>

              </div>
              <div className="btn-wrappper">
                <button autoFocus onKeyDown={(e)=>e.keyCode===13?keyHandle(e):null}  className="del-btn" style={{backgroundColor:color}}
                onClick={(e)=>ClickHandler(e)}>
                  {props.buttonText}</button>
                <button className="cancel-btn" onClick={()=>props.close()}>انصراف</button>
              </div>
            </div>
        </div>
      </div>
    </div>
    )
}
export default ErrorActionKey