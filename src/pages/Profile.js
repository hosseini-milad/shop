import BreadCrumb from "../modules/allPages/BreadCrumb";
import ProfileMain from "../modules/profilePage/profileMain";
import ProfileSideBar from "../modules/profilePage/profileSideBar";
import '../css/profile.css'
import { useState } from "react";
import SimpleAuth from "../components/simpleAuth";
import env, { siteApi } from "../env";
function Profile(){
    const[profilePage,setProfilePage] = useState(0)
    const token= JSON.parse(localStorage.getItem('token-oil'));
    const userInfo= SimpleAuth(siteApi+env.userInfo)
   // console.log(userInfo)
    return(<>
        {token&&<main>
            <BreadCrumb pName={"حساب کاربری"}/>
            {userInfo&&<div className="profileContainer">
                <ProfileSideBar pageSet={setProfilePage} page={profilePage} userInfo={userInfo.data}/>
                <ProfileMain page={profilePage} userInfo={userInfo}/>
            </div> }
        </main>}
        {!token&&<main>
            Please Login</main>}
        
        </>
    )
}
export default Profile