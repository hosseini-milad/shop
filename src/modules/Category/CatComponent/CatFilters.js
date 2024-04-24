import StyleInput from "../../../components/Button/Input"
import StyleSelect from "../../../components/Button/AutoComplete"
import StyleDatePicker from "../../../components/Button/DatePicker"
import tabletrans from "../../../translate/tables"
import { useState } from "react"

function OrderFilters(props){
    return(
        <div className="user-filter">
            
          <div className="serach-input">
            <StyleInput title={"عنوان دسته"} direction={props.lang.dir} 
            action={(e)=>(e.length>7||e.length===0)&&props.setFilters(prevState => ({
              ...prevState,
              orderNo:e
            }))}/>

            <i className="tableIcon fas fa-ellipsis-v"></i>
          </div>
          <div className="option-sub">
            <div className="option">
              <i className="fa-solid fa-print fa-sm"></i>
              <p>Print</p>
            </div>
            <div className="option">
              <i className="fa-solid fa-file-import fa-sm"></i>
              <p>Import</p>
            </div>
            <div className="option">
              <i className="fa-solid fa-file-export fa-sm"></i>
              <p>Export</p>
            </div>
          </div>
        </div>
    )
}
export default OrderFilters