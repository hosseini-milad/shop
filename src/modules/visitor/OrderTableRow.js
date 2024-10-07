import { useState } from "react"
import tabletrans from "../../translate/tables"
import Status from "../Components/Status"
import { normalPriceCount} from "../../env";
import VisitorPopup from "./VisitorPopup";

function DTableRow(props){
  const order =props.order
  const [Vpop,setVpop]=useState("")

  // let totalPrice = 0
  // const total = order.price.map(price)=>(
  //   totalPrice =totalPrice + price
  // )
  
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
        {Vpop?<VisitorPopup content={Vpop} setVpop={setVpop}/>:<></>}
        
    </>
    )
}
export default DTableRow