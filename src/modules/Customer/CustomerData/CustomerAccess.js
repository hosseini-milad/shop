function UserAccess(){
    return(
    <div className="profile-setting">
      <div className="ps-header">
        <div className="ps-back-btn">
          <i className="fa-solid fa-rotate-left" style={{color: "#c0c0c0"}}></i>
          <p>Back</p>
        </div>
        <div className="ps-title">
          <i className="fa-solid fa-certificate fa-sm" style={{color: "#00c6c6"}}></i>
          <div className="p-wrapper">
            <p>Vendor <span>(vendor Type)</span><span style={{cursor: "pointer"}}><i
                  className="fa-regular fa-pen-to-square fa-sm" style={{color: "#c0c0c0"}}></i></span></p>
            <p>by<span>ZohoSprints</span>on<span>09/Nov/2023</span></p>
          </div>
        </div>
        <div className="asso-btn asso-btn-rtl">
          <p>Associate Users</p>
        </div>
        <div className="help-btn"><i className="fa fa-question-circle" style={{color: "#c0c0c0"}}></i></div>
      </div>
      <div className="container">
        <div className="ps-section">
          <div className="section-header">
            <i className="fa-solid fa-sliders" style={{color: "#c0c0c0"}}></i>
            <div className="section-title">
              <p>Org Permissions <span><i className="fa-solid fa-sort-down fa-sm"></i></span></p>
              <p>This section belongs to Team Profile</p>
            </div>
          </div>
          <div className="section-wrapper">
            <div className="section-member">
              <p>Manage Team Settings</p>
              <div className="dense-btn">
                <input className="switch-input" type="checkbox" id="switch-1" />
                <label className="switch-label" for="switch-1"></label>
              </div>
            </div>
            <div className="section-member">
              <p>Manage Automations</p>
              <div className="dense-btn">
                <input className="switch-input" type="checkbox" id="switch-2" />
                <label className="switch-label" for="switch-2"></label>
              </div>
            </div>
            <div className="section-member">
              <p>Manage Project Group</p>
              <div className="dense-btn">
                <input className="switch-input" type="checkbox" id="switch-3" />
                <label className="switch-label" for="switch-3"></label>
              </div>
            </div>
            <div className="section-member">
              <p>View/Create Project Template</p>
              <div className="dense-btn">
                <input className="switch-input" type="checkbox" id="switch-4" />
                <label className="switch-label" for="switch-4"></label>
              </div>
            </div>
            <div className="section-member">
              <p>Manage Roles and Profiles</p>
              <div className="dense-btn">
                <input className="switch-input" type="checkbox" id="switch-5" />
                <label className="switch-label" for="switch-5"></label>
              </div>
            </div>
            <div className="section-member">
              <p>Manage User Groups</p>
              <div className="dense-btn">
                <input className="switch-input" type="checkbox" id="switch-6" />
                <label className="switch-label" for="switch-6"></label>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="ps-btn-wrapper">
        <div className="save-btn">
          <p>Save</p>
        </div>
        <div className="cancel-btn">
          <p>Cancel</p>
        </div>
      </div>
    </div>
    )
}
export default UserAccess