import { useEffect, useState } from "react"
import StyleInput from "../../../components/Button/Input"
import env from "../../../env"
import StyleSelect from "../../../components/Button/AutoComplete"
import CheckList from "./CheckList"

function TaskMainPart(props){
    const [showNote,setShowNote] = useState()
    const [acShow,setacShow] = useState(false)
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
        
        <div className="ac-wrapper">
            <div className="ac-tabs">
                <div onClick={()=>setacShow(false)} className={acShow?"tab-item":"tab-item active-tab"}>کامنت</div>
                <div onClick={()=>setacShow(true)} className={acShow?"tab-item active-tab":"tab-item"}>فعالیت</div>
            </div>
            {acShow?
            <div className="act-wrapper">
                <div className="act-item">
                    <div class="text-wrapper">
                        <div className="user"><p>یوزر</p></div>
                        <div className="text"><p>تست فعالیت</p></div>
                    </div>
                    <div className="date"><p>1345/02/30</p><p>11:30PM</p></div>
                </div>
            </div>
            :<div className="com-wrapper">
                <div className="com-item">
                    <div className="user"><p>یوزر</p></div>
                    <div className="text"><p>تست کامنت</p></div>
                    <div className="date"><p>1345/02/30</p><p>11:30PM</p></div>
                    <div className="reply">پاسخ</div>
                </div>
                <div className="com-new">
                    <input placeholder="تایپ کنید....."/>
                    <i class="fa-solid fa-arrow-left"></i>
                </div>
            </div>}
        </div>
    </div>
    )
}
export default TaskMainPart