import { useState } from "react"
import StyleSelect from "../../../components/Button/AutoComplete"
import StyleInput from "../../../components/Button/Input"
import StyleRadio from "../../../components/Button/Radio"
import formtrans from "../../../translate/forms"
import { serviceKind } from "../../../translate/status"
import ServiceBrandHolder from "./ServiceBrandHolder"

function ServiceType(props){
  const content = props.content
  const type=content.category
  const [tab,setTab]= useState(content&&type==="Color"?0:type=="Mirror"?1:
    type==="Coating"?2:type==="Extra"?3:4)
    return(
        <div className="item-col">
          <div className="type-input">
            <StyleRadio options={serviceKind} title="Type"
            label={props.lang} tab={tab} setTab={setTab}
            defaultValue={content?content.category:''}
            action={(e)=>props.setServiceChange(prevState => ({
              ...prevState,
              category:e.english
          }))} />
          </div>
          <div className="serviceItem">
            <StyleInput title={formtrans.title[props.lang]} direction={props.direction} 
                defaultValue={content?content.title:''} class={"formInput"}
                action={(e)=>props.setServiceChange(prevState => ({
                  ...prevState,
                  title:e
                }))}/>
                <StyleInput title={formtrans.sku[props.lang]} direction={props.direction} 
                defaultValue={content?content.serviceCode:''} class={"formInput"}
                action={(e)=>props.setServiceChange(prevState => ({
                  ...prevState,
                  serviceCode:e
                }))}/>
                {(tab===0)?
                <StyleInput title={"RGB"} direction={props.direction} 
                defaultValue={content?content.hexCode:''} class={"formInput"}
                action={(e)=>props.setServiceChange(prevState => ({
                  ...prevState,
                  hexCode:e
                }))}/>:<></>}
                {(tab===2)?
                  <StyleInput title={formtrans.description[props.lang]} direction={props.direction} 
                defaultValue={content?content.description:''} class={"formInput"}
                action={(e)=>props.setServiceChange(prevState => ({
                  ...prevState,
                  description:e
                }))}/>:<></>}
                <ServiceBrandHolder lang={props.lang} direction={props.direction} 
                setServiceChange={props.setServiceChange} setBrand={props.setBrand}
                brand={props.brand} all={tab>2?1:0} brandList={props.brandList}/>
          </div>
          {/*<div className="return-input">
            <input type="checkbox" name="" id="return"/>
            <label htmlFor="return">Returnable Item</label>
              </div>*/}
        </div>
    )
}
export default ServiceType