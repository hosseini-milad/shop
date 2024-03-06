function CustomerSocial(){
    return(
        <div className="social-page">
          <div className="social-wrapper">
            <div className="social-input"><i className="fa-brands fa-facebook-f fa-lg"></i>
                <input type="text"
                value="https://www.facebook.com/caitlyn.kerluke" name="facebook" id=""/></div>
            <div className="social-input"><i className="fa-brands fa-instagram fa-lg"></i>
                <input type="text"
                value="https://www.instagram.com/caitlyn.kerluke" name="instagram" id=""/></div>
            <div className="social-input"><i className="fa-brands fa-linkedin fa-lg"></i>
            <input type="text"
                value="https://www.linkedin.com/in/caitlyn.kerluke" name="linkedin" id=""/></div>
            <div className="social-input"><i className="fa-brands fa-twitter fa-lg"></i>
            <input type="text"
                value="https://www.twitter.com/caitlyn.kerluke" name="twitter" id=""/></div>
          </div>
          <div className="save-btn">Save Changes</div>

        </div>
    )
}
export default CustomerSocial