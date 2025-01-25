import StyleSelect from "../../components/Button/AutoComplete"
import StyleInput from "../../components/Button/Input"
import { parseDesc } from "../../env"
import tabletrans from "../../translate/tables"

function ProductSKU(props){
    const content = props.content
    const def = content?content.filter:''
    
    
      const StatusList=[
    
    {
      "Title": "فعال",
      "Active": true
    },
    {
      "Title": "غیر فعال",
      "Active": false
    },
  ]
  console.log(def.active)
    return(
        <div className="pd-row">
          <div className="row-title">
            <h4>{tabletrans.propertie[props.lang]}</h4>
            <p>{tabletrans.attributes[props.lang]}</p>
          </div>
          <div className="row-box">
            <div className="probs-wrapper">
              <div className="input-wrapper">
                
                <StyleInput title={tabletrans.productSku[props.lang]} direction={props.direction}
                 class={"formInput"} defaultValue={def?def.sku:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    sku:e
                  }))}/>
                
                  
               
                <StyleSelect title={tabletrans.status[props.lang]} direction={props.direction}
                 class={"formInput halfWidth"} defaultValue={!def.active?"غیرفعال":"فعال"} 
                 options={StatusList} label={"Title"}
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    active:e?e.Active:''
                  }))}/>
                
                  
                
                
              </div>
            </div>
          </div>
        </div>
    )
}
export default ProductSKU