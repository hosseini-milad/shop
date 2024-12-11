import { useState } from "react"

function OrderTab(props){
    
    return(
      <nav className="slidemenu">
        {props.TabList&&props.TabList.map((tabItem,i)=>(
          <>
            <input type="radio" name="slideItem" id={`slide-item-${i+1}`} className="slide-toggle"/>
            <label htmlFor={`slide-item-${i+1}`} onClick={()=>{props.setFilters(prevState => ({
                      ...prevState,category:tabItem.type
                    }));props.setTab(i)}} className={props.tab===i?"sliderMenuSelect":"sliderMenu"}>
              <span>{tabItem.title}</span>
              <div className="sliderMenu"></div>
            </label>
          </>
        ))}
      {/* <input type="radio" name="slideItem" id="slide-item-1" className="slide-toggle" checked />
      <label htmlFor="slide-item-1" onClick={()=>{props.setFilters(prevState => ({
                ...prevState, category:"Visitor",manage:"333sina"
              }));props.setTab(0)}} className={props.tab===0?"sliderMenuSelect":"sliderMenu"}>
        <span>ویزیتور</span>
        <div className="sliderMenu"></div>
      </label>

      <input type="radio" name="slideItem" id="slide-item-2" className="slide-toggle" />
      <label htmlFor="slide-item-2" onClick={()=>{props.setFilters(prevState => ({
                ...prevState, category:"Sale" ,manage:"zohre"
              }));props.setTab(1)}} className={props.tab===1?"sliderMenuSelect":""}>
        <span>فروشگاه زهره</span>
        <div className="sliderMenu"></div>
      </label>

      <input type="radio" name="slideItem" id="slide-item-3" className="slide-toggle" />
      <label htmlFor="slide-item-3" onClick={()=>{props.setFilters(prevState => ({
                ...prevState, category:"Sale",manage:"hesarak"
              }));props.setTab(2)}} 
        className={props.tab===2?"sliderMenuSelect":""}>
        <span>فروشگاه حصارک</span>
        <div className="sliderMenu"></div>
      </label>
      <input type="radio" name="slideItem" id="slide-item-3" className="slide-toggle" />
      <label htmlFor="slide-item-3" onClick={()=>{props.setFilters(prevState => ({
                ...prevState, category:"Sale",manage:"markazi"
              }));props.setTab(3)}} 
        className={props.tab===3?"sliderMenuSelect":""}>
        <span>فروشگاه مرکزی</span>
        <div className="sliderMenu"></div>
      </label>

      <input type="radio" name="slideItem" id="slide-item-4" className="slide-toggle" />
      <label htmlFor="slide-item-4" onClick={()=>{props.setFilters(prevState => ({
                ...prevState, category:"WebSite"
              }));props.setTab(4)}} 
        className={props.tab===4?"sliderMenuSelect":""}>
        <span>وب سایت</span>
        <div className="sliderMenu"></div>
      </label> */}

      

    </nav>
    )
}
export default OrderTab