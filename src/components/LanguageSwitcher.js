import env from "../env";


function LanguageSwitcher(){
    const cLang = JSON.parse(localStorage.getItem(env.cookieLang))  
    
    const setLang=(lang,dir)=>{
        localStorage.setItem(env.cookieLang,JSON.stringify(
            {lang:lang,dir:dir}));
        window.scrollTo(0, 0);
        setTimeout(()=>window.location.reload(),200);
    }
    return(<>
        {cLang.lang==="persian"?<a className="nav-link"// text-white" 
            href="#" onClick={()=>setLang("english","ltr")}>English</a>:
        <a className="nav-link"// text-white" 
            href="#" onClick={()=>setLang("persian","rtl")}>فارسی</a>}
    </>)
}
export default LanguageSwitcher