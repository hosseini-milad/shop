import { useState } from "react"
import OrderTableRow from "./OrderTableRow"
import tabletrans from "../../translate/tables"

function OrderTable(props){
  const orders = props.orders
  const lang=props.lang;
  const [detail,showDetail] = useState(-1)
    return(
        <table>
        <thead>
        <tr>
          <th className="checkBoxStyle">
              <input type="checkbox" name="" id=""/></th>
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
          {orders&&orders.filter?orders.filter.map((order,i)=>(
            <OrderTableRow detail={detail} showDetail={showDetail} 
              order={order} index={i} key={i} lang={lang}/>
          )):''}
          
        </tbody>
      </table>

    )
}
export default OrderTable