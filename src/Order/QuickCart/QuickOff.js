import { useEffect, useState } from "react"

function QuickOff(){
    const [offPer,setOffPer] = useState(0)
    const [offValue , setOffValue] = useState('')
    useEffect(()=>{
        setOffValue('')
    },[offPer])
    return(
    <div className="off-input-wrapper">
        <input type="number" name="" id="" value={offValue}
        onChange={(e)=>setOffValue(e.target.value)}/>
        {offPer?<i className="off-unit fa-solid fa-percent percent-unit"
            onClick={()=>setOffPer(0)}></i>:
        <i className="price-unit"
            onClick={()=>setOffPer(1)}>ریال</i>}
    </div>
    )
}
export default QuickOff