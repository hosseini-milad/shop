import React, { useRef ,useEffect, useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import StyleInput from "../../../components/Button/Input"
import formtrans from "../../../translate/forms"
import tabletrans from "../../../translate/tables"
import StyleSelect from '../../../components/Button/AutoComplete';
import env from '../../../env';

function PolicyUsers(props){
    const [searchUser,setSearhUser]=useState()
    const content=props.content
      //console.log(searchUser)
    const searchUserFunction=(search)=>{
      if(search.length>3){
        var postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({customer:search})
        }
     fetch(env.siteApi + "/panel/user/list",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
        setSearhUser(result.filter)
      },
      (error) => {
        console.log(error);
      })
    }
  }
    return(
        <div className="serviceItem">
            <StyleInput title={formtrans.name[props.lang]} direction={props.direction} 
              defaultValue={content?content.policyName:''} class={"formInput"}
              action={(e)=>props.setPolicyChange(prevState => ({
                ...prevState,
                policyName:e
              }))}/>
              <StyleInput title={tabletrans.policyCode[props.lang]} direction={props.direction} 
              defaultValue={content?content.policyCode:''} class={"formInput"}
              action={(e)=>props.setPolicyChange(prevState => ({
                ...prevState,
                policyCode:e
              }))}/>
            <StyleSelect title={formtrans.customer[props.lang]} direction={props.direction} 
              defaultValue={(content&&content.userId)?
                content.userInfo[0].cName:''} class={"formInput"}
              options={searchUser||[]}
              label={"fullInfo"||''}
              textChange={(e)=>searchUserFunction(e)}
              action={(e)=>props.setPolicyChange(prevState => ({
                ...prevState,
                userId:e
              }))}/>
            <StyleSelect title={formtrans.class[props.lang]} direction={props.direction} 
              options={props.classOptions||[]}
              label={"className"||''}
              defaultValue={(content?content.class:'')} class={"formInput"}
              action={(e)=>props.setPolicyChange(prevState => ({
                ...prevState,
                class:e
              }))}/>
            <StyleInput title={formtrans.discount[props.lang]} direction={props.direction} 
              defaultValue={content?content.discount:''} class={"formInput"}
              action={(e)=>props.setPolicyChange(prevState => ({
                ...prevState,
                discount:e
              }))}/>
        </div>
    )
}
export default PolicyUsers