
import { useState } from 'react';
import env, { filterToUrl, siteApi } from '../../../env';
import ProductSingle from '../productSingle'

function SearchPList(props){
    const productQuery = `{
        "filter":[${props.carName?props.carName.id:props.motorOil}],
        "category":[],
        "brands":[],
        "search_text":"",
        "max_price":"",
        "page":1,
        "sortby":""
    }`
    const [products,setProducts] = useState('');
    const postOptions={
        method:'post',
        headers: { 'Content-Type': 'application/json' },
          body:  productQuery
      }
    !products&&fetch(siteApi+env.productListApi,postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        setProducts(result)
        //console.log(result)
      },
      (error) => {
        console.log(error);
      }
    )
    const TagProduct = ''//FetchGraph(PRODUCT_TAG_QUERY);
    //console.log(products)
    return(<div className="searchPhase1 searchPhase3">
             
            <ul className="oilPart">
                {products&&products.product.data.map((product,i)=>(
                    i<3 &&
                      <ProductSingle product = {product} key={i}/>
                    
                ))}
                
                <div className="moreProductSearch">
                  <a href={'/category/motor-oil?'+filterToUrl(JSON.parse(productQuery))}>مشاهده بیشتر</a></div>
            </ul>
            
        </div>)
}
export default SearchPList