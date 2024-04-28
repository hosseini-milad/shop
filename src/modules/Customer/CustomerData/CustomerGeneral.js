import { useState } from "react"
import StyleInput from "../../../components/Button/Input"
import env from "../../../env"
import formtrans from "../../../translate/forms"
import CustomerAvatar from "../CustomerComponent/CustomerAvatar"
import ErrorShow from "../../../components/Button/ErrorShow"
import ErrorAction from "../../../components/Modal/ErrorAction"
import StyleRadio from "../../../components/Button/Radio"


function CustomerGeneral(props){
  const userData = props.userData
  const [formData, setFormData] = useState()
  const [error,setError] = useState({errorText:'',errorColor:"brown"})
  const [formalShow,setFormal] = useState(0)
  const saveChanges=() => {
    var postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
          userId:userData._id,
          ...formData
        })
      }
      console.log(postOptions)
  fetch(env.siteApi + "/panel/user/update-customer",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      if(result.success)
      {
        setError({errorText:result.success,
          errorColor:"green"})
        setTimeout(()=>setError({errorText:'',errorColor:"brown"}),3000)
      }
      else console.log(result)
    },
      (error) => {
        console.log(error);
      }
  )   
    
  }
  const formalCustomer=(e) => {
    var postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
          userData
        })
      }
      //console.log(postOptions)
  fetch(env.siteApi + "/panel/user/formal-customer",postOptions)
  .then(res => res.json())
  .then(
    (result) => {
      if(result.result)
      {
        setError({errorText:result.message,
          errorColor:"green"})
        setTimeout(()=>window.location.reload(),3000)
      }
      else console.log(result)
    },
      (error) => {
        console.log(error);
      }
  )   
    
  }
  if(!userData)
    return(<div className="general-page">{env.loader}</div> )
  else return(
        <div className="general-page">
          {/* <CustomerAvatar /> */}
          <div className="info-box">
            <div className="info-wrapper">
              <StyleInput title={formtrans.name[props.lang]} direction={props.direction} 
                defaultValue={userData.cName} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  cName:e
                }))}/>
              <StyleInput title={formtrans.fname[props.lang]} direction={props.direction} 
                defaultValue={userData.sName} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  sName:e
                }))}/>
              
              <StyleInput title={formtrans.emailAddress[props.lang]} direction={props.direction} 
                defaultValue={userData.email} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  email:e
                }))}/>
              
              <StyleInput title={formtrans.phoneNumber[props.lang]} direction={props.direction} 
                defaultValue={userData.phone} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  phone:e
                }))}/>
              <StyleInput title={formtrans.mobile[props.lang]} direction={props.direction} 
                defaultValue={userData.mobile} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  mobile:e
                }))}/>
              <StyleInput title={formtrans.EmergencyContact[props.lang]} direction={props.direction} 
                defaultValue={userData.urgCall} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  urgCall:e
                }))}/>

              <StyleInput title={formtrans.customercode[props.lang]} direction={props.direction} 
                defaultValue={userData.cCode} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  cCode:e
                }))}/>
              <StyleInput title={formtrans.postalCode[props.lang]} direction={props.direction} 
                defaultValue={userData.postalCode} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  postalCode:e
                }))}/>
              
              <StyleInput title={formtrans.meliCode[props.lang]} direction={props.direction} 
                defaultValue={userData.meliCode} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  meliCode:e
                }))}/>
              
              {/* <StyleInput title={formtrans.country[props.lang]} direction={props.direction} 
                defaultValue={userData.country} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  country:e
                }))}/> */}
              
              <StyleInput title={formtrans.state[props.lang]} direction={props.direction} 
                defaultValue={userData.state} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  state:e
                }))}/>
              <StyleInput title={formtrans.city[props.lang]} direction={props.direction} 
                defaultValue={userData.city} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  city:e
                }))}/>

{/* <StyleRadio options={serviceKind} title="Type"
            label={props.lang} 
            defaultValue={userData.activity}
            action={(e)=>props.setFormData(prevState => ({
              ...prevState,
              activity:e.english
          }))} />
          <StyleRadio options={serviceKind} title="Type"
            label={props.lang}
            defaultValue={userData.activity}
            action={(e)=>props.setFormData(prevState => ({
              ...prevState,
              activity:e.english
          }))} /> */}

              {/* <StyleInput title={formtrans.address[props.lang]} direction={props.direction} 
                defaultValue={userData.Address} class={"formInput"}
                action={(e)=>setFormData(prevState => ({
                  ...prevState,
                  Address:e
                }))}/> */}
              <div>

                
              </div>
              <div className="info-input"><label htmlFor="address">
                  {formtrans.address[props.lang]}</label>
              <textarea name="address"
                  id="address" onChange={(e)=>setFormData(prevState => ({
                    ...prevState,
                    Address:e.target.value
                  }))}>{userData.Address}</textarea>
              </div>
              
              <div className="info-input"><label htmlFor="about">
                  {formtrans.about[props.lang]}</label>
              <textarea name="about"
                  id="about" onChange={(e)=>setFormData(prevState => ({
                    ...prevState,
                    about:e.target.value
                  }))}>{userData.about}</textarea>
              </div>



            
            </div>
            {userData.agent?
            <div className="delete-user-btn formal-btn" onClick={()=>setFormal(1)}>
              رسمی کردن مشتری</div>:<></>}
            <div className="save-btn" onClick={saveChanges}>{formtrans.saveChanges[props.lang]}</div>
            <ErrorShow message={error.errorText} color={error.errorColor} />
            {formalShow?<ErrorAction title="رسمی کردن مشتری" color="darkslateblue" 
              text="مشتری بعد از ثبت در سپیدار، به عنوان مشتری رسمی در خواهد آمد."
              close={()=>setFormal(0)}
              buttonText="تایید" action={(e)=>formalCustomer(e)}/>:<></>}
          </div>


        </div>
    )
}
export default CustomerGeneral