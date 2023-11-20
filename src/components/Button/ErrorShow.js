function ErrorShow(props){
    const errorMessage = props.message
    const errorColor = props.color
    return(<>
        {errorMessage?<small className="errorHandler" 
            style={{color:errorColor}}>{errorMessage}</small>
        :<></>}</>
    )
}
export default ErrorShow