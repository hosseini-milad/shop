import { useEffect, useState } from "react";
import env from "../../env";
import errortrans from "../../translate/error";

function AccessHolder(props){
    const direction = props.lang?props.lang.dir:errortrans.defaultDir;
    const lang = props.lang?props.lang.lang:errortrans.defaultLang;
    const [content,setContent] = useState('')
    useEffect(() => {
        const body={
            access:"manager"
        }
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(body)
          }
          console.log(postOptions)
      fetch(env.siteApi + "/panel/user/list-profiles",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setContent(result.profiles)
        },
        (error) => {
          console.log(error);
        }
        
    )},[])
    console.log(content)
    return(
    <div className="profiles" style={{direction:direction}}>
        {/*<div className="create-profile">*/}
        {/*    <h4>Create profile</h4>*/}
        {/*    <div className="clone-input">*/}
        {/*    <label htmlFor="clone">Clone Form</label>*/}
        {/*    <div className="red-line"></div>*/}
        {/*    <select name="" id="clone">*/}
        {/*        <option value="">Vendor</option>*/}
        {/*        <option value="">Member</option>*/}
        {/*        <option value="">Admin</option>*/}
        {/*    </select>*/}
        {/*    </div>*/}
        {/*    <div className="name-input">*/}
        {/*    <label htmlFor="name">Name</label>*/}
        {/*    <input type="text" name="" id="name"/>*/}
        {/*    <div className="red-line"></div>*/}
        {/*    </div>*/}
        {/*    <div className="dec-input">*/}
        {/*    <label htmlFor="dec">Description</label>*/}
        {/*    <textarea name="" id="dec"></textarea>*/}
        {/*    </div>*/}
        {/*    <div className="type-input">*/}
        {/*    <label htmlFor="type">Profile Type</label>*/}
        {/*    <div className="red-line"></div>*/}
        {/*    <select name="" id="type">*/}
        {/*        <option value="">Team User</option>*/}
        {/*        <option value="">Client User</option>*/}
        {/*        <option value="">Vendor User</option>*/}
        {/*    </select>*/}
        {/*    </div>*/}
        {/*    <div className="checkbox-input">*/}
        {/*    <div className="checkbox">*/}
        {/*        <input type="checkbox" name="" id="team"/>*/}
        {/*        <label htmlFor="team">Add profile users to all the projects in the team.</label>*/}
        {/*    </div>*/}
        {/*    <div className="checkbox">*/}
        {/*        <input type="checkbox" name="" id="project"/>*/}
        {/*        <label htmlFor="project">Add profile users to all the sprints in the associated projects.</label>*/}
        {/*    </div>*/}
        {/*    </div>*/}
        {/*    <div className="create-btn-wrapper">*/}
        {/*    <div className="create-btn">*/}
        {/*        <p>Create</p>*/}
        {/*    </div>*/}
        {/*    <div className="c-and-p-btn">*/}
        {/*        <p>Create & permissions</p>*/}
        {/*    </div>*/}
        {/*    <div className="cancel-btn">*/}
        {/*        <p>Cancel</p>*/}
        {/*    </div>*/}
        {/*    </div>*/}
        {/*</div>*/}
        <div className="profiles-header">
            <h5>{errortrans.profiles[lang]}</h5>
            <div className="add-profile-btn" onClick={()=>window.location.href="/access/detail/new"}>
                <i className="fa-solid fa-plus" style={{color: "#ffffff"}}></i>
                <p>{errortrans.profile[lang]}</p>
            </div>
        </div>
        <div className={direction==="ltr"?"profile-table":"profile-table profileRtl"}>
            <table>
            <thead>
                <tr>
                <th>{errortrans.profileName[lang]}</th>
                <th>{errortrans.createdBy[lang]}</th>
                <th>{errortrans.createdOn[lang]}</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {content&&content.map((profile,i)=>(
                    <tr key={i}>
                    <td>
                        <div className="profiles-title">
                        <i className="fa-solid fa-certificate fa-sm" style={{color: "#00c6c6"}}></i>
                        <div className="p-wrapper" onClick={()=>
                        window.location.href="/access/detail/"+profile._id}>
                            <p>{profile.profileName} 
                                <span>({profile.profileCode})</span></p>
                            <p>{profile.description}</p>
                        </div>
                        </div>
                    </td>
                    <td>مدیریت</td>
                    <td>{new Date(profile.date).toLocaleDateString('fa')}</td>
                    <td>
                        <div className="profiles-icons">
                        <i className="fa-solid fa-pen-to-square fa-sm" style={{color: "#c0c0c0"}}></i>
                        <i className="fa-solid fa-trash fa-sm" style={{color: "#c0c0c0"}}></i>
                        </div>
                    </td>
                    </tr>
                ))}
                
            </tbody>
            </table>
        </div>
        </div>
    )
}
export default AccessHolder