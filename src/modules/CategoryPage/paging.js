import { filterToUrl } from "../../env";

function Paging(props){
    const products = props.products;
    const query= {}
      try{query=JSON.parse(props.query)}catch{}
    const urlParams = new URLSearchParams(document.location.search);
    const page = urlParams.get('page')
    //query.page = 1
    console.log(products)
    return(
        <div className="paging">
        <ul>
          {products&&0&&products.data.map((pageNum,i)=>(
            
            <li key={i} className={pageNum.active?"pageActive pageItem":
                pageNum.url?"pageItem":"pageDisabled pageItem"}
                id={query.page = 
                  pageNum.label.includes("Next")?(!page?'':parseInt(page)+1):
                  pageNum.label.includes("Prev")?(!page?'':parseInt(page)-1):
                  pageNum.label}>
                
                <a href={"/category/"+query.category+"?"+filterToUrl(query)}
                >{pageNum.label.includes("Next")?<i className="fas fa-angle-left"></i>:
            pageNum.label.includes("Prev")?<i className="fas fa-angle-right"></i>:
            pageNum.label}</a></li>
          ))}
        </ul>
      </div>
    )
}
export default Paging