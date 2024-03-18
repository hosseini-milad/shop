import { useState, useEffect} from "react"
import env from "../env"
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../modules/Crm/Column';
import UpdateTaskStatus from '../modules/Crm/UpdateTaskStatus';
import Cookies from 'universal-cookie';
import errortrans from "../translate/error";
const cookies = new Cookies();

const initalDataStatic = {
    tasks:{
        'task-1':{id:'task-1',content:"1.User Register"},
        'task-2':{id:'task-2',content:"2.User Confirm"},
        'task-3':{id:'task-3',content:"3.User Active"},
        'task-4':{id:'task-4',content:"4.Data Uploaded"},
        'task-5':{id:'task-5',content:"5.Sent to Bank"},
        'task-6':{id:'task-6',content:"6.Recieve Bank Acount"}
    },
    columns:{
        'lead':{
            id:"lead", title:"Lead",
            taskIds:['task-1','task-2','task-3','task-4']
        },
        'inprogress':{
            id:"inprogress", title:"Inprogress",
            taskIds:[]
        },
        'completed':{
            id:"complete", title:"Completed",
            taskIds:['task-5','task-6']
        },
        'done':{
            id:"done", title:"Done",
            taskIds:['task-5','task-6']
        }
    },
    columnOrder:env.columnOrder
}
function CRM(props){
    const [boardArray,setBoardArray] = useState()
    const token=cookies.get(env.cookieName)
    useEffect(()=>{
        const body={
            crmId:"65b7c4bf4df713a2e74544c0"
        }
        const postOptions={
            method:'post',
            headers: {'Content-Type': 'application/json',
            "x-access-token":token&&token.token,"userId":token&&token.userId},
            body:JSON.stringify(body)
          }
      fetch(env.siteApi + "/panel/crm/fetch-tasks",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                if (result.error === "Invalid Token Error")
                {
                    const cookies = new Cookies();
                    cookies.remove(env.cookieName,{ path: '/' });
                    setTimeout(()=>(window.location.reload(),1000))
                }
            }
            setBoardArray(result)
        },
        (error) => {
          console.log(error);
        }
      )
    },[])
    const direction = props.lang?props.lang.dir:errortrans.defaultDir;
    const lang = props.lang?props.lang.lang:errortrans.defaultLang;
    //console.log(taskList)
    const [taskState,setTaskState] = useState()
    //const initalData = 
    //console.log(boardArray)
    const updateState=(id,state,prior)=>{
        
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({taskId:id,
                state:state,prior:prior})
          }
        fetch(env.siteApi + "/panel/crm/change-state",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
            },
            (error) => {
                console.log(error)
            })
    }
    const changeOrder=(tasks)=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({tasks:tasks})
          }
          console.log(postOptions)
        0&&fetch(env.siteApi + "/panel/crm/changeOrder",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
            },
            (error) => {
                console.log(error)
            })
    }
    const DragEnd=(result)=>{
        document.body.style.color="inherit"
        document.body.style.backgroundColor="inherit"
        const {destination,source,draggableId} = result
        if(!destination){
            return
        }
        if(destination.droppableId===source.droppableId&&
            destination.index === source.index)
            return;
        const start = boardArray.columns[source.droppableId]
        const finish = boardArray.columns[destination.droppableId]
        
        //return
        if(start === finish){
            const newTaskIds=Array.from(start)
            newTaskIds.splice(source.index,1);
            newTaskIds.splice(destination.index,0,draggableId);
            
            changeOrder(newTaskIds)
            const newColumn = {
                ...start, taskIds:newTaskIds,
            }

            const newBoard = {
                ...boardArray,
                columns:{
                    ...boardArray.columns,
                    [newColumn.id]:newColumn
                }
            }
            setBoardArray(newBoard)
            return;
        }
        else{
            const startTaskIds=(start)

            
            startTaskIds.splice(source.index,1);
            updateState(draggableId,destination.droppableId,destination.index)
            const newStart = {
                ...start, taskIds:startTaskIds,
            }
            const finishTaskIds=finish
            finishTaskIds.splice(destination.index,0,draggableId);
            
            const newFinish = {
                ...finish, taskIds:finishTaskIds,
            }

            //console.log(finishTaskIds)
            const newBoard = {
                ...boardArray,
                columns:{
                    ...boardArray.columns,
                    [newStart.id]:start,
                    [newFinish.id]:finish
                }
            }
            setBoardArray(newBoard)
            return;
            return
        }
    }
    const DragStart=(result)=>{
        document.body.style.color="var(--blue)";
        document.body.style.transition='background-color 0.2s ease'
    }
    const DragUpdate=(update)=>{
        /*const {destination} = update;
        const opacity = destination?
            destination.index/Object.keys(boardArray.tasks).length:0
        document.body.style.backgroundColor=`rgba(153,141,217,${opacity})`*/
    }
    return(
    <div className="crm" style={{direction:direction}}>
        <div className='reyham-board board-list'>
            {boardArray?<DragDropContext
            onDragStart={DragStart}
            onDragUpdate={DragUpdate}
            onDragEnd={DragEnd}>
                {boardArray.columnOrder.map((columnId,i)=>{
                    const column = boardArray.columnOrder.find
                        (item=>item.enTitle===columnId.enTitle);
                    const tasks = boardArray.columns[columnId.enTitle];
                    //console.log(tasks) 
                    var rawTasks = boardArray.tasks
                    var newTasks =[]
                    rawTasks.find(item=>item._id===tasks[item._id])
                    for(var i=0;i<tasks.length;i++){
                        newTasks.push(rawTasks.find(item=>item._id===tasks[i]))
                    }
                    return(column?<Column key={column.id} column={column} 
                        tasks={newTasks} token={token} direction={direction}
                        setBoardArray={setBoardArray} crm={boardArray.crm}/>:<></>)
                })}
            </DragDropContext>:<div>Updating</div>}
        </div>
    </div>
    )
}
export default CRM