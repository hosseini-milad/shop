import { useState } from "react"
import tabletrans from "../../translate/tables"
import Status from "../Components/Status"
import { normalPriceCount} from "../../env";
import VisitorPopup from "./VisitorPopup";
import OrderPopup from "./OrderPopup";
function DTableRow(props){
  const order =props.order
  const [Vpop,setVpop]=useState("")
  const [OrderPop,setOrderPop]=useState("")
  console.log(OrderPop)
    return(
    <>
        <tr onClick={()=>setVpop(order.sku)}>
          <td>{props.index+1}</td>
          <td>{order.sku}</td>
          <td>{order.title}</td>
          <td>{order.brandData?order.brandData.title:''}</td>
          <td>{order.count}</td>
          <td>{normalPriceCount(order.totalPrice)}</td>
        </tr>
        {Vpop?<VisitorPopup content={order} setVpop={setVpop} setOrderPop={setOrderPop}/>:<></>}
        {OrderPop?<OrderPopup CartNum={OrderPop} setOrderPop={setOrderPop}/>:<></>}
    </>
    )
}
export default DTableRow