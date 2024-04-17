import React, { useRef ,useEffect, useState} from 'react';
import env from "../../../env"
import Status from "../../Components/Status"
import errortrans from "../../../translate/error"
import tabletrans from "../../../translate/tables"
import formtrans from "../../../translate/forms"
import PolicyDetails from './PolicyDetails';
import PolicyUsers from './PolicyUsers';

function PolicyDetailHolder(props){
  const url = window.location.pathname.split('/')[3]
  const direction = props.lang?props.lang.dir:errortrans.defaultDir;
  const lang = props.lang?props.lang.lang:errortrans.defaultLang;
  const [error,setError] = useState({errorText:'',errorColor:"brown"})
  
  const [classOptions,setClassOptions] = useState([])
  const [filters,setFilters] = useState([])
  const [categoryOptions,setCategoryOptions] = useState([])
  
  const [content,setContent] = useState('')
  const [policyChange,setPolicyChange] = useState('')
  
  
  useEffect(()=>{
    //if(url==="new")return
    var postOptions={
      method:'post',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({policyId:url})
    }
   
fetch(env.siteApi + "/panel/user/fetch-policy",postOptions)
.then(res => res.json())
.then(
  (result) => {
    //console.log(result)
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
          setClassOptions(result.classes)
          setCategoryOptions(result.category)
        setTimeout(()=>setError({errorText:'',errorColor:"brown"}),2000)
      }
      
  },
  (error) => {
    console.log(error);
  }
)
  },[])
  const savePolicy=()=>{
    //if(newCustomer) {
      var postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({policyId:url,
            ...policyChange,filters:filters})
        }
      console.log(postOptions)
     fetch(env.siteApi + "/panel/user/update-policy",postOptions)
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
            setTimeout(()=>window.location.href="/policy",2000)
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
      <h4>{tabletrans.addPolicy[lang]}</h4>
      {content||url==="new"?<div className="pages-wrapper">
        <div className="item-box">
          <PolicyUsers direction={direction} lang={lang} content={content}
            setPolicyChange={setPolicyChange} policyChange={policyChange}
            classOptions={classOptions}/> 
          <PolicyDetails direction={direction} lang={lang} content={content}
            setPolicyChange={setPolicyChange} policyChange={policyChange}
            filters={filters} setFilters={setFilters}
            categoryOptions={categoryOptions}/>
          </div>
        <div className="create-btn-wrapper">
          <div className="save-btn" onClick={savePolicy}>{formtrans.saveChanges[lang]}</div>
          <div className="cancel-btn" onClick={()=>window.location.href="/policy"}>{formtrans.cancel[lang]}</div>
        </div>
        
      </div>:<div>{env.loader}</div>}
    </div>
  </div>
  )
}
export default PolicyDetailHolder