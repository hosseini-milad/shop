import { useEffect, useState } from 'react';
import env, { siteApi } from '../../env'
import ProductSingle from '../allPages/productSingle'
import Paging from './paging';
function ProductList(props){
    //console.log(JSON.parse(props.productsQuery).page)
    const [error,setError] = useState('');
    const products= props.products
    
    //const products= SimpleFetch(siteApi+env.productFilterApi,props.productsQuery)
    //console.log(products)
    return(<>{!error?
    <div className="productsLists">
        {products&&products.data&&products.data.map((product,i)=>(
            <ProductSingle product={product} key={i}/>
        ))}
    </div>:<h3>{error}<br/>
    <button onClick={()=>setTimeout(window.location.reload(),2000)}>تلاش مجدد</button></h3>}
    {products&&<Paging products={products} query={{test:1}/*props.productsQuery*/}/>}
    </>
    )
}
export default ProductList