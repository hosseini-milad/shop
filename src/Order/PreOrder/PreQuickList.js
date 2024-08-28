import PreQuickItem from "./PreQuickItem"

function PreQuickHolder(props){
  const cart= props.cart&&props.cart.qCartAdmin
  //console.log(cart)
  if(!cart||cart.length<=1) return(<></>)
  else return(
      <section className="orders-sec">
        <div className="title">
          <p>سفارشات باز</p>
          <div className="orders-total">
            <p>تعداد سفارشات باز: {cart.length}</p>
          </div>
        </div>
        
        <div className="order-wrapper">
          <div className="border-title">
            <div className="bu-name">
            <div className="col">
        {cart.map((cart,i)=>(
          <PreQuickItem key={i} data={cart} index={i}/>
        ))}
        </div>
        </div>
        </div>
        </div>
      </section>
    )
}
export default PreQuickHolder