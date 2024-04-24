import { useState } from "react"
import StyleInput from "../../components/Button/Input"
import Switch from "react-switch";
import ImageUserHolder from "./ImageUserHolder";
import CustomerXtra from "./CustomerXtra";

function UserForm(props){
    const [userTab,setUserTab] = useState(0)
    const def = props.def
    //console.log(def)
    return(<>
        <div className="customerTab">
          <small>اطلاعات اصلی</small>
          <small>اطلاعات تکمیلی</small>
        </div>
        <div className="card-form">
            {userTab?<CustomerXtra />
            :<div className="card-input">
                <StyleInput title={"نام"} direction={"rtl"} 
                class="userInput" defaultValue={def?def.cName:''}
                action={(e)=>props.setData(prevState => ({
                  ...prevState,
                    cName:e
                }))}/>
                <StyleInput title={"نام خانوادگی"} direction={"rtl"} 
                class="userInput"  defaultValue={def?def.sName:''}
                action={(e)=>props.setData(prevState => ({
                  ...prevState,
                  sName:e
                }))}/>
                <StyleInput title={"شماره تماس"} direction={"rtl"} 
                class="userInput"  defaultValue={def?def.phone:''}
                action={(e)=>props.setData(prevState => ({
                  ...prevState,
                  phone:e
                }))}/>
                <StyleInput title={"شماره موبایل"} direction={"rtl"} 
                class="userInput"  defaultValue={def?def.mobile:''}
                action={(e)=>props.setData(prevState => ({
                  ...prevState,
                  mobile:e
                }))}/>
                <StyleInput title={"کدملی"} direction={"rtl"} 
                class="userInput"  defaultValue={def?def.meliCode:''}
                action={(e)=>props.setData(prevState => ({
                  ...prevState,
                  meliCode:e
                }))}/>
                <StyleInput title={"کدپستی"} direction={"rtl"} 
                class="userInput"  defaultValue={def?def.postalCode:''}
                action={(e)=>props.setData(prevState => ({
                  ...prevState,
                  postalCode:e
                }))}/>
                
                <StyleInput title={"کد نقش"} direction={"rtl"} 
                class="userInput"  defaultValue={def?def.roleId:''}
                action={(e)=>props.setData(prevState => ({
                  ...prevState,
                  roleId:e
                }))}/>
                <StyleInput title={"موقعیت مکانی"} direction={"rtl"} 
                class="userInput"  defaultValue={def?def.nif:''}
                action={(e)=>props.setData(prevState => ({
                  ...prevState,
                  nif:e
                }))}/>
                
                <StyleInput title={"آدرس"} direction={"rtl"} 
                class="userInput fullRow"  defaultValue={def?def.Address:''}
                action={(e)=>props.setData(prevState => ({
                  ...prevState,
                  Address:e
                }))}/>
                {/*<div className="official">
                    <label htmlFor="active">رسمی</label>
                    <Switch onChange={(e)=>props.setData(data => ({
                            ...data,
                            ...{official:e?"true":"false"}
                            }))} checked={props.data&&
                            props.data.active==="true"?true:false} />
                            </div>*/}
                <div className="imageUser">
                    <ImageUserHolder imageUrl={props.imageUrl?props.imageUrl:def?def.imageUrl1:''} 
                    setImageUrl={props.setImageUrl} 
                    imageUrl2={props.imageUrl2?props.imageUrl2:def?def.imageUrl2:''} 
                    setImageUrl2={props.setImageUrl2}
                    kasbUrl={props.kasbUrl?props.kasbUrl:def?def.kasbUrl:''} 
                    setKasbUrl={props.setKasbUrl} init={0}
                    def={def} titles={["تصویر کارت ملی*","تصویر کد نقش","تصویر جواز کسب"]}/>
                </div>
                <div className="imageUser">
                    <ImageUserHolder imageUrl={props.shopUrl1?props.shopUrl1:def?def.shopUrl1:''} 
                    setImageUrl={props.setShopUrl1} 
                    imageUrl2={props.shopUrl2?props.shopUrl2:def?def.shopUrl2:''} 
                    setImageUrl2={props.setShopUrl2}
                    kasbUrl={props.shopUrl3?props.shopUrl3:def?def.shopUrl3:''} 
                    setKasbUrl={props.setShopUrl3} init={10}
                    def={def} titles={["تصویر محل کسب 2","تصویر محل کسب 3","تصویر محل کسب 1*"]}/>
                </div>
            </div>}
        </div></>
    )
}
export default UserForm