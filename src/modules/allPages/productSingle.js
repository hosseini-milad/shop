import { useEffect, useState } from 'react'
import {discountPercent, discountPrice, normalPrice, shortFetch, siteApiUrl, standardSku, toEnglishNumber} from '../../env'
import QuickView from '../../modules/CategoryPage/QuickView'

    const siteWidth = window.innerWidth;
    const url = window.location.pathname;
function ProductSingle(props){
    const product = props.product ;
    const [productShort,setProductShort] = useState('');
    //console.log(product)
    const productDescription =  product.description.split('نوع')[0]
    
    const [showMobileIcon,setMobileIcon] = useState(0);
    return(
        <div className="offer" key={product.databaseId} 
            onMouseOver={()=>setMobileIcon(1)}
            onMouseOut={()=>setMobileIcon(0)}>
					
            <div className="offerImg">
                <a href={"/product/"+product.sku}>
                    <img src={product.thumbUrl?siteApiUrl+ product.thumbUrl:
                            "/images/motor-oil.jpg"} alt={product.sku} />
                </a>
            </div>
            <div className="offerText">
                <div className="offerTitle">
                    <a href={"/product/"+standardSku(product.sku)}>
                        <h4>{product.title}</h4></a>
                    <small> <i>کد محصول:</i> {product.sku}</small>
                    <><div className='productDetail' 
                    dangerouslySetInnerHTML={{__html:productDescription}}>
                        
                </div>{product.price?<small>و ...</small>:''}</>
                    {/*<div className="offerShare">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                    <sub></sub>
                    </div>*/}
                    <div className="mainPrice">
                     {0?
                        <><div className="offPriceHolder">
                            <small>{normalPrice(24000)}</small>
                            <b>{2}%</b>
                        </div>
                        <strong>{normalPrice(23000)} <sub>تومان</sub></strong></>:
                        <><div className="offPriceHolder"></div>
                        {(product.price)?<strong>{normalPrice(product.price)} <sub>تومان</sub></strong>:
                            <a href="https://wa.me/+989398920184">تماس بگیرید</a>}</>}
                        
                    </div>
                    {/*<div className="youSave">
                        <span> تخفیف: <b>50.000</b> تومان</span>
                        <a href="" className="saveButton"><small>شرایط تخفیف</small></a>
    </div>*/}
                </div>
                <a className="offerButton" 
                    style={{display:siteWidth>700?"block":"none"}}>
                    <QuickView product={{data:product}} cart={props.cart}/>
                    {/*<span>مشاهده محصول</span>*/}
                </a>
            </div>
        </div>
    )
}
export default ProductSingle