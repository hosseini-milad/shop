import { useState } from "react"
import env, { rxFindCountSeprate } from "../../../env"
import tabletrans from "../../../translate/tables"
import StyleInput from "../../../components/Button/Input"
import StyleSelect from "../../../components/Button/AutoComplete"

function OrderOptions(props){
    const sku=props.sku
    const content=props.content
    const [newCoridor,setNewCoridor] = useState()
    const [editMode,setEditMode]= useState(0)
    const odMain = content.odMain.split(',')
    const osMain = content.osMain.split(',')
    const frameSize = content.frameSize?content.frameSize.split(','):
    [,,,,,,,,,,,,]
    const [error,setError] = useState({errorText:'',errorColor:"brown"})
    const odOs=rxFindCountSeprate(content)
    const updateData=() => {
      if(newCoridor) {
      var postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify({coridor:newCoridor,
            rxorderNo:props.content.rxOrderNo})
        }
    
    fetch(env.siteApi + "/panel/order/editRxOrder",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
        if(result.error){
          setError({errorText:result.error,
            errorColor:"brown"})
          setTimeout(()=>setError({errorText:'',
            errorColor:"brown"}),3000)
        }
          else{
            setError({errorText:"تغییرات اعمال شدند",
              errorColor:"green"})
            setTimeout(()=>window.location.reload(),1000)
          }
          
      },
      (error) => {
        console.log(error);
      }
    )}
  }
    return( 
      <div class="info-box">
        <div class="delivery-info">
        <div class="info-header">
          <p>{tabletrans.coridor[props.lang]}</p>
          {editMode?<>
                <i class="fa-solid fa-check checkIcon" 
                  onClick={()=>updateData()}></i>
                  <i class="fa-solid fa-close checkIcon cancelIcon" 
                  onClick={()=>setEditMode(0)}></i>
                  </>:
                <i class="fa-solid fa-pen pen" onClick={()=>setEditMode(1)}></i>}
        </div>
        <div class="del-info-wrapper">
          <div class="del-col">
            <p>{tabletrans.coridor[props.lang]}</p>
          </div>
          <div class="del-col">
          {editMode?<StyleSelect title={tabletrans.coridor[props.lang]} 
            action={setNewCoridor} direction={props.direction} 
            options={["13","14","15","16","17","18"]}/>:
          <small>{content.coridor?content.coridor:"-"}</small>}
          </div>
        </div>
      </div>
      <div class="delivery-info">
        <div class="info-header">
          <p>{tabletrans.lensSize[props.lang]}</p>
          {/*<i class="fa-solid fa-pen pen"></i>*/}
        </div>
        <div class="del-info-wrapper">
          <div class="del-col">
            <p>OD SPH</p>
            <p>OD CYL</p>
            <p>OD Axis</p>
            <p>OD ADD</p>
            <p>OD DIA</p>
          </div>
          {odOs[0]?<div class="del-col">
            <small>{odMain[0]?odMain[0]:"0.00"}</small>
            <small>{odMain[1]?odMain[1]:"0.00"}</small>
            <small>{odMain[2]?odMain[2]:"-"}</small>
            <small>{odMain[3]?odMain[3]:"-"}</small>
            <small>{odMain[4]?odMain[4]:"-"}</small>
          </div>:<div class="del-col"></div>}
          
          <div class="del-col">
            <p>OS SPH</p>
            <p>OS CYL</p>
            <p>OS Axis</p>
            <p>OS ADD</p>
            <p>OS DIA</p>
          </div>
          <div class="del-col">
            <small>{osMain[0]?osMain[0]:"0.00"}</small>
            <small>{osMain[1]?osMain[1]:"0.00"}</small>
            <small>{osMain[2]?osMain[2]:"-"}</small>
            <small>{osMain[3]?osMain[3]:"-"}</small>
            <small>{osMain[4]?osMain[4]:"-"}</small>
          </div>
        </div>

      </div>
      <div class="delivery-info">
        <div class="info-header">
          <p>Frame Sizes</p>
          {/*<i class="fa-solid fa-pen pen"></i>*/}
        </div>
        {frameSize?<div class="del-info-wrapper">
          <div class="del-col">
            <p>HBox</p>
            <p>VBox</p>
            <p>DBL</p>
            <p>FH</p>
            <p>IPD</p>
          </div>
          <div class="del-col">
            <small>{frameSize[0]?frameSize[0]:'-'}</small>
            <small>{frameSize[1]?frameSize[1]:'-'}</small>
            <small>{frameSize[2]?frameSize[2]:'-'}</small>
            <small>{frameSize[3]?frameSize[3]:'-'}</small>
            <small>{frameSize[4]?frameSize[4]:'-'}</small>
          </div>
          <div class="del-col">
            <p>BVD</p>
            <p>PT</p>
            <p>FFA</p>
            <p>ED</p>
            <p>Base</p>
          </div>
          <div class="del-col">
            <small>{frameSize[5]?frameSize[5]:'-'}</small>
            <small>{frameSize[6]?frameSize[6]:'-'}</small>
            <small>{frameSize[7]?frameSize[7]:'-'}</small>
            <small>{frameSize[8]?frameSize[8]:'-'}</small>
            <small>{frameSize[9]?frameSize[9]:'-'}</small>
          </div>
        </div>:<></>}

        <div class="info-post">
        <p>Frame Type</p>
        <small>{content.frameType}</small>
      </div>
    </div>
    </div>
    )
}
export default OrderOptions