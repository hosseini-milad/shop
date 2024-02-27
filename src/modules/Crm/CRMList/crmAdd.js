import React, { useEffect, useState} from 'react';
import errortrans from '../../../translate/error';
import env from '../../../env';
import formtrans from '../../../translate/forms';
import menutrans from '../../../translate/menuAccordion';
import CRMHeader from './crmHeader';
import CRMBody from './crmAddBody';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function CRMAdd(props){
  const url = window.location.pathname.split('/')[3]
  const direction = props.lang?props.lang.dir:errortrans.defaultDir;
  const lang = props.lang?props.lang.lang:errortrans.defaultLang;
  const [error,setError] = useState({errorText:'',errorColor:"brown"})
  const [content,setContent] = useState('')
  const [crmChange,setCRMChange] = useState('')
  const [steps,setSteps] = useState('')
  const token=cookies.get(env.cookieName)
  const modulesList = menutrans.menu
  const [accessChange,setAccessChange] = useState([])

  useEffect(()=>{
    if(url==="new")return
    var postOptions={
      method:'post',
      headers: {'Content-Type': 'application/json',
      "x-access-token":token&&token.token,"userId":token&&token.userId},
      body:JSON.stringify({crmId:url})
    }
   
fetch(env.siteApi + "/panel/crm/fetch-crm",postOptions)
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
          setSteps(result.data.crmSteps)
          setAccessChange(result.data?result.data.access:'')
        setTimeout(()=>setError({errorText:'',errorColor:"brown"}),2000)
      }
      
  },
  (error) => {
    console.log(error);
  }
)
  },[])
  const saveCRM=()=>{
    //if(newCustomer) {
      var postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json',
          "x-access-token":token&&token.token,"userId":token&&token.userId},
          body:JSON.stringify({crmId:url,
            ...crmChange,
            crmSteps:steps})
        }
        console.log(postOptions)
     fetch(env.siteApi + "/panel/crm/update-crm",postOptions)
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
            setTimeout(()=>window.location.href="/crmlist",2000)
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
      <CRMHeader direction={direction} lang={lang} content={content}
      setCRMChange={setCRMChange} crmChange={crmChange}/>
      <div className="container">
        <CRMBody steps={steps} setSteps={setSteps}/>
      </div>
    </div>
        <div className="create-btn-wrapper">
          <div className="save-btn" onClick={saveCRM}>{formtrans.saveChanges[lang]}</div>
          <div className="cancel-btn" onClick={()=>window.location.href="/crmlist"}>{formtrans.cancel[lang]}</div>
        </div>
        
      </div>:<div>{env.loader}</div>}
    </div>
  </div>
    )
}
export default CRMAdd