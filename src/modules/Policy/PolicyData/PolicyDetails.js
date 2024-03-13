import React, { useRef ,useEffect, useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import StyleInput from "../../../components/Button/Input"
import formtrans from "../../../translate/forms"
import tabletrans from "../../../translate/tables"
import StyleSelect from '../../../components/Button/AutoComplete';
import PolicyFilters from './PolicyFilters';
import env from '../../../env';

function PolicyDetails(props){
    const content=props.content
    const [catSelect,setCatSelect]=useState()
    const [factSelect,setFactSelect]=useState(0)
    const [filterOptions,setFiltersOptions]=useState([])
    const [brandOptions,setBrandOptions] = useState([])
    const [factoryOptions,setFactoryOptions] = useState([])
    const [error,setError] = useState({errorText:'',errorColor:"brown"})
    console.log(brandOptions)
    useEffect(()=>{
      if(!catSelect&&!content.category)return
      
      var postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({category:catSelect?catSelect:content.category,
        factory:props.policyChange?props.policyChange.factory:''})
      }
      fetch(env.siteApi + "/panel/user/option-policy",postOptions)
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
                setBrandOptions(result.brands)
                setFactoryOptions(result.factory)
                setFiltersOptions(result.filters)
              setTimeout(()=>setError({errorText:'',errorColor:"brown"}),2000)
            }
            
        },
        (error) => {
          console.log(error);
        }
      )
      props.setPolicyChange(prevState => ({
        ...prevState,
        category:catSelect
      }))
    },[catSelect,factSelect])
    const updateCategory=(e)=>{
      setCatSelect(e)
      props.setPolicyChange(prevState => ({
        ...prevState,
        category:e
      }))
    }
    const updateFactory=(e)=>{
      setFactSelect(factSelect+1)
      props.setPolicyChange(prevState => ({
        ...prevState,
        factory:e
      }))

    }
    return(
        <div className="serviceItem">
            <StyleSelect title={formtrans.category[props.lang]} direction={props.direction} 
              defaultValue={content?content.category:''} class={"formInput"}
              options={props.categoryOptions||[]}
              label={"title"||null}
              action={(e)=>updateCategory(e)}/>
            {factoryOptions&&factoryOptions.length?
            <StyleSelect title={formtrans.factory[props.lang]} direction={props.direction} 
              options={factoryOptions||[]}
              label={"title"||''}
              defaultValue={(content&&content.factory)} 
              class={"formInput"}
              action={(e)=>updateFactory(e)}/>:<></>}
            {brandOptions&&brandOptions.length?
            <StyleSelect title={formtrans.brandName[props.lang]} direction={props.direction} 
              options={brandOptions||[]}
              label={"title"||''}
              defaultValue={(content&&content.brand)} class={"formInput"}
              action={(e)=>updateFactory(e)}/>:<></>}
            <PolicyFilters content={content} filters={props.filters} direction={props.direction}
            setFilters={props.setFilters} filterOptions={filterOptions}
            lang={props.lang} setPolicyChange={props.setPolicyChange}/>
        </div>
    )
}
export default PolicyDetails