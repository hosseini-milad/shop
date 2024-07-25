import StyleInput from "../../components/Button/Input";
import StyleSelect from "../../components/Button/AutoComplete";
import tabletrans from "../../translate/tables";

function UserFilters(props) {

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
    <div className="user-filter">
      <StyleSelect
        title={tabletrans.role[props.lang.lang]}
        class="filterComponent"
        direction={props.lang.dir}
        options={props.options}
        action={(e) => handleFilterChange("profile", e)}
      />
      <StyleSelect
        title={tabletrans.profile[props.lang.lang]}
        class="filterComponent"
        direction={props.lang.dir}
        label="profileName"
        options={props.profiles}
        action={(e) => handleFilterChange("profile", e)}

      />
      <div className="serach-input">
        <StyleInput
          title={tabletrans.customer[props.lang.lang]}
          direction={props.lang.dir}
          action={(e) => handleFilterChange("customer", e)}

        />
        {/* <i className="tableIcon fas fa-ellipsis-v"></i> */}
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
  );
}
export default UserFilters;
