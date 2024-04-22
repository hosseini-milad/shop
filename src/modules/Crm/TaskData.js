import { dayFromNow, findPriority } from "../../env"

function TaskData(props){
    const taskData = props.taskData
    const taskProfile = props.taskProfile
    const customer= props.customer
    const taskUser=props.taskUser
    const creator=props.creator
    return(
        <div className={taskData.result?taskData.result.Number?
            "taskData doneTitle":"taskData suspendTitle":"taskData"}>
            <div className='titles'
                onClick={()=>props.setOrderPop(1)}>
                <h3 className={"task-title "+ 
                    findPriority(taskData.priority)+"task"}>
                    {taskData.taskId}</h3>
                <ul>
                    <li>{creator&&creator.length?
                        creator[0].username:''}</li>
                    {customer&&customer.length?
                    <li>{customer[0].username}</li>:<></>}
                    <li>{new Date(taskData.date).toLocaleDateString('fa')}</li>
                </ul>
            </div>
            {/*<div className='editTask'
            onClick={()=>props.setTaskPop(1)}>
                ویرایش
                    </div>*/}
            <div className="footerTask" onClick={()=>props.setTaskPop(1)}>
                <ul className="footerIcons">
                    {taskData.content?
                        <li title={taskData.content}>
                            <i className="fa fa-footer fa-comment-o"></i>
                        </li>:<></>}

                    {taskData.dueDate?
                        <li><i className="fa fa-footer fa-calendar"></i>
                        {taskData.dueDate.month+"/"+
                        taskData.dueDate.day}</li>:<></>}
                    {taskData.checkList&&taskData.checkList.length?
                    <li><i className="fa fa-footer fa-list"></i>
                        {taskData.checkList.filter(item=>item.status).length}/
                        {taskData.checkList.length}
                    
                    {
                    
                    }</li>:<></>}
                </ul>
            </div>
            {taskData.result&&taskData.result.Number?
            <div className="footerTask">
                <span className={"task-status status-active"}
                    title={taskData.result.Number}>
                {taskData.result.Number}</span></div>:
            <></>}
            
            {taskProfile&&taskProfile.length?
            <div className='task-handler creatorInfo'>
                <small>{taskProfile[0].profileName}</small>
            </div>:<></>}
            {taskUser&&taskUser.length?
            <div className='task-handler customerInfo'>
                <small>{taskUser[0].cName}</small>
            </div>:<></>}
        </div>
    )
}
export default TaskData