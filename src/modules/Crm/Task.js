import {Draggable} from 'react-beautiful-dnd'
import { dayFromNow } from '../../env'
import { useState } from 'react'
import TaskPopUp from './TaskPopUp'
function Task(props){
    const [taskPop,setTaskPop] = useState(0)
    const taskData = props.taskList
    const taskUser = taskData.profileInfo
    return(<Draggable key={taskData._id}
        draggableId ={taskData._id} index={props.index}>
            {(provided,snapshot)=>(
                <li className={snapshot.isDragging?"board-task dragTask":"board-task"}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef} 
                    data-dragging={snapshot.isDragging}>
                        
                    <div className='titles'>
                        <a href={`/profile/${taskData._id}`}>
                            <h3 className="task-title">{taskData.taskId}</h3></a>
                        {taskData.content?
                        <a href={`/profile/${taskData.content}`}>
                            <h3 className="task-title">{taskData.content}</h3></a>
                            :<></>}
                    </div>
                    <div className='editTask'
                    onClick={()=>setTaskPop(1)}>
                        Edit
                    </div>
                    <span className="task-date">
                        <span className="icon-calendar"></span>
                        {dayFromNow(taskData.date)}</span>
                    <ul className="task-meta">
                        <li><a href={`mailto:${taskData.email}`}>
                            <span className="icon-envelope"></span> 
                            {taskData.email}</a></li>
                        <li><a href={`tel:${taskData.phone}`}>
                            <span className="icon-phone"></span>
                            {taskData.phone}</a></li>
                    </ul>
                    {/*<span className={taskData.tag==="Active"?
                        "task-status status-active":"task-status status-deactive"}
                        title={taskData.tag}>
                    {taskData.tag}</span>:<></>}*/}
                    {taskUser&&taskUser.length?
                    <div className='task-handler'>
                        <small>{taskUser[0].profileName}</small>
                        <small>{taskData.agency}</small>
                    </div>:<></>}
                    {taskPop?<TaskPopUp title={"Edit Task"}
                    btnText={"Update"} action={props.action}
                    data={taskData} close={()=>setTaskPop(0)}
                    />:<></>}
                    
                </li>
            )}
        
    </Draggable>)
}
export default Task