import { useState } from "react"
import tabletrans from "../../translate/tables"
import Status from "../Components/Status"

function DTableRow(props){
  const order =props.order
  // let totalPrice = 0
  // const total = order.price.map(price)=>(
  //   totalPrice =totalPrice + price
  // )
  
    return(
        <tr>
            <td>{order.sku}</td>
            <td>{order.title}</td>
            <td>{order.brand}</td>
            <td>{order.count}</td>
            <td>{order.totalPrice}</td>
          </tr>
    )
}
export default DTableRow