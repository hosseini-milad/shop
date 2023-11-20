import { useEffect, useState } from "react"
import env, { normalPriceCount, rxFindCount } from "../../../env"

function OrderQuickDetail(props){
    const order = props.order
    const [sku,setSku]=useState()
    //console.log(order)
    useEffect(() => {
        const body={
            sku:"manager"
        }
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({sku:order.rxLenz.split(',')[2]})
          }
        fetch(env.siteApi + "/order/manufacture/find",postOptions)
      .then(res => res.json())
      .then(
        (result) => {setSku(result)},
        (error) => {
          console.log(error);
        }
        
    )},[])
    return(
      <>
            {sku?<div className="sub-order-table">
                <div className="sub-row">
                    <div className="sub-avatar">
                    <div className="sub-avatar-container">
                        <img src="/img/lenz01.jpg"
                        alt={sku.sku}/>
                        <div className="sub-info">
                        <p className="sub-name">{sku.title}</p>
                        <p className="sub-id">کد محصول: {order.rxLenz.split(',')[2]}</p>
                        </div>
                    </div>
                    </div>
                    <div className="sub-num">{rxFindCount(order)}</div>
                    <div className="sub-price">{normalPriceCount(order.rxLenz.split(',')[0])}</div>
                </div>
                <div className="sub-row">
                    <div className="sub-avatar">
                    <div className="sub-avatar-container">
                        <img src="/img/lenz02.jpg"
                        alt={order.coverCode}/>
                        <div className="sub-info">
                        <p className="sub-name">{order.coverCode}</p>
                        <p className="sub-id">{order.coverDesc}</p>
                        </div>
                    </div>
                    </div>
                    <div className="sub-num">{rxFindCount(order)}</div>
                    <div className="sub-price">{normalPriceCount(order.coverPrice)}</div>
                </div>
                {order.colorCode?<div className="sub-row">
                    <div className="sub-avatar">
                    <div className="sub-avatar-container">
                        <img src="/img/lenz02.jpg"
                        alt={order.coverCode}/>
                        <div className="sub-info">
                        <p className="sub-name">{order.colorCode}</p>
                        <p className="sub-id">{order.colorPrice}</p>
                        </div>
                    </div>
                    </div>
                    <div className="sub-num">{rxFindCount(order)}</div>
                    <div className="sub-price">{normalPriceCount(order.colorPrice)}</div>
                </div>:<></>}
                {order.mirrorCode?<div className="sub-row">
                    <div className="sub-avatar">
                    <div className="sub-avatar-container">
                        <img src="/img/lenz02.jpg"
                        alt={order.coverCode}/>
                        <div className="sub-info">
                        <p className="sub-name">{order.mirrorCode}</p>
                        <p className="sub-id">{order.mirrorPrice}</p>
                        </div>
                    </div>
                    </div>
                    <div className="sub-num">{rxFindCount(order)}</div>
                    <div className="sub-price">{normalPriceCount(order.mirrorPrice)}</div>
                </div>:<></>}
                {order.NazokTigh?<div className="sub-row">
                    <div className="sub-avatar">
                    <div className="sub-avatar-container">
                        <img src="/img/lenz02.jpg"
                        alt={order.coverCode}/>
                        <div className="sub-info">
                        <p className="sub-name">{order.NazokTigh}</p>
                        <p className="sub-id">{order.NazokTighPrice}</p>
                        </div>
                    </div>
                    </div>
                    <div className="sub-num">{rxFindCount(order)}</div>
                    <div className="sub-price">{normalPriceCount(order.NazokTighPrice)}</div>
                </div>:<></>}
                {order.moreInformation?<div className="sub-row">
                    <div className="sub-avatar">
                    <div className="sub-avatar-container">
                        <div className="sub-info">
                        <p className="sub-name">توضیحات: {order.moreInformation}</p>
                        </div>
                    </div>
                    </div>
                </div>:<></>}
            </div>:env.loader}</>
    )
}
export default OrderQuickDetail