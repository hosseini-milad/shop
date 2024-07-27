import { useState } from "react"
import env,{findBox} from "../../env"
function CountCalculator(props){
    const token = props.token
    const item = props.item
    const sku = item&&item.sku
    const [findCount,setCount] = useState()
    const [countValue,setCountValue] = useState()
    const calcCountFunction=()=>{
        props.setShowDrop(1)
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
                "x-access-token": token&&token.token,
                "userId":token&&token.userId},
            body:JSON.stringify({sku:sku})
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
      <div className="menu-item"
        onClick={(e)=>//findCount?
            {props.setSelectedItem(item);
            (e.target.id!=="calcCount")&&props.setShowDrop(0)
            }
            //:calcCountFunction()
        }>
        <div className="item-img">
            <img src={env.siteApiUrl+item.thumbUrl} alt=""/>
        </div>
        <div className="item-info">
            <div className="item-p">
            <p>{item.title}</p>
            </div>
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
      </div>
    )
}
export default CountCalculator