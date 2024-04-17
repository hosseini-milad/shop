function ErrorAction(props){
  const color = props.color?props.color:"lignBlue"
  const icon = props.icon?props.icon:"info"
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
                <input type="checkbox" name="sure checkbox" id="sure"/>
                <label for="sure">{props.text}</label>

              </div>
              <div className="btn-wrappper">
                <div className="del-btn" style={{backgroundColor:color}}
                onClick={()=>(props.action(),props.close())}>
                  {props.buttonText}</div>
                <div className="cancel-btn" onClick={()=>props.close()}>انصراف</div>
              </div>
            </div>
        </div>
      </div>
    </div>
    )
}
export default ErrorAction