import { useState } from "react";
import env,{logoff, siteApi,validPhone} from "../../../env";
import UserPassLogin from "./UserPassLogin";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function LoginMenu(props){
  const token=cookies.get(env.cookieName)
  //console.log(localLogin)
    const [mobile_phone, setMobile] = useState();
    const [counter, setCounter] = useState(100);
    const [otp, setOTP] = useState('');
    //const [mobileEnter , setMobileEnter] = useState('');
    
    const [userPass,setUserPass] = useState(0);
    const [login,setLogin] = useState();
    const [error,setError] = useState('')
    var sendCode = 0;
    const handleSendCode=()=>{
      if(sendCode ===1){setError("کد ارسال شده است");return;}
      sendCode = 1;
      const postOptions={
        method:'post',
        headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: mobile_phone})
      }
      console.log(postOptions)
      fetch(siteApi+"/auth/sendOtp",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
        if(result.error){
          setError(result.error)
        }
        else{
        setError(result.message);
        //setToken(result.data.token);
        setCounter(100)
        var tempCounter = 100;
        setLogin(1)
        //while(tempCounter>0){
          setTimeout(function(e) {
            var interval = setInterval(function(){
              setCounter(tempCounter);
              tempCounter--;
              
              if(tempCounter < 0){
                clearInterval(interval);
              }
              
            }, 1000)
          })
            
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }
  //console.log(props)
  const handleLogin=()=>{
    const postOptions={
      method:'post',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otp,
          phone:mobile_phone})
    }
    fetch(siteApi+"/auth/verifyOtp",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      console.log(result)
      if(!result.error){
      setLogin(1)
      setError('با موفقیت وارد سایت شدید');
      var user = result.user?result.user:result
      const accessLevel = user.access
      cookies.set(env.cookieName, {
          userId:user._id,
          access:user.access,
          level:accessLevel==="manager"?10:accessLevel==="agency"?5:
          accessLevel==="agent"?4:accessLevel==="customer"?2:1,
          name:user.cName+" "+user.sName,
          name:user.phone,
          date:user.date,
          token:user.token,
          username:(user.cName+" "+result.sName)
      }, { path: '/' });
      window.location.href=("/")
    }
    else{
      setError(result.error.message)
    }},
    (error) => {
      console.log(error);
    }
  );
  }
    const logOut=()=>{
      
    }
    
    return(<>
    {!token&&<div className="notLogin">
        {!login?<div className="minicartData">
            <div className="item-cart-quantity" style={{display:"grid"}}>
                <b>ورود/ثبت نام</b>
                <small>شماره موبایل</small>
            
                <input type="phone" onKeyDown={(e)=>{(e.key)==='Enter'&&handleSendCode()}} 
                  onChange={event=>setMobile(event.target.value)}
                onSelect={()=>setError('')}/>
              <div className="userPass" onClick={()=>setUserPass(1)}>
                  ورود با نام کاربری</div>
            </div>
            <div className="cartpopup">
                <a onClick={handleSendCode} className="modal-sub-btn">
                دریافت کد</a>
            </div>
            <sub style={{color:"brown"}}>{error}</sub>
        </div>
        :
        
            <div className="minicartData">
            <div className="item-cart-quantity" style={{display:"grid"}}>
            <b>ورود/ثبت نام</b>
            <span>کد تایید را وارد نمایید</span>
            <small>
            <i className="phoneHover" > {mobile_phone} </i> 
              </small>
            <input type="otp" placeholder="کد یکبار مصرف"
             onKeyDown={(e)=>{(e.key)==='Enter'&&handleLogin()}}   
            onSelect={()=>setError('')}
            onChange={event=>setOTP(event.target.value)}></input>
            <small className="loginCounter">{counter?counter:''} {counter?<button disabled>ارسال مجدد</button>:
            <button onClick={handleSendCode}>ارسال مجدد</button>}</small>
            <div className="cartpopup">
                <a onClick={handleLogin} className="modal-sub-btn">
                تایید</a>
            </div>
            <sub style={{color:"brown"}}>{error}</sub>
            </div> 
        </div>  
        
    }
        {otp === 1?handleLogin():''}
        </div>}
        {token&&<div className="Loggedin">
          کاربر {props.userInfo&&props.userInfo.data&&props.userInfo.data.first_name
                &&props.userInfo.data.first_name?
            props.userInfo.data.first_name+" "+props.userInfo.data.last_name:
            mobile_phone} 
          <a href="/profile" className="modal-sub-btn">
                حساب کاربری</a>
          <form>
            <input onClick={logoff} type="submit" value="خروج" className="modal-sub-btn logout"/>
          </form>
          </div>}

</>)
}
export default LoginMenu