import { useEffect, useState } from "react"
import CheckItem from "./CheckItem"
import env from "../../../env"
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function CheckList(props){
    const token=cookies.get(env.cookieName)
    //const [checkData,setCheckData]= useState(props.checkList)
    const updateValue=(value,state,id)=>{
        console.log(value,state,id)
        var oldItem = props.checkList
        oldItem[id] = {title:value,status:state}
        props.setCheckList(oldItem)
            updateCheckList(oldItem)
    }
    const updateCheckList=(newItem)=>{
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json',
            "x-access-token":token&&token.token,"userId":token&&token.userId},
            body:JSON.stringify({_id:props.taskId,
                checkList:newItem})
          }
       fetch(env.siteApi + "/panel/crm/update-checkList",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result)
        },
        (error) => {
          console.log(error);
        })
    }
    //console.log(checkData)
    const addNewCheckList=()=>{
        var index = props.checkList?props.checkList.length:0
        if(index)props.setCheckList(
            existingItems => {
            return [
                ...existingItems.slice(0, index),
                {title:"",status:0},
                ...existingItems.slice(index + 1),
            ]
            })
        else props.setCheckList([{title:"",status:0}])
    }
    const removeItem=(id)=>{
        var index = id
        //props.checkList.splice(index, 1)
        //props.setCheckList(e=>{return [props.checkList]})
        console.log("Check remove")
    }
    return(
        <div className="list-input center">
        <h6>چک لیست</h6>
        {props.checkList&&props.checkList.map((check,i)=>(
            <div className="list-wrapper" key={i}>
                <CheckItem data={check} setData={props.setCheckList} 
                key={i} id={i} removeItem={removeItem}
                updateValue={updateValue}
                updateCheckList={updateCheckList}/>
            </div>
        ))}
        <div className="add-list-btn" onClick={addNewCheckList}>
            <i className="fa-solid fa-plus fa-lg" ></i>
            <p>افزودن چک لیست</p>
        </div>
        </div>
    )
}
export default CheckList