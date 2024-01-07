import { useEffect, useState } from 'react';
import SimpleFetch from '../../components/simpleFetch'
import env, { siteApi } from '../../env';
import PostDetail from "./postDetail";

function Posts(){
	const [queryLists,setData] = useState() 
    
    useEffect(() => {
        fetch(env.blogPostList)
        .then(res => res.json())
        .then(
        (result) => {
            setData(previousState => {
                return { ...previousState, blogPostList: result }
              });
        })
	},[])
	//const queryLists = SimpleFetch(env.blogPostList)
    return(
        <section className="blogParts">
			<div className="blogTitle">
				<h2 >
				نمی دانید که چه روغنی برای خودرویتان مناسب است؟!
				</h2>
				<p>
				مقاله های زیر به شما کمک میکنند که روغن موتور مناسب برای خودرو خود را بشناسید.
				</p>
			</div>
			{queryLists&&queryLists.blogPostList&&queryLists.blogPostList.slice(0,3).map((catData,i)=>(
			  <PostDetail productData={catData} index={i} key={i}/>
			))}
		</section>
    )
}
export default Posts