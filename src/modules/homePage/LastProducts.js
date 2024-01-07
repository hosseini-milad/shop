import { useState } from 'react';
import ProductSingle from '../allPages/productSingle';
function LastProducts(props){
	const categoryList = props.catList;
		
	const [tabIndex,setTabIndex] = useState(0); 
    return(
        <section className="offerPart">
			<div className="offerTabs">
				<ul>
					{categoryList.map((cats,i)=>(i<3&&
						<li key={i} onClick={()=>setTabIndex(i)} className={tabIndex===i?"offerActive":""}>پرفروش ترین {cats.payload.title}</li>
					))}
				</ul>
			</div>
			{categoryList.map((cats,i)=>(i<3&&
				<div key={i} className="offerHolder" style={{display:tabIndex===i?"block":"none"}}>
				<div className="offerList">
					{cats.payload.products.map((product,j)=>(j<5&&
					<ProductSingle product = {product.payload} key={j} /*cart={cart}*//>
				))}</div>
				
				</div>
			))}
			
		</section>
    )
}
export default LastProducts