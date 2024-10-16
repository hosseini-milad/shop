import { useState } from "react"
import env, { normalPriceCount, normalPriceRound } from "../../env"

function QuickTotal(props){
  const token = props.token
  const qCart = props.data
  const user = props.user
  const [loading ,setLoading]=useState(0) 
  const [isQuote ,setQuote]=useState(false) 
  //console.log(qCart)
  const SetOrder=()=>{
    setLoading(1)
      const postOptions={
          method:'post',
          headers: { 'Content-Type': 'application/json' ,
          "x-access-token": token&&token.token,
          "userId":token&&token.userId},
          body:JSON.stringify({userId:user?user.Code?user.Code:
              user._id:(token&&token.userId),isQuote})
        }
        //console.log(postOptions)
      fetch(env.siteApi + "/panel/faktor/quick-to-cart",postOptions)
      .then(res => res.json())
      .then(
          (result) => {
              if(!result.error){
                  props.setError({message:"کالا اضافه شد",color:"green"})
                  setTimeout(()=>props.setError({message:"",color:"brown"}),2000)
                  props.setCart(result)
                  setLoading(0)
              }
              else{
                props.setError({message:result.error,color:"brown"})
                  setTimeout(()=>props.setError({message:"",color:"brown"}),5000)
              }
                  
          },
          (error) => {
              console.log(error)
          })
  }
  console.log(isQuote)
  const defAction=()=>{
    props.action({message:"acting"})
  }
  if(!qCart)
    return(<div className="total-amount"></div>)
  else return(
    <div className="total-amount">
      <div className="t-wrapper">
        <p>تعداد</p>
        <p>{qCart.totalCount}</p>
      </div>
      <div className="t-wrapper">
        <p>مجموع فاکتور</p>
        <p>{normalPriceCount(qCart.totalFee,1)}</p>
      </div>
      <div className="t-wrapper">
        <p>تخفیف</p>
        <p>{normalPriceRound(qCart.totalDiscount,1)||"-"}</p>
      </div>
      <div className="t-wrapper">
        <p>مالیات</p>
        <p>{normalPriceRound(qCart.totalTax)}</p>
      </div>
      <div className="t-wrapper">
        <p>مبلغ کل </p>
        <p>{normalPriceRound(qCart.totalPrice)}</p>
      </div>
      <label  htmlFor="Quote" 
      className={`product-table-btn temp-btn label-btn ${isQuote?"green-btn":""}`}>
        <p>پیش فاکتور</p>
        <input id="Quote" type="checkbox" checked={isQuote} onChange={(e)=>setQuote(!isQuote)}/>
        {isQuote?
        <i class="fa fa-check" aria-hidden="true"></i>:
        <i class="fa fa-times" aria-hidden="true"></i>}
      </label>
      
      {props.action?<></>:
      !0?<button type="button" className="product-table-btn temp-btn"
      onClick={SetOrder}>
        <p>ثبت سفارش</p>
      </button>:<button type="button" className="product-table-btn temp-btn">
        <p>در حال ثبت...</p>
      </button>}
    </div>
    )
}
export default QuickTotal