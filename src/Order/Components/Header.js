import StyleSelect from "../../components/Button/AutoComplete"
import env from "../../env";

function OrderHeader(props){
  const updateGrid=(value)=>{
    props.setGrid(value);
    var shopVar = JSON.parse(localStorage.getItem(env.shopExpert));
    shopVar?
    localStorage.setItem(env.shopExpert,JSON.stringify(
      {
        ...shopVar,
        grid:value
      })):
      localStorage.setItem(env.shopExpert,JSON.stringify(({
          grid:value
        })))
  }
    return(
<div className="nav-bar">
      <p>سفارشات</p>
        <StyleSelect title={"مشتری"} direction={"rtl"} 
              options={props.customer||[]} label="cName"
              class="f-customer" 
              action={(e)=>props.setFilters(prevState => ({
                ...prevState,
                customer:e
              }))}
              icon={<i className="fa-solid fa-plus" style={{margin: "0", color: "#000"}}></i>}
        />
        {/*<div className="f-customer">
        <input type="search" name="" id="f-search" placeholder="مشتری"/>
        <i className="fa-solid fa-plus" style={{margin: "0", color: "#000"}}></i>
            </div>*/}
      <div className="view-btn-wrapper">
        <label for="list-view"
        className={props.grid?"list-btn view-active":"list-btn"}
            onClick={()=>updateGrid(1)}>
            <i className="fa-solid fa-list no-font"></i></label>
        <input type="radio" name="view" id="list-view"/>
        <label for="tile-view" 
            className={props.grid?"tile-btn":"tile-btn view-active"}
            onClick={()=>updateGrid(0)}>
            <i className="fa-solid fa-table no-font"></i></label>
        <input type="radio" name="view" id="tile-view"/>
      </div>
      {/*<div className="f-customer-dropdpwn">
        <div className="menu-item">
          <p className="cu-name">علی صفدری</p>
          <p className="cu-address">پاسداران-کوچه سوم شرقی</p>
        </div>
        <div className="menu-item">
          <p className="cu-name">علی صفدری</p>
          <p className="cu-address">پاسداران-کوچه سوم شرقی</p>
        </div>
        <div className="menu-item">
          <p className="cu-name">علی صفدری</p>
          <p className="cu-address">پاسداران-کوچه سوم شرقی</p>
        </div>
        </div>*/}
    </div>
    )
}
export default OrderHeader