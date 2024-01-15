import BreadCrumb from "../modules/allPages/BreadCrumb";
import ProfileMain from "../modules/profilePage/profileMain";
import ProfileSideBar from "../modules/profilePage/profileSideBar";
import '../css/profile.css'
import { useEffect, useState } from "react";
import env, { siteApi, siteApiUrl } from "../env";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Profile(){ 
    const token=cookies.get(env.cookieName)
    const[profile,setProfile] = useState()
    const[profileTab,setProfileTab] = useState(0)
    useEffect(()=>{
        if(!token) return('')
        const getOptions={
            method:'get',
            headers: {'Content-Type': 'application/json',
            "x-access-token":token.token,"userId":token.userId}
        }
        fetch(siteApi+"/auth/find-users",getOptions)
        .then(res => res.json())
        .then(
            (result) => {
            console.log(result)
            setProfile(result)
            },
            (error,res) => {
            console.log(error,res);
            }
        )
          
    },[]) 
    console.log(profile)
    return(<>
        {profile?<main>
            <BreadCrumb pName={"حساب کاربری"}/>
            {profile&&<div className="profileContainer">
                <ProfileSideBar pageSet={setProfileTab} page={profileTab} 
                    userInfo={profile}/>
                <ProfileMain page={profileTab} userInfo={profile}
                 token={token}/>
            </div> }
        </main>:<></>}
        </>
    )
}
export default Profile