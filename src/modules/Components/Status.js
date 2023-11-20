import statustrans from "../../translate/status"

function Status(props){
    const status = statustrans[props.status]
    const text = props.text?props.text:status&&status[props.lang]
    return(
        <div className={props.class} 
            style={{color:status?status.color:"gray",
            backgroundColor:status?status.background:"silver"}}>
            {text}
        </div>
    )
}
export default Status