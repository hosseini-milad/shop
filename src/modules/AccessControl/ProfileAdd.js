import React, { useEffect, useState} from 'react';
import errortrans from '../../translate/error';
import env from '../../env';
import formtrans from '../../translate/forms';
import menutrans from '../../translate/menuAccordion';
import ModulePart from './ModulePart';
import AccessHeader from './AccessHeader';

function ProfileAdd(props){
  const url = window.location.pathname.split('/')[3]
  const direction = props.lang?props.lang.dir:errortrans.defaultDir;
  const lang = props.lang?props.lang.lang:errortrans.defaultLang;
  const [error,setError] = useState({errorText:'',errorColor:"brown"})
  const [content,setContent] = useState('')
  const [profileChange,setProfileChange] = useState('')
  const modulesList = menutrans.menu
  const [accessChange,setAccessChange] = useState([])

  useEffect(()=>{
    if(url==="new")return
    var postOptions={
      method:'post',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({profileId:url})
    }
   
fetch(env.siteApi + "/panel/user/fetch-profile",postOptions)
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
        setError({errorText:"سرویس پیدا شد",
          errorColor:"green"})
          setContent(result.data)
          setAccessChange(result.data?result.data.access:'')
        setTimeout(()=>setError({errorText:'',errorColor:"brown"}),2000)
      }
      
  },
  (error) => {
    console.log(error);
  }
)
  },[])
  const saveProfile=()=>{
    //if(newCustomer) {
      var postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({profileId:url,
            ...profileChange,
            access:accessChange})
        }
        console.log(postOptions)
     fetch(env.siteApi + "/panel/user/update-profile",postOptions)
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
            setError({errorText:result.success,
              errorColor:"green"})
            setTimeout(()=>window.location.href="/access",2000)
          }
          
      },
      (error) => {
        console.log(error);
      }
    )
  }
return(
  <div className="new-item" style={{direction:direction}}>
      <div className="create-product">
      {content||url==="new"?<div className="pages-wrapper">
      <div className="profile-setting">
      <AccessHeader direction={direction} lang={lang} content={content}
      setProfileChange={setProfileChange} profileChange={profileChange}/>
      <div className="container">
        {modulesList.map((module,i)=>(
            <ModulePart module={module} key={i} lang={lang} content={content}
            setProfileChange={setProfileChange} profileChange={profileChange}
            accessChange={accessChange} setAccessChange={setAccessChange}/>
        ))}
        

      </div>
    </div>
        <div className="create-btn-wrapper">
          <div className="save-btn" onClick={saveProfile}>{formtrans.saveChanges[lang]}</div>
          <div className="cancel-btn" onClick={()=>window.location.href="/access"}>{formtrans.cancel[lang]}</div>
        </div>
        
      </div>:<div>{env.loader}</div>}
    </div>
  </div>
    )
}
export default ProfileAdd