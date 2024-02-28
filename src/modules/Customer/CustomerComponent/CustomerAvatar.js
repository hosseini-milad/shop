import StyleInput from "../../../components/Button/Input"
import StyleSelect from "../../../components/Button/AutoComplete"

function CustomerAvatar(props){
    return(
      <div className="avatar-box">
      <div className="customer-photo">
        <input type="file" name="customer photo" id="cu-photo"/>
        <label htmlFor="cu-photo">
          <div className="label-hover">
            <i className="fa-solid fa-camera-retro fa" style={{color: "#ffffff"}}></i>
            <p>Update Photo</p>
          </div>
        </label>
      </div>
      <p className="p-allow">Allowed *.jpeg, *.jpg, *.png, *.gif <br/> max size of 3.1 MB</p>
      <div className="public-btn">
        <p>Public Profile</p>
        <div className="dense-btn">
          <input className="switch-input" type="checkbox" id="switch" />
        </div>
      </div>
      <div className="delete-user-btn">Delete User</div>
    </div>
    )
}
export default CustomerAvatar