import { useState } from 'react';
import Cookies from 'universal-cookie';
import env from '../env';

import errortrans from "../translate/error";
import menutrans from '../translate/menuAccordion';

const Setting = (props)=>{
    const cookies = new Cookies();
    const [convas,setConvas] = useState(0)
    const token=cookies.get(env.cookieName)||1;
    const lang = props.lang;
    const logOff=()=>{
       cookies.remove(env.cookieName,{ path: '/' });
       setTimeout(()=>(document.location.reload(),500))
    }
    
    const checkAllow=(access)=>{
      if(token.access==="manager")return(1)
      
      return(0)
  }
    const settingMenu = menutrans.setting
    return(
      <div className={props.show?"fixed-plugin ps show":"fixed-plugin ps"}>
        <div className="setting card shadow-lg settingSide">
          <div className="main-setting">
            <div className="setting-container">
              <div className="setting-header">
                <div className="non-click-header">
                  <button className="btn btn-link text-dark p-0 fixed-plugin-close-button"
                    onClick={()=>props.setSetting(0)} style={{margin: "auto 0"}}>
                    <i className="blackIcon fas fa-close"></i>
                  </button>
                  <p>{errortrans.setting[lang]}</p>
                  <i className="fa-solid fa-magnifying-glass" style={{color: "#c0c0c0"}}></i>
                  <i className="fa-solid fa-x fa-lg" style={{color: "#c0c0c0"}}></i>
                </div>
                <div className="click-header">
                  <div className="setting-search-input">
                    <input type="search" placeholder="Search by Setup"/>
                    <i className="fa-solid fa-x fa-sm" style={{color: "#c0c0c0"}}></i>
                  </div>
                </div>
              </div>
              {checkAllow()&&settingMenu&&
                settingMenu.map((setting,i)=>(
                <div className="setting-wrapper" key={i}>
                <div className="setting-gp">
                  <a className="setting-gp-header" href={setting.href}>
                    <i className="fa-solid fa-sliders" style={{color: "#00caca"}}></i>
                    <h6>{setting[lang]}</h6>
                  </a>
                  {/*<div className="stting-gp-list">
                    <div className="setting-gp-member"><span className="dot"></span>Team URl</div>
                    <div className="setting-gp-member"><span className="dot"></span>Team Profile</div>
                    <div className="setting-gp-member"><span className="dot"></span>Team User</div>
                    <div className="setting-gp-member"><span className="dot"></span>Team OWner</div>
                  </div>*/}
                </div>
            </div>
              ))}
              
            </div>
          </div>
        </div>
      </div>
    )
}
export default Setting