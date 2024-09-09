import { useEffect, useState } from "react"
import env from "../../env"
import Cookies from 'universal-cookie';
import FishPrintCart from "./FishPrintCart";
import PrintCart from "./PrintCart";
import PrintInvoice from "./PrintInvoice";
const cookies = new Cookies();
const url = document.location.pathname.split('/')[3]
const type = document.location.pathname.split('/')[2]

const FaktorSitePrint = (props)=>{
    
    const [faktorList,setFaktorList] = useState() 
    
    const token=cookies.get('faktor-login')
    const printNow = () => {
        window.print();
      };
    console.log(faktorList)
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
                        description:result.cart[0].description}) 
            },
            (error) => {
                console.log(error)
            })
    },[])
    return(
        <div className="printArea">
            {faktorList?type==="fishprint"?
                <FishPrintCart token={token}
                orderData={faktorList} userInfo={''} url={url}/>:
                type==="print"?
                <PrintCart orderData={faktorList} 
                userInfo={''} url={url}/>  :
                <PrintInvoice orderData={faktorList} 
                userInfo={''} url={url}/> :
            <main>در حال دریافت اطلاعات</main>}
            <div className="btn-wrapper">
                <button className="print-btn" onClick={()=>printNow()}>چاپ A4</button>
            </div>
        </div>
    )
}
export default FaktorSitePrint