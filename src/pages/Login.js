import { useEffect, useState } from "react"
import env from "../env";
import Cookies from 'universal-cookie';
import errortrans from "../translate/error";
import StyleInput from "../components/Button/Input";

function Login(props){
    const [user,setUser]= useState('');
    const [userLogin,setUserLogin]= useState('');
    const [pass,setPass]= useState('');
    const [error,setError] = useState({errorText:'',errorColor:"brown"})
    const lang = props.lang?props.lang.lang:errortrans.defaultLang;
    const direction = props.lang?props.lang.dir:errortrans.defaultDir;
    const [access,setAccess] = useState(0)
    //console.log(user)
    const checkLogin=()=>{
      const postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'},
          body:JSON.stringify({username:user,password:pass})
        }
      fetch(env.siteApi + "/auth/login",postOptions, {mode:'cors'})
    .then(res => res.json())
    .then(
      (result) => {
          console.log(result)
          if(result.error){
              setError({errorText:result.error,
                errorColor:"brown"})
              setTimeout(()=>setError({errorText:'',
                errorColor:"brown"}),3000)
          }
          else{
            setUserLogin(result)
            setAccess(1)
          }
          
      },
      (error) => {
          console.log(error)
      })
  }
  useEffect(()=>{
    if(!access)return
    var postOptions={
      method:'get',
      headers: {'Content-Type': 'application/json',
      "x-access-token":userLogin&&userLogin.token,
      "userId":userLogin&&userLogin._id}
    }
    console.log(postOptions)
fetch(env.siteApi + "/panel/user/allow-menu",postOptions)
.then(res => res.json())
.then(
  (result) => {
    if(!result.error)
    {
      console.log(user)
      var user = userLogin?userLogin:result
              const cookies = new Cookies();
              const cookieData = {
                  userId:user._id,
                  access:user.access,
                  profile:result.access,
                  profileClass:user.profile,
                  name:user.cName+" "+user.sName,
                  date:user.date,
                  token:user.token,
                  username:(user.cName+" "+result.sName)
              }
              //console.log(cookieData)
              cookies.set(env.cookieName,cookieData, { path: '/' });
              window.location.href=("/")
      //setAllowMenu(result.data)
    }
    else console.log(result)
  },
    (error) => {
      console.log(error);
    }
)  
    
    
  },[access])
    return(
        <main className="main-content  mt-0" style={{direction:direction}}>
          <div className="page-header align-items-start min-vh-100" style={{backgroundImage: "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')"}}>
            <span className="mask bg-gradient-dark opacity-6"></span>
            <div className="container my-auto">
              <div className="row">
                <div className="col-lg-4 col-md-8 col-12 mx-auto">
                  <div className="card z-index-0 fadeIn3 fadeInBottom">
                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                      <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                        <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">{errortrans.signIn[lang]}</h4>
                      </div>
                    </div>
                    <div className="card-body">
                      <form role="form" className="text-start">
                        <div className="input-group input-group-outline my-3">
                          <StyleInput title={errortrans.username[lang]} 
                            direction={direction} action={setUser}/>
                        </div>
                        <div className="input-group input-group-outline mb-3">
                          <StyleInput title={errortrans.password[lang]} 
                            direction={direction} action={setPass} password="1"/>
                        </div>
                        <div className="form-check form-switch d-flex align-items-center mb-3">
                          <input className="form-check-input" type="checkbox" id="rememberMe"/>
                          <label className="form-check-label mb-0 ms-3" htmlFor="rememberMe">{errortrans.rememberMe[lang]}</label>
                        </div>
                        <small style={{color:error.errorColor}}>{error.errorText}</small>
                        <div className="text-center">
                          <button type="button" className="btn bg-gradient-primary w-100 my-4 mb-2"
                          onClick={checkLogin}>{errortrans.signIn[lang]}</button>
                        </div>
                        <p className="text-sm text-center">
                        {errortrans.forgetPassword[lang]}
                          <a href="#" className="text-primary text-gradient font-weight-bold"> {errortrans.remember[lang]} </a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </main>
    )
}
export default Login