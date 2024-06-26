import { useState } from "react";
import Footer from "./Footer"
import Header from "./Header"
import HeaderLogin from "./HeaderLogin";
import SideBar from "./SideBar";
import env from "../env";
import SideBarAccordion from "./SideBarAccordion";
const lang = JSON.parse(localStorage.getItem(env.cookieLang));

function Layout(props){
    const [pinMenu,setPinMenu] = useState(0)
    const [MiniMenu,setMiniMenu] = useState(true)
    return(
        <div className={`holder g-sidenav-show bg-gray-200 ${pinMenu?" g-sidenav-pinned":""}
        ${lang.dir==="rtl"?" rtl":""}`}>
            <SideBarAccordion setPinMenu={setPinMenu} lang={lang} setMiniMenu={setMiniMenu} MiniMenu={MiniMenu}/>
            <main className={`main-content position-relative h-100 border-radius-lg main-pad ${MiniMenu?"":"wide-main"}` }>{/* ps ps--active-y">*/}
                <Header lang={lang} setPinMenu={setPinMenu} pinMenu={pinMenu} />
                {props.children}
                <Footer class="footer py-2 w-100"/>
            </main>
        </div>
    )
}
export default Layout