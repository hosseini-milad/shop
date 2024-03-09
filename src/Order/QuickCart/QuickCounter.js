import { useState } from "react"

function QuickCounter(props){
    const [count , setCount] = useState(1)
    const unit = props.unit?props.unit:10
    return(
    <div className="amount-input-wrapper">
        <div className="math top-right" 
            onClick={()=>setCount(Number(count)+1)}>
        <p>+</p>
        </div>
        <div className="math top-left"
        onClick={()=>setCount(count>1?Number(count)-1:1)}>
        <p>-</p>
        </div>
        <div className="math bottom-right"
            onClick={()=>setCount(count<unit?unit:Number(count)+unit)}>
        <p>{unit}+</p>
        </div>
        <div className="math bottom-left"
            onClick={()=>setCount(count>unit?Number(count)-unit:1)}>
        <p>{unit}-</p>
        </div>
        <div className="num-input">
            <input type="number" 
            value={count}
            onChange={(e)=>setCount(e.target.value)}/>
        </div>
    </div>
    )
}
export default QuickCounter