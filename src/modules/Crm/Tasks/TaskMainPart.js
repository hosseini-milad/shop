import { useEffect, useState } from "react"
import StyleInput from "../../../components/Button/Input"
import env from "../../../env"
import StyleSelect from "../../../components/Button/AutoComplete"
import CheckList from "./CheckList"

function TaskMainPart(props){
    const [showNote,setShowNote] = useState()
    const data = props.data
    const content = props.content
    const [checkList ,setCheckList ] = useState(data?data.checkList:[])
    console.log(content)
    return( 
    <div className="nt-col-1">
        <div className="title-input center">
            <StyleInput label="تیتر تسک"
                style={{width:"100%"}} direction={props.direction}
                defaultValue={data?data.taskId:''}
                action={(e)=>props.setData(prevState => ({
                    ...prevState,
                    taskId:e
                }))}/>
        </div>
        <div className="note-input-task center">
        <label htmlFor="text-display" onClick={()=>setShowNote(showNote?0:1)}>
        {showNote?"مخفی کردن توضیحات":"افزودن توضیحات"}</label>
        {showNote?<textarea 
            onChange={(e)=>props.setData(prevState => ({
                    ...prevState,
                    content:e.target.value
                }))}>
            {data?data.content:''}</textarea>:<></>}
        </div>
        <CheckList checkList ={checkList} 
            setCheckList={setCheckList} taskId={data&&data._id}/>
        <div className="assign-input">
        <i className="fa-solid fa-user-plus avatar" style={{color: "#ffffff"}}></i>
        <div className="assign-wrapper" style={{flexDirection: "initial"}}>
            <StyleSelect title={"Profile To"}
            options={content?content.profileList:[]} label="profileName" 
            defaultValue={(content&&content.currentAssign)?
                content.currentAssign:''}
            direction={props.direction}
            action={(e)=>props.setData(prevState => ({
                ...prevState,
                profile:e?e._id:''
            }))}/>
            <StyleSelect title={"Assigned To"}
            options={content?content.user:[]} label="username" 
            defaultValue={(content&&content.currentUser)?
                content.currentUser:''}
            direction={props.direction}
            action={(e)=>props.setData(prevState => ({
                ...prevState,
                assign:e?e._id:''
            }))}/>
        </div>
        {/*<div className="assign-menu">
            <h6>Select Section</h6>
            <input type="search" name="" id="" placeholder="Search..."/>
            <p>To Do</p>
            <p>Doing</p>
            <p>QA</p>
            <p>Done</p>
        </div>*/}
        </div>
        {/*<div className="file-input">
        <input type="file" name="" id="file"/>
        <label for="file">
            <i className="fa-solid fa-paperclip" style={{color: "#c0c0c0"}}></i>
            <p>Add Attachment</p>
        </label>
    </div>*/}
        <div className="nt-btn-wrapper">
        <p> </p>
        
        </div>
    </div>
    )
}
export default TaskMainPart