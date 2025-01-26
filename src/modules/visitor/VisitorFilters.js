import StyleSelect from "../../components/Button/AutoComplete";
import tabletrans from "../../translate/tables";
import StyleDatePicker from "../../components/Button/DatePicker";
import StyleInput from "../../components/Button/Input";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import env from "../../env";

function VisitorFilter(props) {
  const brandOptions = props.brandOptions;
  const VisitorOption = props.VisitorOption;
  const visitorId = props.visitorid;
  const [userOptions, setUserOptions] = useState();
  const [userSearch, setUserSearch] = useState();
  const [ProductSearch, setProductSearch] = useState("");
  const [ProductList, setProductList] = useState();
  const token = props.token;
  console.log(ProductSearch);

  const handleFilterChange = (property, value) => {
    const newValue = value ? (value._id ? value._id : value) : "";
    props.setFilters((prevState) => ({
      ...prevState,
      [property]: newValue,
    }));
    // Update URL here
    props.updateUrlWithFilters({
      ...props.currentFilters,
      [property]: newValue,
    });
  };
  useEffect(() => {
    if (!userSearch || userSearch.length < 4) return;
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({ customer: userSearch }),
    };
    //console.log(postOptions);
    fetch(env.siteApi + "/panel/user/list-customers", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setUserOptions(result.filter);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [userSearch]);
  useEffect(() => {
    if (!ProductSearch) return;
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({ name: ProductSearch }),
    };
    //console.log(postOptions);
    fetch(env.siteApi + "/panel/product/fetch-name", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setProductList(result.list);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [ProductSearch]);

  return (
    <div className="user-filter d-filter">
      <div className="serach-input">
        {/* <StyleInput
          title={tabletrans.productTitle[props.lang.lang]}
          direction={props.lang.dir}
          action={createConditionalAction(3)}
        /> */}
        <div class="formInput" style={{ width: "50%" }}>
          <Autocomplete
            multiple
            options={ProductList || []}
            getOptionLabel={(item) => item.title || ""}
            //value={colorList.cover.find(item=>item.option===extraData.coverCode)||null}
            style={{ width: "100%" }}
            // defaultValue={userData.StockArr}
            onChange={(e, value) =>
              props.setFilters((prevState) => ({
                ...prevState,
                productsList: value ? value : "",
              }))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={tabletrans.productTitle[props.lang.lang]}
                variant="outlined"
                onChange={(e) => setProductSearch(e.target.value)}
              />
            )}
          />
        </div>
        <StyleSelect
          title={tabletrans.visitor[props.lang.lang]}
          direction={props.lang.dir}
          options={VisitorOption}
          label="username"
          action={(e) => visitorId(e ? e._id : "")}
        />
        {/* <StyleSelect
          title={tabletrans.customer[props.lang.lang]}
          direction={props.lang.dir} options={userOptions}
          label="username"
          textChange={(e)=>setUserSearch(e)}
          action={(e) => props.setFilters((prevState) => ({
            ...prevState,
            userId: e,
          }))}

        /> */}
        <StyleSelect
          title={tabletrans.brand[props.lang.lang]}
          direction={props.lang.dir}
          options={brandOptions}
          label="title"
          action={(e) =>
            props.setFilters((prevState) => ({
              ...prevState,
              brand: e ? e.brandCode : "",
            }))
          }
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
