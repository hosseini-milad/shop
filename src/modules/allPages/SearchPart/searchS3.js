
function SearchPhase3(props){ 
    //console.log(props.carName)
    const handleBack=()=>{
        console.log(props.carHandler)
        props.carHandler(0)
    }
    return(<div className="searchPhase1 searchPhase3" step={{display:props.step}}>
            
            <ul className="oilPart">
                {props.carName&&props.carName.map((carName,i)=>(
                    <li id={carName.id} key={i} onClick={(e)=>{props.findCar(e.target.parentNode);props.setStep(4)}}>
                    <span>{carName.title}</span></li>
                ))}
            </ul>
        </div>)
}
export default SearchPhase3