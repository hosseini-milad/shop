import HeaderLogin from "./HeaderLogin";
import Footer from "./Footer";
import env from "../env";
const lang = JSON.parse(localStorage.getItem(env.cookieLang));

function LayoutLogin(props){
    
    return(
        <>
            {/*<HeaderLogin lang={lang}/>*/}
            {props.children}
            <Footer class="footer py-2 w-100 text-white footerFix"/>
        </>
    )
}
export default LayoutLogin