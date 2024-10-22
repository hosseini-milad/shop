import { useState } from "react"
import env, { normalPriceCount, normalPriceRound } from "../../env"
import ErrorAction from "../../components/Modal/ErrorAction"
function QuickTotal(props){
  const token = props.token
  const qCart = props.data
  const user = props.user
  const [loading ,setLoading]=useState(0)  
  const [PopUp ,setPopUp]=useState("") 
  //console.log(qCart)
  const SetOrder=(isQuote)=>{
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
  
  const defAction=()=>{
    props.action({message:"acting"})
  }
  if(!qCart)
    return(<div className="total-amount"></div>)
  else return(
    <div className="total-amount">
      <div className="table">
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
      </div>
      {props.action?<></>:
      <div className="total-btn-wrapper">
        <button type="button" className="product-table-btn temp-btn"
        onClick={()=>setPopUp({action:false,title:"ثبت فاکتور"})}>
          <p>ثبت فاکتور</p>
        </button>
        <button type="button" className="product-table-btn temp-btn"
        onClick={()=>setPopUp({action:true,title:"ثبت پیش فاکتور"})}>
          <p>ثبت پیش فاکتور</p>
        </button>
      </div>}
      {PopUp?<ErrorAction
        status={"DELETE"}
        title={PopUp.title}
        text={"آیا از ثبت سفارش مطمئن هستید؟"} 
        buttonText="تایید" 
        close={()=>setPopUp(0)}
        color="orange" 
        action={()=>SetOrder(PopUp.action)}/>:<></>

      }
    </div>
    )
}
export default QuickTotal