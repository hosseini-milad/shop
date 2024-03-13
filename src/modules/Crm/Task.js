import {Draggable} from 'react-beautiful-dnd'
import { dayFromNow ,findPriority} from '../../env'
import { useState } from 'react'
import TaskPopUp from './TaskPopUp'
import OrderPopUp from './orderPopUp'
function Task(props){
    const [taskPop,setTaskPop] = useState(0)
    const [orderPop,setOrderPop] = useState(0)
    const taskData = props.taskList
    const taskProfile = taskData.profileInfo
    const creator = taskData.creatorInfo
    const customer = taskData.customerInfo
    const taskUser = taskData.userInfo
    return(<Draggable key={taskData._id}
        draggableId ={taskData._id} index={props.index}>
            {(provided,snapshot)=>(
                <li className={snapshot.isDragging?"board-task dragTask":"board-task"}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef} 
                    data-dragging={snapshot.isDragging}>
                        
                    <div className='titles'>
                        <h3 className={"task-title "+ 
                            findPriority(taskData.priority)+"task"}
                            onClick={()=>setTaskPop(1)}>
                            {taskData.taskId}</h3>
                        {taskData.content?
                        <span>{taskData.content}</span>
                            :<></>}
                    </div>
                    <div className='editTask'
                    onClick={()=>setTaskPop(1)}>
                        ویرایش
                    </div>
                    <div className='editTask'
                    onClick={()=>setOrderPop(1)}>
                        ویرایش سفارش
                    </div>
                    <span className="task-date">
                        <span className="icon-calendar"></span>
                        {dayFromNow(taskData.date)}</span>
                        {taskData.dueDate?
                            <small>{taskData.dueDate.month+"/"+
                            taskData.dueDate.day}</small>:<></>}
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
                    {taskProfile&&taskProfile.length?
                    <div className='task-handler'>
                        <small>{taskProfile[0].profileName}</small>
                    </div>:<></>}
                    {customer&&customer.length?
                    <div className='task-handler customerInfo'>
                        <small>{customer[0].username}</small>
                    </div>:<></>}
                    {creator&&creator.length?
                    <div className='task-handler creatorInfo'>
                        <small>{creator[0].username}</small>
                    </div>:<></>}
                    {taskUser&&taskUser.length?
                    <div className='task-handler right-handler'>
                        <small>{taskUser[0].cName}</small>
                    </div>:<></>}
                    {taskPop?<TaskPopUp title={"ویرایش تسک"}
                    btnText={"بروزرسانی"} action={props.action}
                    token={props.token} crm={props.crm}
                    direction={props.direction}
                    setBoardArray={props.setBoardArray}
                    data={taskData} close={()=>setTaskPop(0)}
                    />:<></>}
                    {orderPop?<OrderPopUp title={"ویرایش سفارش"}
                    btnText={"بروزرسانی"} action={props.action}
                    token={props.token} crm={props.crm}
                    direction={props.direction}
                    setBoardArray={props.setBoardArray}
                    data={taskData} close={()=>setOrderPop(0)}
                    />:<></>}
                    
                </li>
            )}
        
    </Draggable>)
}
export default Task