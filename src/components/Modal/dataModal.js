import { useState } from "react"

function DataModal(props){
  const color = props.color?props.color:"ligtBlue"
  const icon = props.icon?props.icon:"info"
  const [value,setValue] = useState()
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
                
                <textarea placeholder="توضیحات"
                  defaultValue={props.def} 
                  onChange={(e)=>setValue(e.target.value)}/>

              </div>
              <div className="btn-wrappper">
                <div className="del-btn" style={{backgroundColor:color}}
                onClick={()=>(props.action(value),props.close())}>
                  {props.buttonText}</div>
                <div className="cancel-btn" onClick={()=>props.close()}>انصراف</div>
              </div>
            </div>
        </div>
      </div>
    </div>
    )
}
export default DataModal