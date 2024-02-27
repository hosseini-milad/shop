import { useEffect, useState } from "react"
import TaskMainPart from "./Tasks/TaskMainPart"
import env from "../../env"

function TaskPopUp(props){
    const [data,setData] = useState(props.data)
    const [content,setContent] = useState()
    useEffect(()=>{
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({taskId:data?data._id:''})
          }
      fetch(env.siteApi + "/panel/user/taskData",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setContent(result)
        },
        (error) => {
          console.log(error);
        })
    },[])
    return(
    <section className="delete-modal">
        <div className="modal-backdrop show-modal">
            <div className="task-popup">
                <div className="nt-header">
                <h4>{props.title}</h4>
                </div>
                <div className="nt-wrapper">
                {content?<TaskMainPart data={data} setData={setData} crm={props.crm}
                taskStep={props.taskStep} content={content} setContent={setContent}
                btnText={"Update"} action={props.action} close={props.close}/>:<></>}
                {/*<div className="nt-col-2">
                    <div className="prob-wrapper">
                    <i className="fa-regular fa-calendar" style={{color: "#c0c0c0"}}></i>
                    <div className="prob-title">
                        <p>Start date</p>
                        <p>Not set yet<span><i className="fa-solid fa-angle-down fa-2xs"></i></span></p>
                    </div>
                    </div>
                    <div className="prob-wrapper">
                    <i className="fa-regular fa-calendar" style={{color: "#c0c0c0"}}></i>
                    <div className="prob-title">
                        <p>Due date</p>
                        <p>Not set yet<span><i className="fa-solid fa-angle-down fa-2xs"></i></span></p>
                    </div>
                    </div>
                    <div className="prob-wrapper">
                    <i className="fa-regular fa-clock" style={{color: "#c0c0c0"}}></i>
                    <div className="prob-title">
                        <p>Reminder</p>
                        <p>Not set yet<span><i className="fa-solid fa-angle-down fa-2xs"></i></span></p>
                    </div>
                    </div>
                    <div className="prob-wrapper">
                    <i className="fa-solid fa-right-left rotate" style={{color: "#c0c0c0"}}></i>
                    <div className="prob-title">
                        <p>Priority</p>
                        <p>None<span><i className="fa-solid fa-angle-down fa-2xs"></i></span></p>
                    </div>
                    </div>
                    <div className="prob-wrapper">
                    <i className="fa-solid fa-tag" style={{color: "#c0c0c0"}}></i>
                    <div className="prob-title">
                        <p>Tags</p>
                        <p>No Tags added<span><i className="fa-solid fa-plus fa-2xs"></i></span></p>
                    </div>
                    </div>
                    <div className="prob-wrapper">
                    <i className="fa-solid fa-repeat" style={{color: "#c0c0c0"}}></i>
                    <p>Repeat Task</p>
                    </div>
                </div>*/}
                </div>
            </div>
        </div>
    </section>
    )
}
export default TaskPopUp