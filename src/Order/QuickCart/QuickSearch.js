import { useState } from "react"
import env from "../../env"

function QuickSearch(props){
    const data = props.data
    const [showDrop,setShowDrop] = useState(0)
    return(<>
        <div className="code-input-wrapper">
            <input className="dp-input" type="text" name="" id=""
                onChange={(e)=>props.setSearch(e.target.value)}
            onFocus={()=>setShowDrop(1)}
            onBlur={()=>setTimeout(()=>setShowDrop(0),200)}
            />
            <i className="fa-solid fa-angle-down"></i>
        </div>
        {showDrop?
        <div className="code-drop-menu">
            {data?data.products&&data.products.map((item,i)=>(
                <div className="menu-item" key={i}
                onClick={()=>props.setSelectedItem(item)}>
                    <div className="item-img">
                        <img src={env.siteApiUrl+item.thumbUrl} alt=""/>
                    </div>
                    <div className="item-info">
                        <div className="item-p">
                        <p>{item.title}</p>
                        </div>
                        <div className="item-amount">
                        <p>{item.sku}</p>
                        <p>کارتن: 5</p>
                        <p>تکی: 20</p>
                        </div>

                    </div>
                </div>
            )):<div className="roader">{env.loader}</div>}
        </div>:<></>}
    </>
    )
}
export default QuickSearch