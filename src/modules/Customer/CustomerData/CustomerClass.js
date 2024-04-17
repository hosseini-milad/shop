import { useEffect, useState } from "react"
import UserClassSelect from "../CustomerComponent/UserClassSelect"
import env from "../../../env"
import Cookies from 'universal-cookie';
import StyleInput from "../../../components/Button/Input";
import errortrans from "../../../translate/error";
const cookies = new Cookies();

function CustomerClass(props){
    const token=cookies.get(env.cookieName)
    const userData = props.userData
    const [newClass,setNewClass] = useState()
    const [classes,setClasses] = useState()
    const [changeClass,setChangeClass] = useState()
    console.log(userData)
    useEffect(()=>{
        const body={
            userId: userData&&userData._id,
        }
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json',
            "x-access-token":token&&token.token,"userId":token&&token.userId},
            body:JSON.stringify(body)
          }
          console.log(postOptions)
      fetch(env.siteApi + "/panel/user/list-classes",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setClasses(result)
        },
        (error) => {
          console.log(error);
        })
    
    },[changeClass])
    const addClass=()=>{
        setClasses()
        const body={
            className: newClass,
            manId: token&&token.userId,
            userId: userData._id
        }
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json',
            "x-access-token":token&&token.token,"userId":token&&token.userId},
            body:JSON.stringify(body)
          }
          console.log(postOptions)
      fetch(env.siteApi + "/panel/user/update-class",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setClasses(result)
        },
        (error) => {
          console.log(error);
        })
    }
    return(
      <div className="sec-page">
        <UserClassSelect direction={props.direction} lang={props.lang}
          classes={classes} token={token} userData={userData}
          setChangeClass={setChangeClass}/>
        <div className="new-member">
                <StyleInput title={errortrans.newClass[props.lang]} direction={props.direction}
                    lang={props.lang}
                    action={(e)=>e&&setNewClass(e)}
                />
                <div className="addClassBtn" onClick={addClass}>
                    <i className="fa-solid fa-plus"></i>
                </div>
              </div>
        {/*<div className="default-line"><p>Default Section</p></div>
        <div className="role-input">
          <label htmlFor="role">User Role</label>
          <div className="red-line"></div>
          <select name="" id="role">
            <option value="">Member</option>
            <option value="">Manager</option>
            <option value="">Admin</option>
          </select>
        </div>
        <div className="profile-input">
          <label htmlFor="profile">Profile</label>
          <div className="red-line"></div>
          <select name="" id="profile">
            <option value="">Member</option>
            <option value="">Manager</option>
            <option value="">Admin</option>
          </select>
        </div>
        <div className="notify-input">
          <input type="checkbox" id="notify"/>
          <label htmlFor="notify">Notify via email</label>
        </div>
        <div className="create-btn-wrapper">
          <div className="add-btn"><p>Add</p></div>
          <div className="cancel-btn"><p>Cancel</p></div>
    </div>*/}
    </div>
    )
}
export default CustomerClass