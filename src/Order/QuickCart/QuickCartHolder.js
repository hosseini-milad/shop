import { useEffect, useState } from "react";
import env from "../../env";
import QuickActions from "./QuickActions"
import QuickTable from "./QuickTable"
import QuickTotal from "./QuickTotal"
import Cookies from 'universal-cookie';

function QuickCartHolder(props){
  const token = props.token
  const [search,setSearch] = useState()
  const [content,setContent] = useState()
  useEffect(() => {
    if(!search||search.length<4) {setContent(''); return}
    const postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json',
        "x-access-token":token&&token.token,"userId":token&&token.userId},
        body:JSON.stringify({search:search})
      }
      console.log(postOptions)
  fetch(env.siteApi + "/panel/faktor/find-products",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      if(result.error){
        if (result.error === "Invalid Token Error")
        {
            const cookies = new Cookies();
            cookies.remove(env.cookieName,{ path: '/' });
            setTimeout(()=>(window.location.reload(),1000))
        }
      }
      else{
        setContent('')
        setTimeout(()=> setContent(result),200)
      }
    },
    (error) => {
      console.log(error);
    }
    
)},[search])
//console.log(content)
    return(
    <section className="admin-table-sec ">
        <QuickTable data={content} token={token}
          cart={props.cart} setCart={props.setCart}
          user={props.user} action={props.addToCart}
          delete={props.deleteFromCart} setError={props.setError}
          search={search} setSearch={setSearch}/>
        <div className="product-table-btn-wrapper">
          <QuickActions />
          <QuickTotal data={props.cartDetail} token={token}
          setCart={props.setCart} action={props.regCart}
            user={props.user} setError={props.setError}/>

        </div>

      </section>
    )
}
export default QuickCartHolder