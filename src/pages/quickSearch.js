import { useEffect, useState } from "react";
import env, { siteApi } from "../env";
import QuickSearch from "../modules/allPages/SearchPart/quickSearch";

function QuickSearchPage(){
    const [data,setCatData] = useState() 
    useEffect(() => {
        fetch(siteApi+env.filterListApi+"motor-oil")
        .then(res => res.json())
        .then(
        (result) => {
            setCatData(previousState => {
                return { ...previousState, quickSearch: result }
              });
        })
    },[])
    return(
        <div className="homeSideBar">
            <div className="megaSideBar">
                <h3>جستجوی خودرو</h3>
                <p>سریع ترین و ساده ترین راه برای تعیین اینکه به کدام محصولات نیاز دارید. مشاهده همه راهنماها ›</p>
            </div>
            {data&&<QuickSearch quickSearch={data.quickSearch}/> }
        </div> 
    )
}
export default QuickSearchPage