import { useState } from "react"
import env,{findBox} from "../../env"
function CountCalculatorProduct(props){
    const token = props.token
    
    const pack = props.pack
    const data = props.data
    
    const [findCount,setCount] = useState()
    const [countValue,setCountValue] = useState()
    const calcCountFunction=()=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
                "x-access-token": token&&token.token,
                "userId":token&&token.userId},
            body:JSON.stringify({sku:data.sku})
          }
        fetch(env.siteApi + "/panel/faktor/calc-count",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.error){
                }
                else{
                    setCountValue(result)
                    
                    setCount("1")
                }
            },
            (error) => {
                console.log(error)
            })
    }
    return(
        <form className="product-option-num">
              {countValue?<><div className={pack?"inputGroup selectedGroup":"inputGroup"}>
                <input id={"radio"+props.id} name="radio" type="radio" 
                  style={{display: "none"}} checked onChange={()=>{}}/>
                <label htmlFor={"radio"+props.id}>
                  <p>کارتن</p>
                  <span>تعداد: {parseInt(data&&data.countData/data.perBox)}X
                    {data&&data.perBox}</span>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-plus" onClick={()=>props.updateCount("pack",1)}></i>
                    <input className="product-num-input" type="number"
                      value={pack}
                      onChange={()=>{}}/>
                    <i className="fa-solid fa-minus" onClick={()=>props.updateCount("pack",-1)}></i>
                  </div>
                </label>

              </div>
              <div className={props.count?"inputGroup selectedGroup":"inputGroup"}>
                <input id={"radios"+props.id} name="radio" type="radio" style={{display: "none"}} />
                <label htmlFor={"radios"+props.id}>
                  <p>{countValue.count&&
                    countValue.count.quantity}</p>
                  <span>انبار3: {countValue.count3}</span>
                  
                  <div className="input-wrapper">
                    <i className="fa-solid fa-plus" onClick={()=>props.updateCount("single",1)}></i>
                    <input className="product-num-input" type="number" value={props.count}
                    onChange={()=>{}}/>
                    <i className="fa-solid fa-minus" onClick={()=>props.updateCount("single",-1)}></i>
                  </div>
                </label>

              </div></>:<div className="countCalculator">
              <p id="calcCount" onClick={calcCountFunction}>محاسبه تعداد</p>
              </div>}
              {/*<div className="menu-item"
        onClick={(e)=>//findCount?
            {props.setSelectedItem(item);
            (e.target.id!=="calcCount")&&props.setShowDrop(0)
            }
            //:calcCountFunction()
        }>
        <div className="item-info">
            
            <div className="item-amount">
                <p>{sku}</p>
                {findCount?<>
                    <p>کارتن: {findBox(countValue)}</p>
                    <p>تکی: {countValue.count&&countValue.count.quantity}</p>
                </>:<p id="calcCount" className="calcCount" onClick={calcCountFunction}>محاسبه تعداد</p>
                }
                
            </div>
            <div className="item-amount sec-amount">
                {findCount?<>
                    <p>انبار3</p>
                    <p>کارتن: - </p>
                    <p>تکی: {countValue&&countValue.count3}</p>
                </>:<></>
                }
                
            </div>
        </div>
      </div>*/}
            </form>
      
    )
}
export default CountCalculatorProduct