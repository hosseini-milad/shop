import { useEffect, useState } from "react"
import env from "../../env"
import Cookies from 'universal-cookie';
import SepidarPrint from "./SepidarPrint";
import SepidarFishPrint from "./SepidarFishPrint";
import OfficialPrintSepidar from "./OfficialPrintSepidar";
import LinkModal from "../../components/Modal/LinkModal";
const cookies = new Cookies();
const url = document.location.pathname.split('/')[2]
// const type = document.location.pathname.split('/')[2]

const PublicOfficial = (props)=>{

    const [faktorList,setFaktorList] = useState() 
    const [userData,setUserData] =  useState() 
    const token=cookies.get(env.cookieName)
    const [error,setError] = useState('')
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
        fetch(env.siteApi + "/panel/faktor/public-cart-find",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                if(result.error){
                    setError(result.error)
                }
                else if(result.cart.error){
                    setError(result.cart.error)
                }
                else{
                    setFaktorList(result) 
                    setUserData(result.cart[0].userData[0])
                }
            },
            (error) => {
                console.log(error)
            })
    },[])

    if(error){
        return(
            <div className="container">
                {error}</div>
        )
    }
    else
    return(
        <div className="print-container">
            {/* {faktorList?type==="fishprint"?<>
            <SepidarFishPrint orderData={faktorList.cart} userInfo={userData} />
            
            </>
            : */}
            {faktorList?<><OfficialPrintSepidar orderData={faktorList.cart[0]} userInfo={userData} data={faktorList} />
            
            </> 
            :<main>در حال دریافت اطلاعات</main>}
            
        </div>
    )
}
export default PublicOfficial