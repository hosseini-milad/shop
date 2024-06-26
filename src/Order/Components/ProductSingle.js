import { useState } from "react"
import env, { payValue, stockValue } from "../../env"

function ProductSingle(props){
  const [starStatus,setStarStatus] = useState(0)
  const [count,setCount] = useState(0)
  const [pack,setPack] = useState(0)
  const token = props.token
  const stockId = token.stockId?token.stockId:"5"
  const user = props.user
  const data = props.data
  const perBox = data.perBox?parseInt(data.perBox):10
  
  const updateCount=(type,change)=>{
    var newValue = 0
    if(type==="pack") {
      newValue= pack+change
      if(newValue<0) newValue = 0
      setPack(newValue)
    }
    else {
      newValue = count + change
      if(newValue<0) newValue = 0
      setCount(newValue)
    }
  }
  const setOrder=()=>{
    const postOptions={
      method:'post',
      headers: { 'Content-Type': 'application/json' ,
      "x-access-token": token&&token.token,
      "userId":token&&token.userId},
      body:JSON.stringify({userId:user?user.Code?user.Code:
          user._id:(token&&token.userId),
          date:Date.now,
          cartItem:{
              id:data.ItemID,
              sku:data.sku,
              title:data.title,
              count:count + pack*perBox,
              price:data&&data.priceData},//payValue(data&&data.priceData,props.payValue),
              payValue:props.payValue})
    }
    console.log(postOptions)
  fetch(env.siteApi + "/panel/faktor/update-cart",postOptions)
  .then(res => res.json())
  .then(
      (result) => {
          if(result.error){
              props.setError({message:result.error,color:"brown"})
              setTimeout(()=>props.setError({message:'',
                  color:"brown"}),3000)
          }
          else{
              props.setCart(result)
              props.setError({message:result.message,color:"green"})
              setTimeout(()=>props.setError({message:'',
                  color:"brown"}),3000)
              //setItem('')
              //setItemPrice('')
              setCount(0)
              setPack(0)
          }
      },
      (error) => {
          console.log(error)
      })
  }
    return(
        <div className="product-wrapper">
        <div className="product-tile">
            <div className="product-side-btn-wrapper">
              <i className={starStatus?"fa-regular fa-star active-star":"fa-regular fa-star"}
                onClick={()=>setStarStatus(starStatus?0:1)}></i>
              <i className="fa-solid fa-search"
                onClick={()=>window.open("/products/detail/"+data._id,'_blank')}></i>
            </div>
            <div className="product-img">
              <img src={env.siteApiUrl+ data.thumbUrl} alt="oil"/></div>
            <div className="product-title">
              <p>{data.title}</p>
            </div>
            <form className="product-option-num">
              <div className={pack?"inputGroup selectedGroup":"inputGroup"}>
                <input id={"radio"+props.id} name="radio" type="radio" 
                  style={{display: "none"}} checked onChange={()=>{}}/>
                <label htmlFor={"radio"+props.id}>
                  <p>کارتن</p>
                  <span>max:
                    {parseInt(data&&data.countData/data.perBox)}X
                    {data&&data.perBox}</span>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-plus" onClick={()=>updateCount("pack",1)}></i>
                    <input className="product-num-input" type="number"
                      value={pack}
                      onChange={()=>{}}/>
                    <i className="fa-solid fa-minus" onClick={()=>updateCount("pack",-1)}></i>
                  </div>
                </label>

              </div>
              <div className={count?"inputGroup selectedGroup":"inputGroup"}>
                <input id={"radios"+props.id} name="radio" type="radio" style={{display: "none"}} />
                <label htmlFor={"radios"+props.id}>
                  <p>تکی</p>
                  <span>max:{data&&data.countData}</span>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-plus" onClick={()=>updateCount("single",1)}></i>
                    <input className="product-num-input" type="number" value={count}
                    onChange={()=>{}}/>
                    <i className="fa-solid fa-minus" onClick={()=>updateCount("single",-1)}></i>
                  </div>
                </label>

              </div>
            </form>
            <div className="product-btn-wrapper">
              <div className="product-price">
                {payValue(data&&data.priceData,props.payValue)}</div>
              <button className="buy-btn" onClick={setOrder}>ثبت سفارش</button>
            </div>
          </div>
        </div>
    )
}
export default ProductSingle