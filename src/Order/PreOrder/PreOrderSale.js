import OpenOrderItem from "./OpenOrderItem"
import PreOrderItem from "./PreOrderItem"

function PreOrderSale(props){
  const cart= props.cart&&props.cart.cart
  const total= props.cart&&props.cart.cartDetail
  const access = props.access
  //console.log(cart)
  if(!cart) return(<></>)
  else return(
        <section className="orders-sec">
        <div className="title">
          <p>سفارشات باز</p>
          <div className="orders-total">
            <p>تعداد سفارشات : {cart.length}</p>
          </div>
        </div>
        {cart.map((cart,i)=>(
          <OpenOrderItem key={i} data={cart}
            total={total} index={i}/>
        ))}
        {(access=="edit"||access=="full")?<div className="orderButtonHolder">
        <input type="button" className="orderButton" value={"ثبت سپیدار"}
        />
        </div>:<></>}
        
      </section>
    )
}
export default PreOrderSale