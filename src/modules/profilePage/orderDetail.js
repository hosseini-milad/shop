import { useState ,useEffect } from "react";
import env, { normalPrice, siteApi } from "../../env";

function OrderDetail(props){
    const token = props.token
    const [orders,setOrders] = useState();
    const [tabShow,setTabShow] = useState(0);
    const [orderDetail,setOrderDetail] = useState(0);
    useEffect(()=>{
      const getOptions={
        method:'get',
        headers: { 'Content-Type': 'application/json' ,
        "x-access-token":token.token,"userId":token.userId}
      }
      fetch(siteApi+"/auth/list-orders",getOptions)
        .then(res => res.json())
        .then(
        (result) => {
            //console.log(result.data.orders)
            setOrders(result.data);
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
        <table className="orderList">
            <tbody>
                <tr>
                    <th>شماره سفارش</th>
                    <th>تاریخ سفارش</th>
                    <th>وضعیت سفارش</th>
                    <th>وضعیت پرداخت</th>
                </tr>
                {orders&&orders.map((order,i)=>(<>
                    <tr className="orderItem" key={i}>
                        <td className="orderNo">{order.orderNo}</td>
                        <td>تاریخ سفارش: {order.date}</td>
                        <td>وضعیت سفارش: {order.status}</td>
                        <td>وضعیت پرداخت: {order.payStatus}</td>
                    </tr> 
                    <div className="orderDetail">
                        <button className="orderBtnShow" 
                            onClick={()=>{setTabShow(tabShow===i+1?0:i+1);
                                loadOrder(order.orderNo)}}>
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
                                {order.orderItems&&order.orderItems.map((cartItem,i)=>(
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{cartItem[0].sku}</td>
                                        <td>{cartItem[0].title}</td>
                                        <td>{cartItem[0].count}</td>
                                        <td>{normalPrice(cartItem[0].price)}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div></>
                ))}
            </tbody>
        </table>
    </div>
    
    )


}
export default OrderDetail