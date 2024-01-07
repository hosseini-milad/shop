import { useState } from "react"
import Cookies from 'universal-cookie';
import env, { siteApi } from "../../../env";

function UserPassLogin(props){
    const [user,setUser] = useState()
    const [pass,setPass] = useState()
    const [error,setError] = useState('')
    
    const handleSendCode=()=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            'Access-Control-Allow-Origin': '*'},
              body: JSON.stringify({ username: user, password:pass})
          }
          fetch(siteApi+"/auth/login",postOptions, {mode:'cors'})
        .then(res => res.json())
        .then(
          (result) => {
            if(result.error){
                setError(result.error)
                setTimeout(()=>setError(''),3000)
            }
            else{
              var user = result.user?result.user:result
                const accessLevel = user.access
                const cookies = new Cookies();
                cookies.set(env.cookieName, {
                    userId:user._id,
                    access:user.access,
                    level:accessLevel==="manager"?10:accessLevel==="agency"?5:
                    accessLevel==="agent"?4:accessLevel==="customer"?2:1,
                    name:user.cName+" "+user.sName,
                    date:user.date,
                    token:user.token,
                    username:(user.username)
                }, { path: '/' });
                window.location.href=("/")
            }
        },
          (error) => {
            console.log(error);
          }
        )
    }
    return(
        <div className="minicartData">
            <div className="item-cart-quantity" style={{display:"grid"}}>
                <b>ورود</b>
                <small>نام کاربری</small>
            
                <input type="text"  
                  onChange={event=>setUser(event.target.value)}
                onSelect={()=>setError('')}/>
                <input type="text" onKeyDown={(e)=>{(e.key)==='Enter'&&handleSendCode()}} 
                  onChange={event=>setPass(event.target.value)}
                onSelect={()=>setError('')}/>
              <div className="userPass" onClick={()=>props.setUserPass(0)}>
                  ورود با شماره موبایل</div>
            </div>
            <div className="cartpopup">
                <a onClick={handleSendCode} className="modal-sub-btn">
                ورود</a>
            </div>
            <sub style={{color:"brown"}}>{error}</sub>
        </div>
    )
}
export default UserPassLogin