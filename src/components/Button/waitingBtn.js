import { useEffect, useState } from "react"

function WaitingBtn(props){
    const [btnTitle,setBtnTitle] = useState(props.title)
    const [postFix,setPostFix] = useState('')
    useEffect(()=>{
        setTimeout(()=>setBtnTitle(props.title),500)
    },[props.error])
    useEffect(()=>{
        if(btnTitle === props.title)setPostFix('')
        else
        postFix.length<4?
        setTimeout(()=>setPostFix(postFix+"."),500):
        setPostFix('')
    },[btnTitle,postFix])
    return(
        <button type="input" className={props.class} name={props.name}
            onClick={()=>btnTitle === props.title?
                (props.function(),setBtnTitle(props.waiting)):
                console.log("waiting")}>
                {btnTitle}{postFix}</button>
    )
}
export default WaitingBtn