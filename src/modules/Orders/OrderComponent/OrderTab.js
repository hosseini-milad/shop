import { useState } from "react"

function OrderTab(props){
    //const [tab,setTab] = useState(0)
    return(
      <nav className="slidemenu">

      <input type="radio" name="slideItem" id="slide-item-1" className="slide-toggle" checked />
      <label htmlFor="slide-item-1" onClick={()=>{props.setFilters(prevState => ({
                ...prevState, category:"Visitor"
              }));props.setTab(0)}} className={props.tab===0?"sliderMenuSelect":"sliderMenu"}>
        <span>ویزیتور</span>
        <div className="sliderMenu"></div>
      </label>

      <input type="radio" name="slideItem" id="slide-item-2" className="slide-toggle" />
      <label htmlFor="slide-item-2" onClick={()=>{props.setFilters(prevState => ({
                ...prevState, category:"Sale"
              }));props.setTab(1)}} className={props.tab===1?"sliderMenuSelect":""}>
        <span>فروشگاه مرکزی</span>
        <div className="sliderMenu"></div>
      </label>

      <input type="radio" name="slideItem" id="slide-item-3" className="slide-toggle" />
      <label htmlFor="slide-item-3" onClick={()=>{props.setFilters(prevState => ({
                ...prevState, category:"Invoice"
              }));props.setTab(2)}} 
        className={props.tab===2?"sliderMenuSelect":""}>
        <span>فاکتورها</span>
        <div className="sliderMenu"></div>
      </label>

      <input type="radio" name="slideItem" id="slide-item-4" className="slide-toggle" />
      <label htmlFor="slide-item-4" onClick={()=>{props.setFilters(prevState => ({
                ...prevState, category:"WebSite"
              }));props.setTab(3)}} 
        className={props.tab===3?"sliderMenuSelect":""}>
        <span>وب سایت</span>
        <div className="sliderMenu"></div>
      </label>

      {/*
      <div className="clear"></div>

      <div className="slider">
        <div className="bar" htmlFor="slide-item-5"></div>
    </div>*/}

    </nav>
    )
}
export default OrderTab