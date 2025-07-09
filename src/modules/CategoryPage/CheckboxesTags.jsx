import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function CheckboxesTags(props) {
  const { enTitle, options, Filters, setFilters, title } = props;
  console.log(Filters);
  const uniqueOptions = Array.from(new Set(options));
  return (
    <Autocomplete
      sx={{ width: "100%", direction: "rtl" }}
      multiple
      id="tags-outlined"
      options={uniqueOptions}
      filterSelectedOptions
      getOptionLabel={(option) =>
        typeof option === "object" && option !== null ? option.title : option
      }
      // value={Filters[filterDetail.enTitle] || []}
      onChange={(event, newValue) => {
        setFilters({
          ...Filters,
          [enTitle]: props.param
            ? newValue.map((item) => item[props.param])
            : newValue,
        });
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          // label={filterDetail.title}
          placeholder={title}
        />
      )}
    />
  );
}
