import env, { ScrollParams, ScrollThumb, ScrollTrack } from "../env";
import errortrans from "../translate/error";
import menutrans from "../translate/menuAccordion"
import Cookies from 'universal-cookie';
import React from "react";

import tabletrans from "../translate/tables";
import { Scrollbars } from 'react-custom-scrollbars';

import MenuItems from "./MenuItems";

function SideBarAccordion(props){
    const url = window.location.pathname.split('/')[1]
    const menuList = menutrans
    const cookies = new Cookies();
    const token=cookies.get(env.cookieName)
    const logOff=()=>{
        cookies.remove(env.cookieName,{ path: '/' });
       setTimeout(()=>(window.location.reload(),1000))
    }
    return(
        <aside className={
            `sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3
            ${props.lang.dir==="rtl"?" fixed-end me-3 rotate-caret bg-gradient-dark ps ps__rtl":
            " fixed-start ms-3  bg-gradient-dark"} ${props.MiniMenu?"":"mini-sidebar"}`}
            id="sidenav-main">
            <div className="sidenav-header">
            <i className="serviceIcon fas fa-close position-absolute end-0 top-0 "
            onClick={()=>props.setPinMenu(0)}/>
            {props.MiniMenu?<i onClick={()=>props.setMiniMenu(false)} className="fa-solid fa-caret-right mini-arrow"></i>:<i onClick={()=>props.setMiniMenu(true)} class="fa-solid fa-caret-left mini-arrow"></i>}
            <a className="navbar-brand m-0" href={menuList.title.href} target="_blank">
                <i className={`serviceIcon fas ${menuList.title.icon}`}></i>
                <span className="ms-1 font-weight-bold text-white">{menuList.title[props.lang.lang]}</span>
            </a>
            </div>
            <hr className="horizontal light mt-0 mb-2"/>
            <div className={`collapse navbar-collapse  w-auto 
                ${props.lang.dir==="rtl"?" ps ps__rtl ps--active-y":""}`} 
                id="sidenav-collapse-main">
            
            <Scrollbars
            renderView={(style,...props)=> 
                <div
                    className="box"
                    style={{...style}}
                    {...props}/>
            }
            renderThumbVertical={(style,...props)=> 
                <div
                    className="boxThumb"
                    style={{...style}}
                    {...props}/>
            }
            renderTrackVertical={(style,...props)=> 
                <div
                    className="boxTrack"
                    style={{...style}}
                    {...props}/>
            }
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}>
            <ul className="navbar-nav">
            
                {menuList?menuList.menu.map((menu,i)=>(
                    <MenuItems menu={menu} key={i} domain={url}
                    lang={props.lang} profile={token.profile}
                    access={token.access}/>
                )):''}
            
            </ul>
            </Scrollbars>
            {/*<div className="ps__rail-y" 
                style={{top: "23px", height: "188px", right: "0px"}}>
                <div className="ps__thumb-y" tabIndex="0" 
                style={{top: "8px", height: "72px"}}>

                </div>
                </div>*/}
            </div>
            <div className="sidenav-footer position-absolute w-100 bottom-0 ">
            <div className="mx-3">
                <a className="btn bg-gradient-primary w-100" href="#" 
                onClick={logOff} type="button">{errortrans.logOut[props.lang.lang]}</a>
            </div>
            </div>
        </aside>
    )
}
export default SideBarAccordion