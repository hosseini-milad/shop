import { useState } from "react"
import OrderTableRow from "./OrderTableRow"
import tabletrans from "../../translate/tables"
import OrderMultiReg from "./OrderComponent/OrderMultiReg"
import OrderMultiDone from "./OrderComponent/OrderMultiDone"

function OrderTable(props){
  const data =props.data
  const orders = props.orders
  const lang=props.lang;
  const [selectedOrder,setSelectedOrder] = useState([])
  const [detail,showDetail] = useState(-1)
  const [AllCheck,setAllCheck] = useState(0)
  const CheckHandel=(e)=>{
    setAllCheck(e.target.checked?1:0)
    var OrderList=props.orders.filter(item=>item.status=="undone")
    if(e.target.checked){
      setSelectedOrder(OrderList)
    }else{
      setSelectedOrder([])
    }
  }
  if(!orders||!orders.length) return <main>waiting</main>
  else  return(<>
        <table>
        <thead>
        <tr>
          <th>ردیف</th>
          <th className="checkBoxStyle">
              <input type="checkbox" checked={AllCheck} 
              onClick={(e)=>CheckHandel(e)}/></th>
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
              <p>{tabletrans.date[lang]}</p>
              <i></i>
            </th>

            
            <th>
            <p>{tabletrans.price[lang]}</p>
              <i></i>
            </th>
            <th>
            <p>{tabletrans.status[lang]}</p>
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
              selectedOrder={selectedOrder} data={data}
              order={order} index={i} key={i} lang={lang} allcheck={AllCheck} token={props.token}/>
          )):''}
          
        </tbody>
        
      </table>
      {props.isSale?
        <OrderMultiReg 
        TransRemain={props.TransRemain} 
        setTransRemain={props.setTransRemain} 
        data={data} TransData={props.TransData} 
        setTransData={props.setTransData} 
        bankList={props.bankList} 
        orders={selectedOrder} 
        token={props.token}
        setErrorPop={props.setErrorPop}
        errorPop={props.errorPop}
        
        />:
        <OrderMultiDone orders={selectedOrder} token={props.token}/>}
      </>

    )
}
export default OrderTable