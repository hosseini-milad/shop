import React, { useRef ,useEffect, useState} from 'react';
import env from "../../../env"
import Status from "../../Components/Status"
import errortrans from "../../../translate/error"
import tabletrans from "../../../translate/tables"
import formtrans from "../../../translate/forms"
import ClassDetails from './ClassDetails';
import ClassUser from './ClassUsers';
import ClassPolicy from './ClassPolicy';

function ClassDetailHolder(props){
  const url = window.location.pathname.split('/')[3]
  const direction = props.lang?props.lang.dir:errortrans.defaultDir;
  const lang = props.lang?props.lang.lang:errortrans.defaultLang;
  const [error,setError] = useState({errorText:'',errorColor:"brown"})

  const [userFilter,setUserFilter] = useState('')
  const [content,setContent] = useState('')
  const [customers,setCustomers] = useState('')
  const [users,setUsers] = useState('')
  const [policy,setPolicy] = useState('')
  const [classChange,setClassChange] = useState('')
  
  useEffect(()=>{
    if(url==="new")return
    var postOptions={
      method:'post',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({classId:url})
    }
   
fetch(env.siteApi + "/panel/user/fetch-class",postOptions)
.then(res => res.json())
.then(
  (result) => {
    if(result.error){
      setError({errorText:result.error,
        errorColor:"brown"})
      setTimeout(()=>setError({errorText:'',
        errorColor:"brown"}),3000)
    }
      else{
        setError({errorText:"سرویس پیدا شد",
          errorColor:"green"})
          setContent(result.filter)
          setUsers(result.userClass)
          setCustomers(result.customerClass)
          setPolicy(result.policyClass)
        setTimeout(()=>setError({errorText:'',errorColor:"brown"}),2000)
      }
      
  },
  (error) => {
    console.log(error);
  }
)
  },[])
  
  const saveClass=()=>{
    //if(newCustomer) {
      var postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({classId:url,
            ...classChange})
        }
     fetch(env.siteApi + "/panel/user/update-class",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        if(result.error){
          setError({errorText:result.error,
            errorColor:"brown"})
          setTimeout(()=>setError({errorText:'',
            errorColor:"brown"}),3000)
        }
          else{
            setError({errorText:result.success,
              errorColor:"green"})
            setTimeout(()=>window.location.href="/class",2000)
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
      <h4>{tabletrans.addClass[lang]}</h4>
      {content||url==="new"?<div className="pages-wrapper">
        <div className="item-box">
          <ClassDetails direction={direction} lang={lang} content={content}
            setClassChange={setClassChange} classChange={classChange}/>
          
          <ClassPolicy direction={direction} lang={lang} content={policy}
            setClassChange={setClassChange} classChange={classChange}/> 
        </div>
        <div className="item-box">
        <ClassUser direction={direction} lang={lang} content={content} 
            setClassChange={setClassChange} classChange={classChange}
            setUserFilter={setUserFilter} userFilter={userFilter}
            users={users} customers={customers}/> 
        </div>
        <div className="create-btn-wrapper">
          <div className="save-btn" onClick={saveClass}>{formtrans.saveChanges[lang]}</div>
          <div className="cancel-btn" onClick={()=>window.location.href="/class"}>{formtrans.cancel[lang]}</div>
        </div>
        
      </div>:<div>{env.loader}</div>}
    </div>
  </div>
  )
}
export default ClassDetailHolder