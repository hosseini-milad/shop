import env, { normalPriceCount, normalPriceRound } from "../../env"

function QuickTotal(props){
  const token = props.token
  const qCart = props.data
  const user = props.user
  //console.log(qCart)
  const SetOrder=()=>{
      const postOptions={
          method:'post',
          headers: { 'Content-Type': 'application/json' ,
          "x-access-token": token&&token.token,
          "userId":token&&token.userId},
          body:JSON.stringify({userId:user?user.Code?user.Code:
              user._id:(token&&token.userId)})
        }
        console.log(postOptions)
      fetch(env.siteApi + "/panel/faktor/quick-to-cart",postOptions)
      .then(res => res.json())
      .then(
          (result) => {
              if(result){
                  props.setError({message:"کالا اضافه شد",color:"green"})
                  setTimeout(()=>props.setError({message:"",color:"brown"}),2000)
                  props.setCart(result)
              }
              else
                  props.setCart('') 
          },
          (error) => {
              console.log(error)
          })
  }
  const defAction=()=>{
    props.action({message:"acting"})
  }
  if(!qCart){
    return(<></>)
  }
  else return(
    <div className="total-amount">
      <div className="t-wrapper">
        <p>تعداد</p>
        <p>{qCart.totalCount}</p>
      </div>
      <div className="t-wrapper">
        <p>مجموع فاکتور</p>
        <p>{normalPriceRound(qCart.totalPrice,1)}</p>
      </div>
      <div className="t-wrapper">
        <p>تخفیف</p>
        <p>{normalPriceRound(qCart.totalOff,1)||"-"}</p>
      </div>
      <div className="t-wrapper">
        <p>مالیات</p>
        <p>{normalPriceRound(qCart.totalPrice,0.09)}</p>
      </div>
      <div className="t-wrapper">
        <p>مبلغ کل </p>
        <p>{normalPriceRound(qCart.totalPrice,1.09)}</p>
      </div>
      <button type="button" className="product-table-btn temp-btn"
      onClick={props.action?defAction:SetOrder}>
        <p>{props.action?"ثبت سپیدار":"ثبت سفارش"}</p>
      </button>
    </div>
    )
}
export default QuickTotal