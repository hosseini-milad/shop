import StyleInput from "../../components/Button/Input";
import tabletrans from "../../translate/tables";
import StyleDatePicker from "../../components/Button/DatePicker";


function VisitorFilter(props) {

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
          action={(e) => props.setFilters((prevState) => ({
            ...prevState,
            userId: e,
          }))}

        />
        <StyleDatePicker
          title={tabletrans.selectDate[props.lang.lang]}
          class="filterComponent"
          direction={props.lang.dir}
          local={props.lang.dir === "ltr" ? "en" : "fa"}
          action={(e) =>
            props.setFilters((prevState) => ({
              ...prevState,
              date: e,
            }))
          }
        />
      </div>
    </div>
  );
}
export default VisitorFilter;
