import { useState } from "react"
import OrderTableRow from "./OrderTableRow"
import tabletrans from "../../translate/tables"
import OrderMultiReg from "./OrderComponent/OrderMultiReg"
import OrderMultiDone from "./OrderComponent/OrderMultiDone"

function OrderTable(props){
  const orders = props.orders
  const lang=props.lang;
  const [selectedOrder,setSelectedOrder] = useState()
  const [detail,showDetail] = useState(-1)
  const [AllCheck,setAllCheck] = useState(0)
  console.log(selectedOrder)
  if(!orders||!orders.length) return <main>waiting</main>
  else  return(
        <table>
        <thead>
        <tr>
          <th>ردیف</th>
          <th className="checkBoxStyle">
              <input type="checkbox" checked={AllCheck} 
              onClick={(e)=>{setSelectedOrder(e.target.checked?props.orders:[]);
              setAllCheck(e.target.checked?1:0)}}/></th>
            <th>
              <p>{tabletrans.orderNumber[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.customerInfo[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.phoneNumber[lang]}</p>
              <i></i>
            </th>
            <th>
            <p>{tabletrans.payStatus[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.transport[lang]}</p>
              <i></i>
            </th>
            <th>
              <p>{tabletrans.date[lang]}</p>
              <i></i>
            </th>

            {/* <th>
              <p>{tabletrans.item[lang]}</p>
              <i></i>
            </th> */}
            <th>
            <p>{tabletrans.price[lang]}</p>
              <i></i>
            </th>
            <th>
            <p>{tabletrans.transportationStatus[lang]}</p>
              <i></i>
            </th>
            <th>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?orders.map((order,i)=>(
            <OrderTableRow detail={detail} showDetail={showDetail} 
              cart={props.cart} setSelectedOrder={setSelectedOrder}
              selectedOrder={selectedOrder}
              order={order} index={i} key={i} lang={lang} allcheck={AllCheck}/>
          )):''}
          
        </tbody>
        {props.isSale?
        <OrderMultiReg orders={selectedOrder} token={props.token}/>:
        <OrderMultiDone orders={selectedOrder} token={props.token}/>}
      </table>

    )
}
export default OrderTable