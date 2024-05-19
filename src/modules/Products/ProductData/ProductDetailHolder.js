import React, { useRef ,useEffect, useState} from 'react';
import env from "../../../env"
import Status from "../../Components/Status"
import errortrans from "../../../translate/error"
import tabletrans from "../../../translate/tables"
import formtrans from "../../../translate/forms"
import ProductName from './ProductName';
import ProductSKU from './ProductSku';
import ProductPrice from './ProductPrice';

function ProductDetailHolder(props){
  const url = window.location.pathname.split('/')[3]
  const direction = props.lang?props.lang.dir:errortrans.defaultDir;
  const lang = props.lang?props.lang.lang:errortrans.defaultLang;
  const [error,setError] = useState({errorText:'',errorColor:"brown"})

  const [content,setContent] = useState('')
  const [filters,setFilters] = useState({})
  const [purchase,setPurchase] = useState('')
  const [updateContent,setUpdateContent] = useState(0)
  const [productChange,setProductChange] = useState('')
  
  useEffect(()=>{
    if(url==="new")return
    var postOptions={
      method:'post',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({productId:url})
    }
   
fetch(env.siteApi + "/panel/product/fetch-product",postOptions)
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
          setUpdateContent(1)
          setContent(result)
          setFilters(result.filter?result.filter.filters:{})
        setTimeout(()=>setError({errorText:'',errorColor:"brown"}),2000)
      }
      
  },
  (error) => {
    console.log(error);
  }
)
  },[])
  const saveProducts=()=>{
    //if(newCustomer) {
      var postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({productId:url,
            ...productChange,filters:filters})
        }
        console.log(filters)
       console.log(postOptions)
    fetch(env.siteApi + "/panel/product/editProduct",postOptions)
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
              setTimeout(() => {
                window.history.back();
              }, 2000);
            }
          },
      (error) => {
        console.log(error);
      }
    )
  }
  if(!updateContent)
    return(
      <div className='new-item'>
        {env.loader}
      </div>
  )
  else return(
  <div className="new-item" style={{direction:direction}}>
      <div className="create-product">
      <h4>{tabletrans.createProduct[lang]}</h4>
      {content||url==="new"?<div className="pages-wrapper">
        <ProductName direction={direction} lang={lang} content={content} 
          productChange={productChange} setProductChange={setProductChange}
          setUpdateContent={setUpdateContent} setContent={setContent}/>
        {(url==="new"||content)?
        <ProductSKU direction={direction} lang={lang} content={content} 
          productChange={productChange} setProductChange={setProductChange}
          setFilters={setFilters}/>:
          <></>}
        {/*<ProductPrice direction={direction} lang={lang} content={content} 
          productChange={productChange} setProductChange={setProductChange}/>*/}
        <div className="create-btn-wrapper">
          <div className="dense-btn">
            <input className="switch-input" type="checkbox" id="switch-3" />
          </div>
          <div className="save-btn" onClick={saveProducts}>{formtrans.saveChanges[lang]}</div>
          <div className="cancel-btn" onClick={()=>window.history.back()}>{formtrans.cancel[lang]}</div>
        </div>
        
      </div>:<div>{env.loader}</div>}
    </div>
  </div>
  )
}
export default ProductDetailHolder