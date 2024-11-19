import env, { TAX, normalPriceCount, normalPriceRound } from "../../env";
import { useEffect } from "react";
var token = JSON.parse(localStorage.getItem('token-lenz'));


function PublicPrint(props){
  const orderInfo = props.orderData
  const faktorItems =orderInfo?orderInfo.cartItems:''
  const total = orderInfo?orderInfo.orderData:''
  const userInfo = orderInfo?orderInfo.userData[0]:''
  const manInfo = orderInfo?orderInfo.manData[0]:''
  const url = document.location.pathname.split('/')[2]
  console.log(url)
  useEffect(()=>{   
    const postOptions={
        method:'post',
        headers: { 'Content-Type': 'application/json' ,
        "x-access-token": token&&token.token,
        "userId":token&&token.userId},
        body:JSON.stringify({cartNo:url})
      }
    fetch(env.siteApi + "/panel/faktor/public-cart-find",postOptions)
    .then(res => res.json())
    .then(
        (result) => {
            console.log(result)
                
        },
        (error) => {
            console.log(error)
        })
},[])

    return(
        <div>hi</div>
    )

  }

export default PublicPrint