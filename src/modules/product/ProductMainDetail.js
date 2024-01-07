import { useState ,useContext} from "react";
import CounterInput from "react-counter-input";

import env, {discountPercent, toEnglishNumber, normalPrice, siteApi } from "../../env";
import LoginMenu from "../allPages/header/loginMenu";
import AddPop from "./AddPop";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
  
function ProductMainDetail(props){
    const token=cookies.get(env.cookieName)

    const product = props.product.data;
    const cart = props.cart;
    console.log(product)
    const [pop,setPop] = useState(0);
    const [count,setCount] = useState(1);
    const [error,setError] = useState('');
    
    const addToCart=()=>{
        console.log(count,product.sku)
        const postOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token":token&&token.token,"userId":token&&token.userId},
            body: JSON.stringify({sku:product.sku,count:count}),
          }
          fetch(siteApi + "/cart/addToCart", postOptions)
            .then((res) => res.json())
            .then((result) => {
              console.log( result)
            })
        
    }
    var orderFound = '';
    //console.log(cartAdd)
    return(
        <div className="modal-content">
        <div className="modal-product">
            <div style={{display:"grid"}}>
                {/*productInfo.image&&<img className="modal-img" src={productInfo.image.sourceUrl} />*/}
                <h1>{product.title}</h1>
                <small >{"کد محصول: "+product.sku}</small>
                <i className="enLang">{product.ename}</i>
                
                <p className="modal-product-content" 
                dangerouslySetInnerHTML={{__html:product.description}}></p>
            </div>
                
        </div>
        <div className="pop-xtra-content">
        <div className="selectPart">
                {1?<div className="offerText">
                    <div className="offerTitle">
                        <div className="mainPrice">
                            {0?
                                <div className="offPriceHolder">
                                    <small>{normalPrice(2)}</small>
                                    <b>{discountPercent(3,2)+'%'}</b>
                                </div>:''}
                            {product.price?<strong >
                                {normalPrice(product.price)} <sub>تومان</sub></strong>:
                                <strong >
                                {normalPrice(3)} <sub>تومان</sub></strong>}
                        </div>
                    </div>
                </div>:<p>برای مشاهده قیمت، ابتدا حجم را انتخاب کنید</p>}
                {product.cat_id!==234&&<div className="mobileFlex"><label>اندازه بسته:</label>
                <select className="filterSort" >
                    
                    {product.get_product_warranty&&product.get_product_warranty.map(priceVolume=>(
                       <option key={priceVolume.id} id={priceVolume.id} title={priceVolume.price1} value={priceVolume.price2}>
                            {priceVolume.color_name}</option> 
                    ))}
                    
                </select>
                </div>}
                <div className="mobileFlex">
                    <label>تعداد محصول:</label>
                    <CounterInput
                        min={1}
                        max={10}
                        count={1}
                        onCountChange={count => setCount(count)}
                    />
                </div>
                {!token?<LoginMenu />:
                <a className="modal-sub-btn" onClick={addToCart}>
                        افزودن به سبد خرید</a>}
                {0&&cart&&cart.data&&cart.data.orderLists.find(item=>item.payload.product_sku==product.sku)&&
                cart.data.orderLists.find(item=>item.payload.product_sku==product.sku).payload.count===
                product.get_product_warranty[0].product_number_cart?<div>
                    <a className="modal-sub-btn disableBtn" >افزودن به سبد خرید</a>
                    <sub >حداکثر {product.get_product_warranty[0].product_number_cart} کالا از این محصول در سبد می توانید داشته باشید</sub></div>:
                0&&<a className="modal-sub-btn" onClick={()=>console.log(product.id,1)}>افزودن به سبد خرید
                </a>}
                <small className="errorHandle">{error}</small>
                {pop?<AddPop product={product} setPop={setPop} error={error}/>:''}
            </div>
            
        </div>
    </div>
    )
}
export default ProductMainDetail