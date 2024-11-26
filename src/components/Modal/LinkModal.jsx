import { useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import env from "../../env"
function LinkModal(props){
  
  const [CopyStatus,setCopyStatus] = useState("")
  const onCopyText = () => {

    setCopyStatus(true);

    setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds

  };
    return(
    <div className="delete-modal">
      <div className="modal-backdrop show-modal">
          <div className="d-m-box link-box">
            <div className="d-m-header">
              <h4>لینک موقت</h4>
              <i class="fa fa-times" aria-hidden="true" onClick={()=>props.setLinkShare("")}></i>
            </div>
            <div className="d-m-content">
              <p className="popTitle">{"https://panel.sharifoilco.com"+props.LinkShare}</p>
              <CopyToClipboard text={"https://panel.sharifoilco.com"+props.LinkShare} onCopy={onCopyText}>
                <div className="btn-wrappper">
                  <button className="del-btn">کپی</button>
                </div>
              </CopyToClipboard>
              {CopyStatus&&<p>لینک کپی شد</p>}
            </div>
        </div>
      </div>
    </div>
    )
}
export default LinkModal