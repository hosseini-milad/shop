import { useState } from "react"

function MenuItems(props){
    const url = props.domain
    const access=props.access
    const profile=props.profile
    const menu = props.menu
    const [showItem,setShowItem] = useState(1)
    const checkAllow=(submenu)=>{
        if(access==="manager")return(1)

        return(profile&&profile.find(item=>item.title===submenu['english']))
    }
    return(
        menu.children&&menu.children.length?
        <li className="nav-item mt-3">
            <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8"
                onClick={()=>setShowItem(showItem?0:1)}>
            {menu[props.lang.lang]}</h6>
            {showItem?menu.children.map((submenu,i)=>(
                checkAllow(submenu)&&
                <a className={url===submenu.url?"nav-link text-white active bg-gradient-primary"
                :"nav-link text-white"} href={submenu.href} key={i}>
                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className={`menuIcon fas ${submenu.icon}`}></i>
                    </div>
                    <span className="nav-link-text ms-1">{submenu[props.lang.lang]}</span>
                </a>
            )):<></>}
        </li>:
        <li className="nav-item">
            <a className={props.active?"nav-link text-white active bg-gradient-primary"
            :"nav-link text-white"} href={menu.href}>
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className={`menuIcon fas ${menu.icon}`}></i>
                </div>
                <span className="nav-link-text ms-1">{menu[props.lang.lang]}</span>
            </a>
        </li>
        
    )
}
export default MenuItems