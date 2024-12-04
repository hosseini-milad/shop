import { useEffect, useState } from "react"
import env from "../../env"
import Cookies from 'universal-cookie';
import OfficialPrint from "./OfficialPrint";
import LinkModal from "../../components/Modal/LinkModal";
const cookies = new Cookies();
const url = document.location.pathname.split('/')[2]


const PublicSepidar= (props)=>{

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
            body:JSON.stringify({faktorId:url})
          }
        fetch(env.siteApi + "/panel/faktor/public-sepidar-find",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                if(result.error){
                    setError(result.error)
                }
                else if(result.faktor.error){
                    setError(result.faktor.error)
                }
                else{
                    setFaktorList(result.faktor) 
                    setUserData(result.userDetail)
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
            {faktorList?<>
            <OfficialPrint orderData={faktorList} userInfo={userData}/>
            
            </>
            :<main>در حال دریافت اطلاعات</main>}
            
        </div>
    )
}
export default PublicSepidar
