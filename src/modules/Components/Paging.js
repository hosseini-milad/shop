import { PageInfoFunction } from "../../env";
import tabletrans from "../../translate/tables";
import Pagination from "material-ui-flat-pagination";

function Paging(props) {
  const Selected = props.Selected ? props.Selected : "25";
  const pageInfo =
    props.content && PageInfoFunction(props.content, props.filters);

  // Function to update URL with new page and page size
  const updateUrlWithPagination = (newOffset, newPageSize) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("offset", newOffset);
    if (newPageSize) {
      searchParams.set("pageSize", newPageSize);
    }
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };

  const setOffset = (value) => {
    var curPage = pageInfo && pageInfo.currentPage;
    var newPage = parseInt(curPage) + parseInt(value);
    props.setFilters((prevState) => ({
      ...prevState,
      offset: newPage,
    }));
  };
  return (
    <div className="order-list-footer">
      <div className="dense-btn">
        <input className="switch-input" type="checkbox" id="switch" />
        <label className="switch-label" htmlFor="switch"></label>
        <p></p>
      </div>
      <div className="per-page">
        <p>{tabletrans.rowsPerPage[props.lang.lang]}</p>
        <select
          name="page"
          id=""
          onChange={(e) => {
            const pageSize = e.target.value;
            props.setFilters((prevState) => ({
              ...prevState,
              pageSize: pageSize.toString(),
              offset: "0",
            }));
            props.updateUrlWithFilters({
              ...props.filters,
              pageSize: pageSize.toString(),
              offset: "0",
            });
          }}
        >
          <option value="5" selected={Selected=="5"?true:false}>
            5
          </option>
          <option value="10" selected={Selected=="10"?true:false}>
            10
          </option>
          <option value="25" selected={Selected=="25"?true:false}>
            25
          </option>
          <option value="50" selected={Selected=="50"?true:false}>
            50
          </option>
          <option value="100" selected={Selected=="100"?true:false}>
            100
          </option>
          <option value="500" selected={Selected=="500"?true:false}>
            500
          </option>
        </select>
      </div>
      {pageInfo && pageInfo.show ? (
        <div className="page-counter">
          <Pagination
            limit={parseInt(props.filters.pageSize) || 10}
            offset={parseInt(props.filters.offset) || 0}
            otherPageColor={"default"}
            currentPageColor={"primary"}
            total={props.size ? props.size : pageInfo.totalItem}
            onClick={(e, offset) => {
              props.setFilters((prevState) => ({
                ...prevState,
                offset: offset.toString(),
              }));
              props.updateUrlWithFilters({
                ...props.filters,
                offset: offset.toString(),
              });
            }}
          />
        </div>
      ) : (
        <div className="page-counter"></div>
      )}
    </div>
  );
}
export default Paging;
