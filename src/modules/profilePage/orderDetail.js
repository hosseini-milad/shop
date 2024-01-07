import { useState ,useEffect } from "react";
import env, { normalPrice, siteApi } from "../../env";

const token = JSON.parse(localStorage.getItem('token-oil'));
function OrderDetail(){
    const [orders,setOrders] = useState(1);
    const [tabShow,setTabShow] = useState(0);
    const [orderDetail,setOrderDetail] = useState(0);
    useEffect(()=>{
      const getOptions={
        method:'get',
        headers: { 'Content-Type': 'application/json' ,
        "Authorization": "Bearer "+(token&&token.token)}
      }
      fetch(siteApi+env.newUserOrder,getOptions)
        .then(res => res.json())
        .then(
        (result) => {
            //console.log(result.data.orders)
            setOrders(result);
        },
        (error) => {
          console.log(error);
        })
    },[])
    console.log(orderDetail)
    const loadOrder=(orderId)=>{
        setOrderDetail('')
        const getOptions={
            method:'get',
            headers: { 'Content-Type': 'application/json' ,
            "Authorization": "Bearer "+(token&&token.token)}
          }
          fetch(siteApi+env.newUserDetail+orderId,getOptions)
            .then(res => res.json())
            .then(
            (result) => {
                //console.log(result.data.orders)
                setOrderDetail(result);
            },
            (error) => {
              console.log(error);
            })
    }
    return(
    <div className="orderHolders">
        <h2>لیست سفارشات</h2>
        <div className="orderList">
            {orders&&orders.data&&orders.data.orders.map((order,i)=>(
                <div className="orderItem" key={i}>
                    <div className="orderNo">
                        <span>شماره سفارش: {order.payload.order_no}</span>
                        <span>تاریخ سفارش: {order.payload.date}</span>
                        <span>وضعیت سفارش: {order.payload.status}</span>
                    </div> 
                    <div className="orderDetail">
                        <button className="orderBtnShow" 
                            onClick={()=>{setTabShow(tabShow===i+1?0:i+1);
                                loadOrder(order.payload.order_no)}}>
                                {tabShow===i+1?"بستن جزئیات":"جزئیات سفارش"}</button>
                        <table style={{display:(tabShow===i+1)?"block":"none"}}>
                            <tbody>
                                <tr>
                                    <th>ردیف</th>
                                    <th>شناسه محصول</th>
                                    <th>نام محصول</th>
                                    <th>تعداد</th>
                                    <th>قیمت واحد</th>
                                    <th>قیمت محصول</th>
                                </tr>
                                {orderDetail&&orderDetail.data&&orderDetail.data.orderLists&&
                                    orderDetail.data.orderLists.map((cartItem,i)=>(
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{cartItem.payload.product_sku}</td>
                                        <td>{cartItem.payload.product_title}</td>
                                        <td>{cartItem.payload.count}</td>
                                        <td>{normalPrice(cartItem.payload.price)}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    </div>
    
    )


}
export default OrderDetail