import StyleInput from "../../../components/Button/Input"
import StyleSelect from "../../../components/Button/AutoComplete"

function CustomerFilters(props){
    return(
        <div className="user-filter">
            <StyleSelect title={"نقش"} class="filterComponent" direction={props.lang.dir}
            options={props.options} 
            action={(e)=>props.setFilters(prevState => ({
              ...prevState,
              access:e
            }))}/>
          <div className="serach-input">
            <StyleInput title={"مشتری"} direction={props.lang.dir} 
            action={(e)=>(e.length>3||e.length===0)&&props.setFilters(prevState => ({
              ...prevState,
              customer:e
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
export default CustomerFilters