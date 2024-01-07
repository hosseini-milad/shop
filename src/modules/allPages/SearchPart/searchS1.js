import env, { siteApiUrl } from "../../../env";

function SearchPhase1(props){
    const filters = props.filters
    const vehicleHandler=(e)=>{
        props.vehicleHandler(e);
        props.setStep(2);
    }
    var filterUsage = '';
    if(filters)
    filterUsage = filters.filter.find(item=>item.id===217)
    //console.log(filters)
    return(
        <div className="searchPhase1" style={{display:props.step}}>
            <ul> 
                {filterUsage&&filterUsage.get_child.map(filter=>(
                    <li key={filter.id} 
                        onClick={(e)=>{vehicleHandler(e.target.parentNode.parentNode);
                           if(filter.id !==218){props.setMotorOil(filter.id); props.setStep(4)}}}>
                    <div className="searchImgHolder">
                        <img src={env.siteUrl+'/images/'+filter.title+'.png'}/>
                    </div>
                    <div>{<span>{filter.title} </span>}</div></li>
                ))}
                
                {/*<li onClick={(e)=>vehicleHandler(e.target.parentNode.parentNode)}>
                    <div className="searchImgHolder">
                    <img src="https://sharifoilco.com/assets/icons/heavy.png"/> </div>
                    <div><span>خودروی سنگین</span></div></li>
                <li onClick={(e)=>vehicleHandler(e.target.parentNode.parentNode)}>
                    <div className="searchImgHolder">
                    <img src="https://sharifoilco.com/assets/icons/utv.png"/> </div>
                    <div><span>وانت</span></div></li>
                <li onClick={(e)=>{vehicleHandler(e.target.parentNode.parentNode);
                    props.setStep(4)}
                }>
                    <div className="searchImgHolder">
                    <img src="https://sharifoilco.com/assets/icons/motorcycle.png"/> </div>
                    <div><span>موتورسیکلت</span></div></li>
            */}
            </ul>
        </div>
    )
}
export default SearchPhase1