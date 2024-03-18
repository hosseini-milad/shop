import {Draggable} from 'react-beautiful-dnd'
import { dayFromNow ,findPriority} from '../../env'
import { useState } from 'react'
import TaskPopUp from './TaskPopUp'
import OrderPopUp from './orderPopUp'
import TaskData from './TaskData'
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
                        
                    <TaskData taskData = {taskData}
                        taskProfile = {taskProfile}
                        customer= {customer} taskUser={taskUser}
                        creator={creator}
                        setTaskPop={setTaskPop} setOrderPop={setOrderPop}/>
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