import { useState } from "react"
import StyleSelect from "../../components/Button/AutoComplete"
import ImageSimple from "../../components/Button/ImageSimple"
import StyleInput from "../../components/Button/Input"
import env, { parseDesc } from "../../env"
import tabletrans from "../../translate/tables"
import AdvRangeNew from "./AdvRangeNew"

function AdvRange(props){
    const content = props.content
    
    console.log(props.rangeArray)
    const removeItem=(index)=>{
      props.setRangeArray([
        ...props.rangeArray.slice(0, index),
        ...props.rangeArray.slice(index + 1, props.rangeArray.length)
      ]);
    }
    return(
        <div className="pd-row image-range">
          <div className="row-title">
            <h4>{tabletrans.images[props.lang]}</h4>
            <p>{tabletrans.attributes[props.lang]}</p>
          </div>
          <div className="row-box">
            <div className="probs-wrapper">
              {props.rangeArray?props.rangeArray.map((range,i)=>(
                <div className="rangeHolder" key={i}>
                  <div className="rangeImage">
                    <img src={env.siteApiUrl+ range.thumb}/>
                  </div>
                  <div className="rangeText">
                  <StyleInput title={"title"} direction={props.direction}
                  disabled={true} action={()=>{}}
                  class={"formInput"} defaultValue={range.title} />
                  </div>
                  <div className="rangeRemove">
                    <i className="fa fa-trash" onClick={()=>removeItem(i)}></i>
                  </div>
                </div>
              )):<></>}
              
              <AdvRangeNew productChange={props.productChange} 
              setProductChange={props.setProductChange}
              rangeArray={props.rangeArray} setRangeArray={props.setRangeArray}
              />
            </div>
          </div>
        </div>
    )
}
export default AdvRange