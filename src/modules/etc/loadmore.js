import { useState } from "react"
import { MetaTags } from "react-meta-tags"

function LoadMore(props){
    const catDetail = props.catDetail;
    //console.log(catDetail)
    const [loadMore, setLoadMore] = useState(0);
    const loadNow=()=>{
        loadMore?setLoadMore(0):setLoadMore(1);
    }
    return(<>
        {catDetail&&<div className="loadMore" style={{height:loadMore?"auto":"180px"}}>
        <MetaTags>
            <title>{catDetail.title +" | روانکاران شریف" }</title>
            
            <meta property="og:title" content={catDetail.description} />
          </MetaTags>
            <p className="loadP" dangerouslySetInnerHTML={{__html:
            catDetail.description}}></p>
            <div className="loadMoreBtn">
                <button onClick={()=>loadNow()} className="productOption loadBtn">
                    {loadMore?"بستن":"بیشتر بخوانید"}</button>
            </div>
        </div>}</>
    )
}
export default LoadMore