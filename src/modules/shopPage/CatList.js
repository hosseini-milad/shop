
import { useState } from "react";
function CatList(props){
    const  category = props.category;
    const [showAll,setShowAll] = useState(0)
    return(
        <div className="productsLists">
            <div className="subCatTitle">
                <h4> دسته بندی ها </h4>
            </div>
            <div className="shopLists">
                {category.productCategories.nodes.map((cats,i)=>(
                  <div className="shopPlace" key={i}
                  onMouseOver={()=>setShowAll(i+1)}  onMouseOut={()=>setShowAll(0)}>
                    <img src={cats.image.sourceUrl} />
                    <a href="" style={{display:showAll===i+1?"block":"none"}} className="modal-sub-btn shopButton">همه محصولات</a>
                    <div className="productText">
                        <h4>{cats.name}</h4>
                    </div>
                  </div>
                ))}
                
            </div>
        </div>
    )
}
export default CatList