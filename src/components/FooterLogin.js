import LanguageSwitcher from "./LanguageSwitcher"

const FooterLogin = (props)=>{
    
    return(
        <footer className="footer position-absolute bottom-2 py-2 w-100">
              <div className="container">
                <div className="row align-items-center justify-content-lg-between">
                  <div className="col-12 col-md-6 my-auto">
                    <div className="copyright text-center text-sm text-white text-lg-start">
                      © 2023,
                      made by
                      <a href="https://dkmehr.com" className="font-weight-bold text-white" target="_blank"> DKMehr </a>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                      <li className="nav-item">
                        <a href="https://dkmehr.com" className="nav-link text-white" target="_blank">DKMehr</a>
                      </li>
                      <li className="nav-item">
                        <a href="https://dkmehr.com/about" className="nav-link text-white" target="_blank">About Us</a>
                      </li>
                      <li className="nav-item">
                        <a href="https://dkmehr.com/blog" className="nav-link text-white" target="_blank">Blog</a>
                      </li>
                      <li className="nav-item">
                        <LanguageSwitcher theme="dark"/>
                      </li>
                    </ul>
                  </div>
                  
                </div>
              </div>
            </footer>
    )
}
export default FooterLogin