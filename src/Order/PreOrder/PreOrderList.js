import PreOrderItem from "./PreOrderItem"

function PreOrderHolder(){
    return(
        <section className="orders-sec">
        <div className="title">
          <p>سفارشات</p>
          <div className="orders-total">
            <p>تعداد سفارشات : 1</p>
          </div>
        </div>
        <PreOrderItem />
      </section>
    )
}
export default PreOrderHolder