import BreadCrumb from "../modules/allPages/BreadCrumb"
import ProductDetail from "../modules/product/ProductDetail"
import ProductMain from "../modules/product/ProductMain"
import MetaTags from 'react-meta-tags';
import SimpleFetch from "../components/simpleFetch"
import env, { siteApi } from "../env";
import SimpleAuth from "../components/simpleAuth";
import { useState } from "react";
import { useEffect } from "react";

function Product(){
    const sku= (window.location.pathname.split('/')[2]);
    const [ProductData,setProduct] = useState('') //= SimpleFetch(siteApi+env.productDataApi+sku) 
    //const CartData = SimpleAuth(siteApi+env.cartDetailApi) 
    //console.log(ProductData)
    useEffect(() => {
    
        const postOptions = {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({sku:sku}),
        }
        fetch(siteApi + env.productDataApi, postOptions)
          .then((res) => res.json())
          .then((result) => {
            setProduct( result)
          })
    
        //console.log(catData.categories[2].get_child,catName)
      }, [])
    return(
        <>
        {ProductData&&<MetaTags>
            <title>{ProductData.meta_title?(ProductData.meta_title+" | روانکاران شریف"):
                    (ProductData.title+" | روانکاران شریف") }</title>
            <meta name="description" content={ProductData.meta_disc} />
            <meta property="og:title" content="روانکاران شریف" />
          </MetaTags>}
        {ProductData&&<div><main>
            <BreadCrumb pName={ProductData.sku} 
                        pCat={ProductData.category_title+" /"} 
                        catUrl={"/category/"+ProductData.ename}/>
              
            <ProductMain product={ProductData} cart={''}/>
        </main>
        <ProductDetail product={ProductData&&ProductData.data}/></div>}
        </>
    )
}
export default Product