import { useState } from "react"
import StyleInput from "../../../components/Button/Input"

function CRMNewStep(props){
    const [newStep,setNewStep] = useState('')
    const addStep=()=>{
        props.setSteps(existingItems => {
            return [
              ...existingItems.slice(0, props.stepLen),
              newStep,
              ...existingItems.slice(props.stepLen + 1),
            ]
          })
        props.setNewStepShow(0)
    }
    return(
        <div className="newStepHolder">
            <StyleInput title="Title" 
            action={(e)=>setNewStep(prevState => ({
                ...prevState,
                title:e
              }))}/>
            <StyleInput title="ENTitle" 
            action={(e)=>setNewStep(prevState => ({
                ...prevState,
                enTitle:e
              }))}/>
            <StyleInput title="id" 
            action={(e)=>setNewStep(prevState => ({
                ...prevState,
                id:e
              }))}/>
            <StyleInput title="index" 
            action={(e)=>setNewStep(prevState => ({
                ...prevState,
                index:e
              }))}/>
            <input type="button" value="Add CRM Class" 
            onClick={addStep}/>
        </div>
    )
}
export default CRMNewStep