import { PageInfoFunction } from "../../env"
import tabletrans from "../../translate/tables"
import Pagination from "material-ui-flat-pagination";

function Paging(props){
  const pageInfo = props.content&&PageInfoFunction(props.content,props.filters)
  
  console.log(pageInfo)
  const setOffset=(value)=>{
    var curPage = pageInfo&&pageInfo.currentPage
    var newPage = parseInt(curPage)+parseInt(value)
    props.setFilters(prevState => ({
      ...prevState,
      offset:newPage
    }))
  }
  return(
    <div className="order-list-footer">
      <div className="dense-btn">
        <input className="switch-input" type="checkbox" id="switch" />
        <label className="switch-label" htmlFor="switch"></label>
        <p></p>
      </div>
      <div className="per-page">
        <p>{tabletrans.rowsPerPage[props.lang.lang]}</p>
        <select name="page" id="" onChange={(e)=>props.setFilters(prevState => ({
            ...prevState,
            pageSize:e.target.value
          }))}>
          <option value="5">5</option>
          <option value="10" selected={true}>10</option>
          <option value="25">25</option>
        </select>
      </div>
      {pageInfo&&pageInfo.show?<div className="page-counter">
        {/*<p>{parseInt(pageInfo.currentPage)+1} / 
        {parseInt(pageInfo.totalPage)+1}</p>
        {pageInfo.allowPre?<i className="tableIcon fas fa-chevron-left" onClick={()=>setOffset(1)}></i>:
        <i className="disableIcon tableIcon fas fa-chevron-left"></i>}
        {pageInfo.allowNext?<i className="tableIcon fas fa-chevron-right" onClick={()=>setOffset(-1)}></i>:
        <i className="disableIcon tableIcon fas fa-chevron-right"></i>}
        */}
        <Pagination
                limit={props.filters.pageSize?props.filters.pageSize:10}
                offset={props.filters.offset?props.filters.offset:0}
                otherPageColor={"default"}
                currentPageColor={"primary"}
                total={pageInfo.totalItem}
                onClick={(e, offset) => props.setFilters(prevState => ({
                  ...prevState,
                  offset:offset
                }))}
                />

      </div>:<div className="page-counter"></div>}
    </div>
)
}
export default Paging