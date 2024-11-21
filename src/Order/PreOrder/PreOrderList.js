import PreOrderItem from "./PreOrderItem"
import { useState } from "react"
import env from "../../env"
function PreOrderHolder(props){
  const token=props.token
  const user=props.user
  const cart= props.cart&&props.cart.cart
  const total= props.cart&&props.cart.cartDetail
  if(!cart) return(<></>)
  else return(
        <section className="orders-sec">
        <div className="title">
          <p>سفارشات</p>
          <div className="orders-total">
            <p>تعداد سفارشات : {cart.length}</p>
          </div>
        </div>
        {cart.map((cart,i)=>(
          <PreOrderItem 
          key={i} 
          data={cart} 
          setCart={props.setCart}
          total={total} 
          index={i} 
          token={token} 
          user={user} 
          setError={props.setError}
          />
        ))}
      </section>
    )
}
export default PreOrderHolder