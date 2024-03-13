import { useEffect, useState } from "react"
import errortrans from "../../translate/error"
import ModuleSubPart from "./ModuleSubPart"
import StyleInput from "../../components/Button/Input"
import StyleSelect from "../../components/Button/AutoComplete"
import formtrans from "../../translate/forms"
import env from "../../env"

function FilterPart(props){
    const [listCategory,setListCategory]=useState()
    const [optionSelect,setOptionSelect] = useState()
    const [optionShow,setOptionShow] = useState(1)
    
    const updateOptions=(key)=>{
      if(key!=='Enter') return
      const index = props.options&&props.options.length
      props.setOptions(existingItems => {
        return [
          ...existingItems.slice(0, index),
          optionSelect,
          ...existingItems.slice(index + 1),
        ]
      })
      setOptionSelect('')
      setOptionShow(0)
      setTimeout(()=>setOptionShow(1),100)
    }
    const data = props.data
    const removeItem=(index)=>{
      var tempArray = props.options
      tempArray.splice(index, 1);
      props.setOptions(tempArray)
      setOptionShow(0)
      setTimeout(()=>setOptionShow(1),100)
    }
    useEffect(()=>{
      var postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({})
      }
     
  fetch(env.siteApi + "/panel/product/list-category",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      if(result.error){
      }
        else{
            setListCategory(result.filter)
        }
        
    },
    (error) => {
      console.log(error);
    }
  )
    },[])
    return(
        <div className="ps-section">
          <div className="info-box">
            <div className="info-wrapper">
              <StyleSelect title={formtrans.category[props.lang]} direction={props.direction} 
                options={listCategory||[]}
                label={"title"||null}
                defaultValue={data?data.category:''} class={"formInput"}
                action={(e)=>props.setFilterChange(prevState => ({
                  ...prevState,
                  category:e
                }))}/>

              {/*<StyleSelect title={formtrans.type[props.lang]} direction={props.direction} 
                options={["Input","Select"]}
                defaultValue={data?data.type:''} class={"formInput"}
                action={(e)=>props.setFilterChange(prevState => ({
                  ...prevState,
                  type:e
                }))}/>*/}
              <div className="optionsSelect">
                {optionShow?<StyleInput title={formtrans.options[props.lang]} direction={props.direction} 
                  value={optionSelect} class={"formInput"}
                  action={(e)=>setOptionSelect(e)}
                  doAction={(e)=>updateOptions(e.key)}/>:<></>}
                  <ul> 
                    {props.options&&props.options.map((option,i)=>(
                      <li key={i} className="optionItem"><span>{option}</span>
                        <i className="fa fa-remove" onClick={()=>removeItem(i)}></i>
                      </li>
                    ))}
                  </ul>
              </div>
              <StyleInput title={formtrans.optionsN[props.lang]} direction={props.direction} 
                defaultValue={data?data.optionsN:''} class={"formInput"}
                action={(e)=>props.setFilterChange(prevState => ({
                  ...prevState,
                  optionsN:e
                }))}/>
              
          </div>
        </div>
      </div>
    )
}
export default FilterPart