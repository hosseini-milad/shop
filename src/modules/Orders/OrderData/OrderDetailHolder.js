import { useEffect } from "react"
import { useState } from "react"
import env from "../../../env"
import Status from "../../Components/Status"
import OrderDetails from "./OrderDetails"
import OrderHistory from "./OrderHistory"
import OrderUser from "./OrderUser"
import tabletrans from "../../../translate/tables"
import errortrans from "../../../translate/error"
import OrderOptions from "./OrderOptions"

function OrderDetailHolder(props){
  const url = window.location.pathname.split('/')[3]
  const direction = props.lang?props.lang.dir:errortrans.defaultDir;
  const lang = props.lang?props.lang.lang:errortrans.defaultLang;

  const [content,setContent] = useState('')
  const [user,setUser] = useState('')
  const [sku,setSku] = useState('')
  const [log,setLog] = useState('')
  useEffect(() => {
    var sku=''
    var postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({rxOrderNo:url})
      }
  fetch(env.siteApi + "/order/fetch-order",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      console.log(result)
        setContent(result.data)
        setUser(result.user)
        sku = result.data.rxLenz.split(',')[2]
        postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({sku:sku})
        }
      fetch(env.siteApi + "/order/manufacture/find",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
          setSku(result)
      },
      (error) => {
        console.log(error);
      }
        
    )
    },
    (error) => {
      console.log(error);
    }
  )
  var postOptions={
    method:'post',
    headers: {'Content-Type': 'application/json'},
    body:JSON.stringify({rxOrderNo:url})
  }
  fetch(env.siteApi + "/setting/orderlog",postOptions)
  .then(res => res.json())
  .then(
  (result) => {
    setLog(result.log)
  },
  (error) => {
    console.log(error);
  }
  )
},[])
  
if(content)
return(
    <div class="order-detail" style={{direction:direction}}>
      <div class="od-header">
        <div class="od-header-info">
          <i class={`fa-solid fa-angle-${direction==="rtl"?"right":"left"}` }
          onClick={()=>window.location.href="/orders"}></i>
          <div class="od-header-name">
            <p>{tabletrans.order[lang]} {url}</p>
            <p>{new Date(content.date).toLocaleDateString('fa')} - 
               {new Date(content.date).toLocaleTimeString('fa')}
            </p>
          </div>
          <Status class={"od-status cmp-status"} status={content.status} 
          lang={props.lang.lang}/>
        </div>
        <div class="od-header-btn">
          <select class="status-btn" name="" id="">
            <option value="completed">completed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">cancelled</option>
            <option value="refunded">Refunded</option>
          </select>
          <div class="print-btn">
            <i class="fa-solid fa-print"></i>
            <p>{tabletrans.print[lang]}</p>
          </div>
          <div class="edit-btn">
            <i class="fa-solid fa-pen"></i>
            <p>{tabletrans.edit[lang]}</p>
          </div>
        </div>
      </div>
      <div class="od-wrapper">
        <div class="od-col-1">
          <OrderDetails data={sku} content={content} lang={lang}/>
          <OrderHistory log={log} lang={lang}/>
        </div>
        <div class="od-col-2">
          <OrderUser user={user} lang={lang} direction={direction} orderNo={content.rxOrderNo}/>
          <OrderOptions data={sku} content={content} lang={lang} direction={direction} />
        </div>
      </div>
    </div>
    )
  else  return(env.loader
  )
}
export default OrderDetailHolder