import React, { useEffect, useState} from 'react';
import errortrans from '../../translate/error';
import env from '../../env';
import formtrans from '../../translate/forms';
import menutrans from '../../translate/menuAccordion';
import FilterHeader from './FilterHeader';
import FilterPart from './FilterPart';

function FilterAdd(props){
  const url = window.location.pathname.split('/')[3]
  const direction = props.lang?props.lang.dir:errortrans.defaultDir;
  const lang = props.lang?props.lang.lang:errortrans.defaultLang;
  const [error,setError] = useState({errorText:'',errorColor:"brown"})
  const [content,setContent] = useState('')
  const [filterChange,setFilterChange] = useState('')
  const modulesList = menutrans.menu
  const [options ,setOptions] = useState([])

  useEffect(()=>{
    if(url==="new")return
    var postOptions={
      method:'post',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({filterId:url})
    }
   
fetch(env.siteApi + "/panel/product/fetch-filter",postOptions)
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
          setContent(result.filter)
          setOptions(result.filter.optionsP)
        setTimeout(()=>setError({errorText:'',errorColor:"brown"}),2000)
      }
      
  },
  (error) => {
    console.log(error);
  }
)
  },[])
  const saveFilter=()=>{
    //if(newCustomer) {
      var postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({filterId:url,
            ...filterChange,...{optionsP:options}})
        }
        console.log(postOptions)
     fetch(env.siteApi + "/panel/product/edit-filter",postOptions)
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
            setTimeout(()=>window.location.href="/filter",2000)
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
      <FilterHeader direction={direction} lang={lang} content={content}
      setFilterChange={setFilterChange} filterChange={filterChange}/>
      <div className="container">
        <FilterPart lang={lang} data={content}
        direction={direction} 
        setFilterChange={setFilterChange} filterChange={filterChange}
        options={options} setOptions={setOptions}/>
      </div>
    </div>
        <div className="create-btn-wrapper">
          <div className="save-btn" onClick={saveFilter}>{formtrans.saveChanges[lang]}</div>
          <div className="cancel-btn" onClick={()=>window.location.href="/filter"}>{formtrans.cancel[lang]}</div>
        </div>
        
      </div>:<div>{env.loader}</div>}
    </div>
  </div>
    )
}
export default FilterAdd