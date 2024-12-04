function ShowError(props){
    const color = props.color?props.color:"lignBlue"
    const icon = props.icon?props.icon:"info-circle"
    return( 
    <div className="notification-modal">
        <div className="n-m-box" style={{borderColor:color}}>
          <p className="top-p" style={{backgroundColor:color}}>
                {props.status}</p>
          <i className={`fa fa-lg fa-${icon}` }
            style={{color: color}}></i>
          <p>{props.text}</p>
          <a href="#" style={{color:color}}>{props.linkText}</a>
        </div>
    </div>
    )
}
export default ShowError