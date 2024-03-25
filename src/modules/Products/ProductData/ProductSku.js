import StyleSelect from "../../../components/Button/AutoComplete"
import StyleInput from "../../../components/Button/Input"
import { parseDesc } from "../../../env"
import tabletrans from "../../../translate/tables"

function ProductSKU(props){
    const content = props.content
    const def = content?content.filter:''
    const brand=content&&content.brandList
    const category = content&&content.categoryList
    const filterList = content&&content.filterList
    const autoFetch=(e)=>{
      var result = parseDesc(def.description)
      console.log(result)
      props.setFilters(result)
    }
    return(
        <div className="pd-row">
          <div className="row-title">
            <h4>{tabletrans.propertie[props.lang]}</h4>
            <p>{tabletrans.attributes[props.lang]}</p>
          </div>
          <div className="row-box">
            <div className="probs-wrapper">
              <div className="input-wrapper">
                {/*<StyleInput title={tabletrans.productCode[props.lang]} direction={props.direction}
                 class={"formInput"} defaultValue={def?def.productCode:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    productCode:e
                  }))}/>*/}
                <StyleInput title={tabletrans.productSku[props.lang]} direction={props.direction}
                 class={"formInput"} defaultValue={def?def.sku:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    sku:e
                  }))}/>
                  <div className="edit-btn autoFilter" onClick={autoFetch}>
                      Auto Filter</div>
                {/*<StyleInput title={tabletrans.quantity[props.lang]} direction={props.direction}
                 class={"formInput"} defaultValue={content?content.quantity:''} 
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    quantity:e
                  }))}/>*/}
                <StyleSelect title={tabletrans.brand[props.lang]} direction={props.direction}
                 class={"formInput halfWidth"} defaultValue={content?content.brandData:''} 
                 options={brand?brand:[]} label={"title"}
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    brandId:e?e.brandCode:''
                  }))}/>
                  <StyleSelect title={tabletrans.category[props.lang]} direction={props.direction}
                 class={"formInput halfWidth"} defaultValue={content?content.catData:''} 
                 options={category?category:[]} label="title"
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    catId:e?e.catCode:''
                  }))}/>
                {filterList&&filterList.map((filter,i)=>(
                  <StyleSelect title={filter.title} direction={"rtl"}
                  class={"formInput halfWidth"} key={i}
                  defaultValue={(def&&def.filters)?def.filters[filter.enTitle]:''} 
                  options={filter?filter.optionsP:[]} label="title"
                  action={(e)=>props.setFilters(data=>({
                    ...data,
                    [filter.enTitle]:e})
                  )}/>
                ))}
              </div>
              {/*<div className="gender-wrapper">
                <h5>Gender</h5>
                <div className="gender-checkboxes">
                  <input type="checkbox" name="" id="men"/>
                  <label htmlFor="men">Men</label>
                  <input type="checkbox" name="" id="women"/>
                  <label htmlFor="women">Women</label>
                  <input type="checkbox" name="" id="kid"/>
                  <label htmlFor="kid">Kids</label>
                </div>
              </div>
              <div className="label-wrapper">
                <div className="sale-label">
                  <div className="dense-btn">
                    <input className="switch-input" type="checkbox" id="switch-1" />
                    <label className="switch-label" htmlFor="switch-1">Toggle</label>
                  </div>
                  <div className="sale-input info-input">
                    <label htmlFor="sale">Sale Label</label>
                    <input type="text" name="" id="sale"  disabled  />
                  </div>
                </div>
                <div className="new-label">
                  <div className="dense-btn">
                    <input className="switch-input" type="checkbox" id="switch-2"/>
                    <label className="switch-label" htmlFor="switch-2">Toggle</label>
                  </div>
                  <div className="sale-input info-input">
                    <label htmlFor="new">New Label</label>
                    <input type="text" name="" id="new"  disabled  />
                  </div>
                </div>
              </div>*/}

            </div>
          </div>
        </div>
    )
}
export default ProductSKU