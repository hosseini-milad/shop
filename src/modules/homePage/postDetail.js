import { useEffect, useState } from "react";
import SimpleFetch from "../../components/simpleFetch";
import env from "../../env";

function PostDetail(props){
    const catData = props.productData;
    const index = props.index;

    const [data,setData] = useState() 
    console.log(catData)
    useEffect(() => {
        fetch(env.blogMedia+catData.featured_media)
        .then(res => res.json())
        .then(
        (result) => {
            setData(previousState => {
                return { ...previousState, catImg: result }
              });
        })
        fetch(env.blogCategory+catData.categories[0])
        .then(res => res.json())
        .then(
        (result) => {
            setData(previousState => {
                return { ...previousState, category: result }
              });
        })
	},[])
    //const catImg = SimpleFetch(env.blogMedia+catData.featured_media);
    //const category=SimpleFetch(env.blogCategory+catData.categories[0])
    return(<>{data&&
<div className="blogPart" key={index}
    style={{direction: index===1?"ltr":"rtl"}}>
    <div className="blogText">
        <div className="topTitle">
            {data.category&&data.category.name}
        </div>
        <h2>
            {catData.title&&catData.title.rendered}	
        </h2>
        <p className="postContent" 
        dangerouslySetInnerHTML={{__html:catData.excerpt.rendered}}>
        </p>
        <a href={catData.link} className="catalogDl product3Dl">
        <i className="icon-size fas fa-eye"></i> مشاهده مطلب</a>
        
    </div>
    <div className="blogImg">
        {data.catImg&&<div className="blogimg-anim">
            <img className=""  alt={catData.title.rendered} 
            src={data.catImg.media_details&&data.catImg.media_details.sizes.medium_large?
                data.catImg.media_details.sizes.medium_large.source_url:
                data.catImg.source_url} />
        </div>}
    </div>
</div>}</>
    )
}
export default PostDetail;