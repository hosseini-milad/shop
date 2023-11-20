import { useEffect } from "react"
import { useState } from "react"
import env from "../../../env"
import Status from "../../Components/Status"
import errortrans from "../../../translate/error"
import ServicePrice from "./ServicePrice"
import ServiceOptions from "./ServiceOptions"
import ServiceImages from "../ServiceComponent/ServiceImages"
import ServiceType from "../ServiceComponent/ServiceType"
import tabletrans from "../../../translate/tables"
import formtrans from "../../../translate/forms"

function ServiceDetailHolder(props){
  const url = window.location.pathname.split('/')[3]
  const direction = props.lang?props.lang.dir:errortrans.defaultDir;
  const lang = props.lang?props.lang.lang:errortrans.defaultLang;
  const [error,setError] = useState({errorText:'',errorColor:"brown"})

  const [content,setContent] = useState('')
  const [brand,setBrand] = useState('')
  const [price,setPrice] = useState('')
  const [fCode,setFCode] = useState('')
  const [brandList,setBrandList] = useState('')
  const [purchase,setPurchase] = useState('')
  const [serviceChange,setServiceChange] = useState('')
  useEffect(()=>{
    if(url==="new")return
    var postOptions={
      method:'post',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({serviceId:url})
    }
   
fetch(env.siteApi + "/panel/product/fetch-service",postOptions)
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
          setPrice(result.filter.servicePrice)
          setFCode(result.filter.factoryCode)
          setBrandList(result.brandsData)
          setPurchase(result.filter.servicePurchase)
        setTimeout(()=>setError({errorText:'',errorColor:"brown"}),2000)
      }
      
  },
  (error) => {
    console.log(error);
  }
)
  },[])
  const saveService=()=>{
    //if(newCustomer) {
      var newPrice = price
      try{newPrice = JSON.parse(price)}catch{}
      
      var newPurchase = purchase
      try{newPurchase = JSON.parse(purchase)}catch{}
      var newFCode = fCode
      try{newFCode = JSON.parse(fCode)}catch{}
      var postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({serviceId:url,
            ...serviceChange,servicePrice:newPrice,
          servicePurchase:newPurchase,
          factoryCode:newFCode})
        }
       console.log(postOptions)
    fetch(env.siteApi + "/panel/product/editService",postOptions)
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
            setTimeout(()=>window.location.href="/services",2000)
          }
          
      },
      (error) => {
        console.log(error);
      }
    )
  }
return(
  <div className="new-item" style={{direction:direction}}>
      
      <div className="od-header-info">
          <i className={`fa-solid fa-angle-${direction==="rtl"?"right":"left"}` }
          onClick={()=>window.location.href="/services"}></i>
          <h4>{formtrans.newService[lang]}</h4>
        </div>
      {(content||url==='new')?<>
      <div className="item-box" style={{alignItems: "flex-end"}}>
        <ServiceType direction={direction} lang={lang} content={content}
          setServiceChange={setServiceChange} serviceChange={serviceChange}
          setBrand={setBrand} brand={brand} brandList={brandList}/>
        <ServiceImages />
      </div>
      {/*<ServiceOptions />*/}
      {brand?<ServicePrice brand={brand} direction={direction} lang={lang} 
        price={price} setPrice={setPrice} 
        purchase={purchase} setPurchase={setPurchase} 
        fCode={fCode} setFCode={setFCode}/>:<></>}
      </>:env.loader}
      <div className="save-wrapper">
        <div className="save-btn" onClick={saveService}>{formtrans.saveChanges[lang]}</div>
        <div className="cancel-btn" onClick={()=>window.location.href="/services"}>{formtrans.cancel[lang]}</div>
      </div>
    </div>
    )
}
export default ServiceDetailHolder