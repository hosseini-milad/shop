import React, { useRef ,useEffect, useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import StyleInput from "../../../components/Button/Input"
import formtrans from "../../../translate/forms"
import tabletrans from "../../../translate/tables"
import env from '../../../env';
import StyleSelect from '../../../components/Button/AutoComplete';
import UserTable from '../../Customer/CustomerTable';

function ClassUser(props){
    const content=props.content
    const users=props.users
    const customers=props.customers
    const userFilter = props.userFilter
    const [error,setError] = useState({errorText:'',errorColor:"brown"})
    
    const [userSearch,setUserSearch] = useState('')
    const addUserToClass=()=>{
      var postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({userId:userSearch._id,class:content})
      }
    console.log(postOptions)
  fetch(env.siteApi + "/panel/user/update-customer-class",postOptions)
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
          setError({errorText:"کلاس پیدا شد",
            errorColor:"green"})
          
          setTimeout(()=>window.location.reload(),500)
        }
        
    },
    (error) => {
      console.log(error);
    })
    }
    const setUserClass=(search)=>{
      if(!search||search.length<4)return
      var postOptions={
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({customer:search})
      }
     
  fetch(env.siteApi + "/panel/user/list-customers",postOptions)
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
            setUserSearch(result.filter)
          setTimeout(()=>setError({errorText:'',errorColor:"brown"}),2000)
        }
        
    },
    (error) => {
      console.log(error);
    })
    }
    return(
        <div className="userItem">
          <strong>لیست مشتریان</strong>
          <div className='new-member newUser'>
            <StyleSelect title={formtrans.customer[props.lang]} direction={props.direction} 
              //defaultValue={content?content.userInfo[0].cName:''} class={"formInput"}
              options={userSearch||[]}
              label={"username"||''}
              textChange={(e)=>setUserClass(e)}
              action={(e)=>setUserSearch(e)}/>
            <div className="addClassBtn" onClick={addUserToClass}>
              <i className="fa-solid fa-plus"></i></div>
          </div>
          <div className="user-list">
          <UserTable userList={{filter:users}} lang={{lang:props.lang}}/>
          </div>
          <div className="user-list">
          <UserTable userList={{filter:customers}} lang={{lang:props.lang}}/>
          </div>
        </div>
    )
}
export default ClassUser