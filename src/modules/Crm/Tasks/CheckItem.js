import { useEffect, useState } from "react"

function CheckItem(props){
    const [edit,setEdit] = useState((props.data&&props.data.title)?0:1)
    const [status,setStatus] = useState(props.data.status)
    const [title,setTitle] = useState(props.data.title)
    const [save,setSave] = useState(0)
    useEffect(()=>{
        if(!save)return
        props.updateValue(title,status,props.id)
        setSave(0)
    },[save])
    const updateTitle=(title)=>{
        const index = props.id
        props.setData(existingItems => {
        return [
            ...existingItems.slice(0, index),
            {title:title,status:status},
            ...existingItems.slice(index + 1),
        ]
        })
        setTitle(title)
    }
    return(
        <div className="list-member">
            
            {status?
            <div className="white-circle check-circle">
                <i className="fa-regular fa-remove fa-white-check" 
                onClick={()=>(setStatus(0),setSave(1))}/>
            </div>:
            <div className="white-circle">
                <i className="fa-regular fa-check fa-status-check" 
                onClick={()=>(setStatus(1),setSave(1))}/>
            </div>}
            {edit?<input value={props.data?props.data.title:''} 
                onChange={(e)=>updateTitle(e.target.value)}
                onKeyDown={(e)=>e.keyCode ===13&&
                (console.log('next row'))} className="checkInput"/>:
                <p className={status?"doneTask":""}>{props.data?props.data.title:''}</p>}
            {!status?
                edit?<div className="member-btn-wrapper">
                <i className="fa-regular fa-save fa-sm" style={{color: "#c0c0c0"}}
                onClick={()=>(setEdit(0),setSave(1))}></i></div>:
                <div className="member-btn-wrapper">
                <i className="fa-regular fa-pencil fa-sm" style={{color: "#c0c0c0"}}
                onClick={()=>setEdit(1)}></i>
                <i className="fa-solid fa-trash fa-sm" style={{color: "#c0c0c0"}}
                    onClick={()=>props.removeItem()}></i>
                
            </div>:<></>}
        </div>
    )
}
export default CheckItem