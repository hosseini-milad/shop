import StyleInput from "../../components/Button/Input";
import tabletrans from "../../translate/tables";
import StyleSelect from "../../components/Button/AutoComplete";


function DUserFilters(props) {

  const handleFilterChange = (property, value) => {
    const newValue = value ? (value._id ? value._id : value) : "";
    props.setFilters((prevState) => ({
      ...prevState,
      [property]: newValue,
    }));
    // Update URL here
    props.updateUrlWithFilters({ ...props.currentFilters, [property]: newValue });
  };

  return (
    <div className="user-filter d-filter">
      <div className="serach-input">
        <StyleInput
          title={tabletrans.customer[props.lang.lang]}
          direction={props.lang.dir}
          action={(e) => handleFilterChange("customer", e)}

        />
        <StyleSelect
          title={"عملیات"}
          class="filterComponent"
          direction={props.lang.dir}
          label="title"
          options={[{title:"کوچیکتر",value:"-1"},{title:"برابر",value:"0"},{title:"بزرگتر",value:"1"}]}
          action={(e) => handleFilterChange("type", e.value)}
        />
        <StyleInput
          title={tabletrans.discount[props.lang.lang]}
          direction={props.lang.dir}
          action={(e) => handleFilterChange("discount", e)}

        />
        {/* <i className="tableIcon fas fa-ellipsis-v"></i> */}
      </div>
    </div>
  );
}
export default DUserFilters;
