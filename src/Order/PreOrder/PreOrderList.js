import PreOrderItem from "./PreOrderItem"

function PreOrderHolder(props){
  const cart= props.cart&&props.cart.cart
  const total= props.cart&&props.cart.cartDetail
  //console.log(cart)
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
          <PreOrderItem key={i} data={cart}
            total={total} index={i}/>
        ))}
      </section>
    )
}
export default PreOrderHolder