import { useState } from "react"
import StyleInput from "../../components/Button/Input"
import Switch from "react-switch";
import ImageUserHolder from "./ImageUserHolder";

function UserForm(props){
    const def = props.def
    console.log(def)
    return(
        <div className="card-form">
            <div className="card-input">
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
                <StyleInput title={"آدرس"} direction={"rtl"} 
                class="userInput"  defaultValue={def?def.Address:''}
                action={(e)=>props.setData(prevState => ({
                  ...prevState,
                  Address:e
                }))}/>
                <StyleInput title={"موقعیت مکانی"} direction={"rtl"} 
                class="userInput"  defaultValue={def?def.nif:''}
                action={(e)=>props.setData(prevState => ({
                  ...prevState,
                  nif:e
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
                    setKasbUrl={props.setKasbUrl}
                    def={def}/>
                </div>
            </div>
        </div>
    )
}
export default UserForm