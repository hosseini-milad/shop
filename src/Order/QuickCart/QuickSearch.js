import { useEffect, useState } from "react"
import env,{findBox} from "../../env"
import CountCalculator from "./CountCalculator"

function QuickSearch(props){
    const data = props.data
    const [showDrop,setShowDrop] = useState(0)
    const [query,setQuery] = useState('')
    useEffect(() => {
        const timeOutId = setTimeout(() => props.setSearch(query), 1000);
        return () => clearTimeout(timeOutId);
        //props.setSearch
      }, [query]);
    const [showCustomers,setShowCustomers] = useState(0)
    return(<>
        <div className="code-input-wrapper">
            <input className="dp-input" type="text" name="" id=""
                onChange={(e)=>setQuery(e.target.value)}
            onFocus={()=>setShowDrop(1)}
            //onClick={()=>setShowDrop(1)}
            //onBlur={()=>setTimeout(()=>setShowDrop(0),2000)}
            />
            <i className="fa-solid fa-angle-down"></i>
        </div>
        <div className="code-input-wrapper anbar-select">
            <select className="dp-input">
                <option value="">انبار1</option>
                <option value="">انبار3</option>
            </select>
            
        </div>
        {showDrop?
        <div className="code-drop-menu">
            {data?data.products&&data.products.map((item,i)=>(
               <CountCalculator item={item} setShowDrop={setShowDrop} 
               key={i} setSelectedItem={props.setSelectedItem} token={props.token}/>
            )):<div className="roader">{env.loader}</div>}
        </div>:<></>}
    </>
    )
}
export default QuickSearch