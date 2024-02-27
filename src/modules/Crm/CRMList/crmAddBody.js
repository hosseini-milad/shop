import { useState } from "react"
import CRMNewStep from "./crmNewStep"

function CRMBody(props){
    const [newStepShow,setNewStepShow] = useState(0)
    const content=props.content
    return(
      <main>
        <table>
            <tbody>
                <tr>
                    <th>ردیف</th>
                    <th>تیتر</th>
                    <th>title</th>
                    <th>id</th>
                    <th>index</th>
                </tr>
                {props.steps&&props.steps.map((step,i)=>(
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{step.title}</td>
                        <td>{step.enTitle}</td>
                        <td>{step.id}</td>
                        <td>{step.index}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="addStep" onClick={()=>setNewStepShow(1)}>
            + Add Step
        </div>
        {newStepShow?<CRMNewStep setSteps={props.setSteps}
        setNewStepShow={setNewStepShow} stepLen={props.steps.length}/>
        :<></>
        }
      </main>
    )
}
export default CRMBody