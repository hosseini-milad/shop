import { useEffect, useState } from "react"
import env from "../../env"
import Cookies from 'universal-cookie';
import FishPrintCart from "./FishPrintCart";
const cookies = new Cookies();


const PrintFish = (props)=>{
    const [faktorList,setFaktorList] = useState() 
    const token=cookies.get(env.cookieName)
    const url=props.url
    useEffect(()=>{
        //console.log(search)
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({cartNo:url})
            }
        fetch(env.siteApi + "/panel/faktor/cart-find",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if(result&&result.cart&&result.cart.length)
                    setFaktorList({cartItems:result.cart[0].cartItems,
                        userData:result.cart[0].userData,
                        manData:result.cart[0].managerData,
                        orderDate:result.cart[0].progressDate,
                        orderData:result.orderData,
                        stockId:result.cart[0].stockId,
                        description:result.cart[0].description,
                        taskData:result.taskData&&result.taskData.taskStep,
                        cart:result.cart
                    }) 
            },
            (error) => {
                console.log(error)
            })
    },[])
    
    return(
        <div className="printArea">
            {faktorList?
                <FishPrintCart token={token}
                orderData={faktorList} userInfo={''} url={url}/>: 
                <main>در حال دریافت اطلاعات</main>}
            
        </div>
    )
}
export default PrintFish