import { useEffect, useState } from "react";
import env from "../../../env";
import errortrans from "../../../translate/error";

function CrmList(props){
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
      fetch(env.siteApi + "/panel/crm/list-crm",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setContent(result.filter)
        },
        (error) => {
          console.log(error);
        }
        
    )},[])
    console.log(content)
    return(
    <div className="profiles" style={{direction:direction}}>
        <div className="profiles-header">
            <h5>{errortrans.crms[lang]}</h5>
            <div className="add-profile-btn" onClick={()=>window.location.href="/crmlist/detail/new"}>
                <i className="fa-solid fa-plus" style={{color: "#ffffff"}}></i>
                <p>{errortrans.crm[lang]}</p>
            </div>
        </div>
        <div className={direction==="ltr"?"profile-table":"profile-table profileRtl"}>
            <table>
            <thead>
                <tr>
                <th>{errortrans.crmName[lang]}</th>
                <th>{errortrans.createdBy[lang]}</th>
                <th>{errortrans.createdOn[lang]}</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {content&&content.map((crm,i)=>(
                    <tr key={i}>
                    <td>
                        <div className="profiles-title">
                        <i className="fa-solid fa-certificate fa-sm" style={{color: "#00c6c6"}}></i>
                        <div className="p-wrapper" onClick={()=>
                        window.location.href="/crmlist/detail/"+crm._id}>
                            <p>{crm.crmName} 
                                <span>({crm.crmCode})</span></p>
                            <p>{crm.description}</p>
                        </div>
                        </div>
                    </td>
                    <td>مدیریت</td>
                    <td>{new Date(crm.date).toLocaleDateString('fa')}</td>
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
export default CrmList