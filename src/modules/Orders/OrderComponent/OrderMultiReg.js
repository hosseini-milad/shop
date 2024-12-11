import { useState } from "react"
import env, { normalArrayRound,minusArrayRound,normalPriceRound } from "../../../env"
import BankSelect from "../Bank/BankSelect"

function OrderMultiReg(props){
    const [Loader,setLoader]=useState("")
    const [Amount,setAmount]=useState("")
    const data=props.data
    const token = props.token
    const orders = props.orders
    const TransData=props.TransData
    const setTransData=props.setTransData
    const totalPrice = normalArrayRound(orders&&
      orders.map(item=>(item.totalCart&&item.totalCart.totalPrice)))
    const TotalTrans=normalArrayRound(TransData&&
        TransData.map(item=>(parseInt(item.payValue))))
    const RemainTotal=props.TransRemain&&props.TransRemain
    const setSepidarTotal=()=>{
      setLoader(1)
      if(!orders||!orders.length)
        return('no order selected')
      const body={
        orderNo:orders.map(item=>item.cartNo)
      }
      const postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json',
          "x-access-token":token&&token.token,"userId":token&&token.userId},
          body:JSON.stringify(body)
        }
        
    fetch(env.siteApi + "/setting/multi-sepidar",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        if(result.error){
          props.setErrorPop({message:result.message,color:"green"})
          setTimeout(()=>props.setErrorPop({message:'',color:"brown"}),3000)
        }
        console.log(result)
        setLoader(0)
        setTimeout(()=>window.location.reload(),1000)
      },
      (error) => {
        console.log(error);
        setLoader(0)
      })
      
    }
    return(
      <>
          {props.orders&&props.orders.length?
            <div className="bank-wrapper">
              <h6>روش پرداخت</h6>
              <p>مبلغ کل سفارش: {totalPrice}</p>
              <div className="bank-form"><BankSelect Amount={Amount} setAmount={setAmount} totalPrice={totalPrice} orders={orders} TransData={TransData} setTransData={setTransData} token={token} bankList={props.bankList} TransRemain={props.TransRemain} setTransRemain={props.setTransRemain}/></div>
              
              
              {(Amount.remain<=0)?<div className="regSepidar">
                {Loader?
                <div><p>درحال پردازش</p></div>:
                <div style=  {{cursor:"pointer"}} className="regSepidar"
                onClick={setSepidarTotal}><p>ثبت سپیدار</p>
                </div>}
              </div>:<></>}
            </div>:<></>}
          
        </>
    )
}
export default OrderMultiReg