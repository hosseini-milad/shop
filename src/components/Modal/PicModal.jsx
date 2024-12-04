import { useState } from "react"

function PicModal(props){
  
    return(
    <div className="delete-modal">
      <div className="modal-backdrop show-modal">
          <div className="d-m-box" >
            <div className="d-m-content image-popup">
              <img src={props.imgurl} alt="img" />
              <i class="fa fa-times" aria-hidden="true" onClick={()=>props.close("")}></i>
            </div>
        </div>
      </div>
    </div>
    )
}
export default PicModal