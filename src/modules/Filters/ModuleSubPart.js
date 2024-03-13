import { useState } from "react"

function ModuleSubPart(props){
    const defaultCheck =props.content
    const subModule = props.subModule
    var defaultIndex = -1
    if(defaultCheck&&defaultCheck.title===subModule.english){
      console.log(defaultCheck)
      if(defaultCheck.state ==="full") defaultIndex=2
      else if(defaultCheck.state ==="edit") defaultIndex=1
      else defaultIndex=0
    }
    const [activeIndex,setActiveIndex] = useState(defaultIndex)
    const updateAccess=(module,value,state,index)=>{
      const rep = props.accessChange.find(
        item=>(item.title===module&&item.state===state))

      if(rep){
        props.setAccessChange(props.accessChange.filter(
          item => (item.title!==module||item.state!==state)))
        setActiveIndex(-1)
      }
      else{
        setActiveIndex(index)
        value&&props.setAccessChange([ 
          ...props.accessChange,
          {title:module,
            state:state,
            value:value
          }
        ])
      }
    }
    return(
        
            <div className="section-member">
              <p>{subModule[props.lang]}</p>
              <div className="slideBar">
                <div className="dense-btn">
                  <input className="switch-input" type="checkbox" id={subModule.english+"view"}
                    defaultChecked={defaultIndex===0?true:false}
                    disabled={(activeIndex===-1||activeIndex===0)?false:true}
                    onClick={(e)=>updateAccess(subModule.english,e.target.checked,"view",0)} />
                  <label htmlFor={subModule.english+"view"} 
                  className={(activeIndex===-1||activeIndex===0)?"switch-label":"switch-label disable-label"}></label>
                </div>
                <div className="dense-btn">
                  <input className="switch-input" type="checkbox" id={subModule.english+"edit"} 
                  defaultChecked={defaultIndex===1?true:false}
                    disabled={(activeIndex===-1||activeIndex===1)?false:true}
                    onClick={(e)=>updateAccess(subModule.english,e.target.checked,"edit",1)}/>
                  <label htmlFor={subModule.english+"edit"}
                  className={(activeIndex===-1||activeIndex===1)?"switch-label":"switch-label disable-label"} ></label>
                </div>
                <div className="dense-btn">
                  <input className="switch-input" type="checkbox" id={subModule.english+"full"}
                    defaultChecked={defaultIndex===2?true:false}
                    disabled={(activeIndex===-1||activeIndex===2)?false:true}
                    onClick={(e)=>updateAccess(subModule.english,e.target.checked,"full",2)}/>
                  <label htmlFor={subModule.english+"full"}
                  className={(activeIndex===-1||activeIndex===2)?"switch-label":"switch-label disable-label"}></label>
                </div>
              </div>
            </div>
            
    )
}
export default ModuleSubPart