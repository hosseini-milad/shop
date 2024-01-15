import Popup from 'reactjs-popup';
import React ,{ useState } from 'react';
import ProductMainDetail from '../product/ProductMainDetail';
import { siteApiUrl } from '../../env';


function QuickView(props){
    const productInfo = props.product;
    return(
        <Popup trigger={<div className="buttonHandler"><i className="icon-size fas fa-shopping-cart"></i> </div>} modal nested>
            {close => (<div className='imgPopUpHolder'>
            <img className="modalImg" src={productInfo.data&&productInfo.data.thumbUrl?siteApiUrl+ productInfo.data.thumbUrl:
                "/images/motor-oil.jpg"} alt={productInfo.data&&productInfo.data.sku} />
            <div className="modal modalProduct">
                <div className="modal-header"> <img src="https://sharifoilco.com/assets/imgs/header-logo.png"/> </div>
                 
                <ProductMainDetail product={productInfo}/>
                
                <a href={"/product/"+productInfo.sku} className="modal-product-detail" >جزئیات کامل محصول 
                <i className="fas fa-angle-left"></i></a>
            </div></div>
            )}
        </Popup>
        )
}
export default QuickView;