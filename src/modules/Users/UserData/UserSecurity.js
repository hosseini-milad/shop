function UserSecurity(){
    return(
        <div className="sec-page">
          <div className="password-wrapper">
            <div className="pass-input"><label htmlFor="old-pass">Old Password</label>
            <input value="demo1234" type="password"
                name="" id="old-pass"/><i className="fa-regular fa-eye fa-sm"></i></div>
            <div className="pass-input"><label htmlFor="new-pass">New Password</label>
            <input type="password" name=""
                id="new-pass"/><i className="fa-regular fa-eye fa-sm"></i></div>
            <p> Password must be minimum 6+</p>
            <div className="pass-input"><label htmlFor="confrim-pass">Confrim Password</label>
                <input type="password" name=""
                id="confrim-pass"/><i className="fa-regular fa-eye fa-sm"></i></div>
          </div>
          <div className="save-btn">Save Changes</div>

        </div>
    )
}
export default UserSecurity