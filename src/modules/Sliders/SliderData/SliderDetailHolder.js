import React, { useRef ,useEffect, useState} from 'react';
import env from "../../../env"
import errortrans from "../../../translate/error"
import tabletrans from "../../../translate/tables"
import formtrans from "../../../translate/forms"
import SliderDetails from './SliderDetails';
import SliderImage from './SliderImage';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function SliderDetailHolder(props){
  const url = window.location.pathname.split('/')[3]
  const direction = props.lang?props.lang.dir:errortrans.defaultDir;
  const lang = props.lang?props.lang.lang:errortrans.defaultLang;
  const [error,setError] = useState({errorText:'',errorColor:"brown"})
  const token=cookies.get(env.cookieName)
  const [content,setContent] = useState('')
  const [sliderChange,setSliderChange] = useState('')
  
  useEffect(()=>{
    if(url==="new")return
    var postOptions={
      method:'post',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({sliderId:url})
    }
   
fetch(env.siteApi + "/setting/fetch-slider",postOptions)
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
        setTimeout(()=>setError({errorText:'',errorColor:"brown"}),2000)
      }
      
  },
  (error) => {
    console.log(error);
  }
)
  },[])
  const saveSlider=()=>{
    //if(newCustomer) {
      var postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json',
          "x-access-token":token&&token.token,"userId":token&&token.userId},
          body:JSON.stringify({sliderId:url,
            ...sliderChange})
        }
    fetch(env.siteApi + "/setting/updateSlider",postOptions)
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
            setTimeout(()=>window.location.href="/sliders",2000)
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
      <h4>{tabletrans.addBrand[lang]}</h4>
      {content||url==="new"?<div className="pages-wrapper">
        <div className="item-box">
          <SliderDetails direction={direction} lang={lang} content={content}
            setSliderChange={setSliderChange} sliderChange={sliderChange}/>
            <div className='imageHolder'>
              <SliderImage lang={lang} content={content} value="imageUrl"
                sliderChange={sliderChange} part={1}
                setSliderChange={setSliderChange} />
            </div>
          </div>
        <div className="create-btn-wrapper">
          <div className="save-btn" onClick={saveSlider}>{formtrans.saveChanges[lang]}</div>
          <div className="cancel-btn" onClick={()=>window.location.href="/sliders"}>{formtrans.cancel[lang]}</div>
        </div>
        
      </div>:<div>{env.loader}</div>}
    </div>
  </div>
  )
}
export default SliderDetailHolder