import { useState } from "react"

function OrderTab(props){
    const [tab,setTab] = useState(0)
    return(
      <nav className="slidemenu">

      <input type="radio" name="slideItem" id="slide-item-1" className="slide-toggle" checked />
      <label htmlFor="slide-item-1" onClick={()=>{props.setFilters(prevState => ({
                ...prevState, category:"RX"
              }));setTab(0)}} className={tab===0?"sliderMenuSelect":"sliderMenu"}>
        <span>RX</span>
        <div className="sliderMenu"></div>
      </label>

      <input type="radio" name="slideItem" id="slide-item-2" className="slide-toggle" />
      <label htmlFor="slide-item-2" onClick={()=>{props.setFilters(prevState => ({
                ...prevState, category:"Stock"
              }));setTab(1)}} className={tab===1?"sliderMenuSelect":""}>
        <span>Stock</span>
        <div className="sliderMenu"></div>
      </label>

      <input type="radio" name="slideItem" id="slide-item-3" className="slide-toggle" />
      <label htmlFor="slide-item-3"
        className={tab===2?"sliderMenuSelect":""}>
        <span>Frame</span>
      </label>

      <input type="radio" name="slideItem" id="slide-item-4" className="slide-toggle" />
      <label htmlFor="slide-item-4">
        <span>Lens</span>
      </label>

      <input type="radio" name="slideItem" id="slide-item-5" className="slide-toggle" />
      <label htmlFor="slide-item-5" className="">
        <span>Services</span>
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