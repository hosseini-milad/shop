import { useState } from "react"

function QuickCounter(props){
    //const [count , setCount] = useState(1)
    const unit = props.unit?props.unit:10
    return(
    <div className="amount-input-wrapper">
        <div className="math top-right" 
            onClick={()=>props.setCount(Number(props.count)+1)}>
        <p>+</p>
        </div>
        <div className="math top-left"
        onClick={()=>props.setCount(props.count>1?Number(props.count)-1:1)}>
        <p>-</p>
        </div>
        <div className="math bottom-right"
            onClick={()=>props.setCount(props.count<unit?
                unit:Number(props.count)+unit)}>
        <p>{unit}+</p>
        </div>
        <div className="math bottom-left"
            onClick={()=>props.setCount(props.count>unit?
                Number(props.count)-unit:1)}>
        <p>{unit}-</p>
        </div>
        <div className="num-input">
            <input type="number" 
            value={props.count}
            onChange={(e)=>props.setCount(e.target.value)}/>
        </div>
    </div>
    )
}
export default QuickCounter