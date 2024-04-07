import { useEffect, useState } from "react"
import errortrans from "../../translate/error"
import ModuleSubPart from "./ModuleSubPart"
import env from "../../env"

function ModulePart(props){
    const module = props.module
    const content = props.content&&props.content.access
    
    return(
        <div className="ps-section">
          <div className="section-header">
            <i className="fa-solid fa-sliders" style={{color: "#c0c0c0"}}></i>
            <div className="section-title">
              <p>{module[props.lang]} <span><i className="fa-solid fa-sort-down fa-sm"></i></span></p>
              <p>{module.description}</p>
            </div>
          </div>
          <div className="section-wrapper slideBarTitle">
            <div className="section-member">
                <div className="">
                    
                </div>
                <div className="slideBar">
                    <div className="dense-btn">{errortrans.read[props.lang]}
                    </div>
                    <div className="dense-btn">{errortrans.edit[props.lang]}
                    </div>
                    <div className="dense-btn">{errortrans.full[props.lang]}
                    </div>
                </div>
            </div>
          </div>
          <div className="section-wrapper">
            {module&&module.children.map((subModule,i)=>(
                <ModuleSubPart subModule={subModule} key={i} lang={props.lang} 
                content={content&&content.find(item=>item.title===subModule.english)}
            accessChange={props.accessChange} setAccessChange={props.setAccessChange}/>
            ))}
          </div>
        </div>
    )
}
export default ModulePart