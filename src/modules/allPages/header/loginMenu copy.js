import { useState } from "react";
import {ADD_USER_MUTATION, LOGIN_USER_MUTATION} from '../../../components/Query'
import { useMutation} from "@apollo/client";
import env,{siteApi} from "../../../env";
var create_user = 0;

function LoginMenu(){
    const [mobile_phone, setMobile] = useState('');
    const [privateOtp, setPrivOTP] = useState('');
    const [otp, setOTP] = useState('');
    const [mobileEnter , setMobileEnter] = useState('');
    const [token,setToken] = useState(JSON.parse(localStorage.getItem('oil-login')));
    const [sms,SetSms] = useState('');
    const loginInfo = SimpleFetch(siteApi+"/authentication/login")

    const [addUser] = useMutation(ADD_USER_MUTATION(
      mobile_phone, 
      "Reyham@2372", 
      mobile_phone+"@sharifioil.com"
    ), {
        onCompleted: () => {
        },
        onError: (error) => {
            console.log("registerd!")
            
        }
    });
    
    const handleSendCode=()=>{

      setMobileEnter(1);
        var min = 1000;
        var max = 9999;
        var rand =  Math.floor(min + (Math.random() * (max-min)));
        setPrivOTP(rand);

        fetch(env.kaveNegarUrl+env.kaveNegarApi+"/sms/send.json?"+
        `receptor=${mobile_phone}&sender=100026767&message=${rand}`)
      .then(res => res.json())
      .then(
        (result) => {
            SetSms(result)
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      console.log("sms Sent");
      const resultRegister = addUser();
    }
    
    const [loginUser] = useMutation(LOGIN_USER_MUTATION(mobile_phone,
    "Reyham@2372"),{
      
      onCompleted: (data) => {
        setToken(JSON.stringify(data.login));
        localStorage.setItem('oil-login', JSON.stringify(data.login));
      },
      onError: (error) => {
          console.log("Error!",error)
          
      }
    })
    const handleLogin = (props) => {
      if(create_user === 0){
        const resultLogin = loginUser();
      create_user= 1;}
      }
      
      const logOut=()=>{
        localStorage.removeItem('oil-login');
      }
    return(<>
    {!token&&<div className="notLogin">
        {!mobileEnter&&
        <div className="minicartData">
            <div className="item-cart-quantity" style={{display:"grid"}}>
                <strong>ورود/ثبت نام</strong>
                <small>شماره موبایل خود را وارد کنید</small>
            
                <input type="text" onChange={event=>setMobile(event.target.value)}/>
            </div>
            <div className="cartpopup">
                <a onClick={handleSendCode} className="modal-sub-btn">
                دریافت کد</a>
            </div>
        </div>}
        {mobileEnter&&
            <div className="minicartData">
            <div className="item-cart-quantity" style={{display:"grid"}}>
            <strong>ورود/ثبت نام</strong>
            <span>کد تایید را وارد نمایید</span>
            <small>کد تایید برای شماره {mobile_phone} ارسال گردید</small>
            <input type="otp" placeholder="کد یکبار مصرف" 
            onChange={event=>setOTP(event.target.value)}></input>
            </div> 
        </div>  }
        {mobileEnter&&otp === privateOtp.toString()?handleLogin():''}
        </div>}
        {token&&<div className="Loggedin">
          کاربر {mobile_phone} 
          <a href="/profile" className="modal-sub-btn">
                حساب کاربری</a>
          <form>
            <input onClick={logOut} type="submit" value="خروج" className="modal-sub-btn logout"/>
          </form>
          </div>}

</>)
}
export default LoginMenu