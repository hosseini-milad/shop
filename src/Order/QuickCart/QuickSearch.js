import { useState } from "react"

function QuickSearch(){
    const [showDrop,setShowDrop] = useState(0)
    return(<>
        <div className="code-input-wrapper">
            <input className="dp-input" type="text" name="" id=""
            onFocus={()=>setShowDrop(1)}
            onBlur={()=>setShowDrop(0)}
            />
            <i className="fa-solid fa-angle-down"></i>
        </div>
        {showDrop?
        <div className="code-drop-menu">
            <div className="menu-item">
            <div className="item-img"><img src="/img/business/oil1.png" alt=""/></div>
            <div className="item-info">
                <div className="item-p">
                <p>روغن موتور ایرانول</p>
                <p>10W_40 12000</p>
                </div>
                <div className="item-amount">
                <p>F2569</p>
                <p>کارتن: 5</p>
                <p>تکی: 20</p>
                </div>

            </div>
            </div>
            <div className="menu-item">
            <div className="item-img"><img src="/img/business/oil1.png" alt=""/></div>
            <div className="item-info">
                <div className="item-p">
                <p>روغن موتور ایرانول</p>
                <p>10W_40 12000</p>
                </div>
                <div className="item-amount">
                <p>F2569</p>
                <p>کارتن: 5</p>
                <p>تکی: 20</p>
                </div>

            </div>
            </div>
            <div className="menu-item">
            <div className="item-img"><img src="/img/business/oil1.png" alt=""/></div>
            <div className="item-info">
                <div className="item-p">
                <p>روغن موتور ایرانول</p>
                <p>10W_40 12000</p>
                </div>
                <div className="item-amount">
                <p>F2569</p>
                <p>کارتن: 5</p>
                <p>تکی: 20</p>
                </div>

            </div>
            </div>
        </div>:<></>}
    </>
    )
}
export default QuickSearch