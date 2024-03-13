import StyleInput from "../../components/Button/Input"
import errortrans from "../../translate/error"

function FilterHeader(props){
  const content=props.content
    return(
      <div className="access-header">
        <a className="ps-back-btn" href="/filter">
          <i className="fa-solid fa-rotate-left" style={{color: "#c0c0c0"}}></i>
          <p>{errortrans.back[props.lang]}</p>
        </a>
        <div className="ps-title">
          <i className="fa-solid fa-certificate fa-sm" style={{color: "#00c6c6"}}></i>
          <div className="p-wrapper">
            <StyleInput title={errortrans.filterName[props.lang]} direction={props.direction} 
              defaultValue={content.title||''} class={"formInput"}
              action={(e)=>props.setFilterChange(prevState => ({
                ...prevState,
                title:e
              }))}/>
            {/*<p>by<span>ZohoSprints</span>on<span>09/Nov/2023</span></p>*/}
          </div>
          
          <StyleInput title={errortrans.filterCode[props.lang]} direction={props.direction} 
              defaultValue={content.enTitle||''} class={"formInput"}
              action={(e)=>props.setFilterChange(prevState => ({
                ...prevState,
                enTitle:e
              }))}/>
        </div>
        <div className={props.direction==="ltr"?"asso-btn":"asso-btn asso-btnRTL"}>
          <p>لیست کاربران</p>
        </div>
        <div className="help-btn">
          <i className="fa-regular fa-question" style={{color: "#c0c0c0"}}></i></div>
      </div>
    )
}
export default FilterHeader