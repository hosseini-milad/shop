import { PriceDiscount, normalPriceCount, rxFindCount } from "../../../env"
import tabletrans from "../../../translate/tables"
import OrderQuickDetail from "../OrderComponent/OrderQuickDetail"

function OrderDetails(props){
    const detail=props.data
    const order=props.content
    return(
    <div class="details-box">
        <div class="details-header">
            <p>{tabletrans.details[props.lang]}</p>
            <i class="fa-solid fa-pen pen"></i>
        </div>
        <OrderQuickDetail order={order} />
        <div class="details-price">
            <div class="price-col-1">
            <p>{tabletrans.subTotal[props.lang]}</p>
            <p>{tabletrans.shipping[props.lang]}</p>
            <p>{tabletrans.discount[props.lang]}</p>
            <p>{tabletrans.taxes[props.lang]}</p>
            <p>{tabletrans.total[props.lang]}</p>
            </div>
            <div class="price-col-2">
            <p>{normalPriceCount(detail.lenzPrice,rxFindCount(order))}</p>
            <p>0</p>
            <p>{order.totalDiscount}%</p>
            <p>0</p>
            <p>{PriceDiscount(detail.lenzPrice,rxFindCount(order),order.totalDiscount)}</p>
            </div>
        </div>
        </div>
    )
}
export default OrderDetails