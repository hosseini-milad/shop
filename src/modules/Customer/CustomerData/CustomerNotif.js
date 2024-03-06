function CustomerNotif(){
    return(
        <div className="notif-page">
          <div className="notif-col">
            <div className="notif-title">
              <h5>Activity</h5>
              <p>Donec mi odio, faucibus at, scelerisque quis</p>
            </div>
            <div className="notif-box">
              <div className="notif-row">
                <p>Email me when someone comments onmy article</p>
                <div className="dense-btn">
                  <input className="switch-input" type="checkbox" id="switch-2" />
                  <label className="switch-label" htmlFor="switch-2">Toggle</label>
                </div>
              </div>
              <div className="notif-row">
                <p>Email me when someone answers on my form</p>
                <div className="dense-btn">
                  <input className="switch-input" type="checkbox" id="switch-3" />
                  <label className="switch-label" htmlFor="switch-3">Toggle</label>
                </div>
              </div>
              <div className="notif-row">
                <p>Email me hen someone follows me</p>
                <div className="dense-btn">
                  <input className="switch-input" type="checkbox" id="switch-4" />
                  <label className="switch-label" htmlFor="switch-4">Toggle</label>
                </div>
              </div>
            </div>
          </div>
          <div className="notif-col">
            <div className="notif-title">
              <h5>Application</h5>
              <p>Donec mi odio, faucibus at, scelerisque quis</p>
            </div>
            <div className="notif-box">
              <div className="notif-row">
                <p>News and announcements</p>
                <div className="dense-btn">
                  <input className="switch-input" type="checkbox" id="switch-5" />
                  <label className="switch-label" htmlFor="switch-5">Toggle</label>
                </div>

              </div>
              <div className="notif-row">
                <p>Weekly product updates</p>
                <div className="dense-btn">
                  <input className="switch-input" type="checkbox" id="switch-6" />
                  <label className="switch-label" htmlFor="switch-6">Toggle</label>
                </div>
              </div>
              <div className="notif-row">
                <p>Weekly blog digest</p>
                <div className="dense-btn">
                  <input className="switch-input" type="checkbox" id="switch-7" />
                  <label className="switch-label" htmlFor="switch-7">Toggle</label>
                </div>
              </div>
            </div>
          </div>
          <div className="save-btn">Save Changes</div>

        </div>
    )
}
export default CustomerNotif