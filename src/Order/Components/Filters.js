import { useState } from "react";
import FilterGrid from "./FilterGrid";
import StyleSelect from "../../components/Button/AutoComplete";
import { notNull } from "../../env";

function OrderFilters(props) {
  const filters = props.filters;
  const brands =
    filters && filters.brands ? notNull(filters.brands, "title") : [];
  const cat = filters && filters.cats;
  const updateFilter = (kind, value) => {
    //console.log(kind ,value)
    props.setFilters((prevState) => ({
      ...prevState,
      [prevState[kind]]: value,
    }));
    props.appFilter
      ? props.setAppFilter((prevState) => ({
          ...prevState,
          [prevState[kind]]: value,
        }))
      : props.setAppFilter({ [kind]: value });
  };
  return (
    <div className="filter-sec">
      {props.grid ? (
        <div className="list-filter-wrapper">
          <div className="main-filters">
            <StyleSelect
              title={"برند"}
              direction={"rtl"}
              options={brands || []}
              label="title"
              class="f-company"
              action={(e) =>
                props.setAppFilter((prevState) => ({
                  ...prevState,
                  brand: e ? e.brandCode : "",
                }))
              }
            />
            <StyleSelect
              title={"دسته بندی"}
              direction={"rtl"}
              options={cat || []}
              label="title"
              class="f-company"
              action={(e) => {
                props.setAppFilter((prevState) => ({
                  ...prevState,
                  category: e ? e.catCode : "",
                }));
                props.setFilters((prevState) => ({
                  ...prevState,
                  category: e ? e.catCode : "",
                }));
              }}
            />
            <StyleSelect
              title={"زیر دسته بندی"}
              direction={"rtl"}
              options={
                props.filters && props.filters.category
                  ? props.filters.category.subCats
                  : []
              }
              label="title"
              class="f-company"
              action={(e) =>
                props.setFilters((prevState) => ({
                  ...prevState,
                  subCat: e,
                }))
              }
            />
          </div>
        </div>
      ) : (
        <>
          <FilterGrid
            setFilters={props.setFilters}
            setAppFilter={props.setAppFilter}
            brands={brands}
            cat={cat}
          />
          <div className="add-wrapper display-on">
            <img src="/img/business/ad-pic.jpg" alt="ad" />
          </div>
        </>
      )}
    </div>
  );
}
export default OrderFilters;
