import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import env, { filterToUrl, normalPrice, roundPrice, siteApi } from "../../env";
import simpleFetch from "../../components/simpleFetch";
import { Slider } from "material-ui-slider";
import { useState } from "react";
import Select from "react-select";
import CheckboxesTags from "./CheckboxesTags";

function SideBarNew(props) {
  //console.log(props.brands)
  const { FilterLists, setFilters, Filters } = props;
  const preFilter = props.productQuery.filter;
  const pathUrl = window.location.pathname.split("/");

  var catPath = pathUrl[2] ? "/" + pathUrl[2] : "";
  if (window.location.pathname.split("/")[1] == "brand") catPath = "";
  // var catName = "";
  // for (var index = 0; index < cats.length; index++)
  //   if (cats[index].id == props.catId) {
  //     catName = cats[index].title;
  //     break;
  //   }
  const filters = props.filters;

  // const categories = props.categories;

  var filterQuery = props.productQuery;
  //var filterQuery=`filter=${filterNum}&cat=${props.catId}&search=روغن`
  //const filters = ''
  const [priceFilter, setPriceFilter] = useState([
    0,
    filterQuery.max_price ? filterQuery.max_price : 1000000,
  ]);
  // const [brand, setBrand] = useState("");
  // const [car, setCar] = useState({ carName: "", carId: "" });
  //console.log(filterQuery)
  const handleFilters = async (param, e) => {
    console.log(e.target.value);
    // setFilters((prev) => ({ ...prev, [param]: e }));
  };
  // const handleInput = async (e) => {
  //   console.log(e);
  //   const index = filterQuery.filter.indexOf(parseInt(e.target.value));
  //   if (index > -1) filterQuery.filter.splice(index, 1);
  //   else filterQuery.filter.push(parseInt(e.target.value));
  //   window.location = `/category${catPath}?${filterToUrl(filterQuery)}`;
  // };
  // const handleBrand = async (e) => {
  //   const index = filterQuery.brands.indexOf(parseInt(e.target.value));
  //   if (index > -1) filterQuery.brands.splice(index, 1);
  //   else filterQuery.brands.push(parseInt(e.target.value));
  //   window.location = `/category${catPath}?${filterToUrl(filterQuery)}`;
  // };
  // var options = [];
  // if (filters && filters[1])
  //   for (var indx = 0; indx < filters[1].optionsP.length; indx++)
  //     options.push({
  //       value: filters[1].optionsP[indx].id,
  //       label: filters[1].optionsP[indx].title,
  //     });

  const setBrandFunction = (brand) => {
    console.log(brand);
  };
  function valuetext(value) {
    return `${normalPrice(value)}`;
  }
  const handleSlider = (event, newValue) => {
    if (priceFilter.toString() !== event.toString()) {
      setPriceFilter(event);
      filterQuery.max_price = event[1];
      setTimeout(
        () =>
          (window.location = `/category${catPath}?${filterToUrl(filterQuery)}`),
        1000
      );
    }
    //props.setPriceFilter(newValue);
    //props.setIndex(0)
  };
  return (
    <>
      <h4>فیلترها</h4>
      {FilterLists.category &&
        FilterLists.category.map((categories, i) => (
          //categories.products.length>2&&
          <div
            key={i}
            className={`filterCat ${
              categories.link === props.catId ? "filterActive" : "notActive"
            } `}
          >
            <a
              href={
                categories.parent || categories.link === "motor-oil"
                  ? `/category/${categories.link}`
                  : `/category-landing/${categories.link}`
              }
            >
              {categories.title}
            </a>
          </div>
        ))}
      <Accordion preExpanded={["0"]} allowZeroExpanded>
        {FilterLists.data &&
          FilterLists.data.map((filter, i) => (
            <AccordionItem uuid={i} key={i}>
              <AccordionItemHeading>
                <AccordionItemButton>{filter.title}</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="sideBarFilters">
                  <ul>
                    {/* {filter.optionsP.map((option, o) => (
                      <li key={o}>
                        <input
                          type="checkbox"
                          name="address"
                          value={option}
                          defaultChecked={
                            filtersList.includes(option) ? true : false
                          }
                          onChange={(e) => handleFilters(filter.enTitle, e)}
                        />
                        <small className="filterValue">
                          {option} <i> </i>
                        </small>
                      </li>
                    ))} */}

                    <CheckboxesTags
                      title={filter.title}
                      enTitle={filter.enTitle}
                      options={filter.optionsP}
                      setFilters={setFilters}
                      Filters={Filters}
                    />
                  </ul>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          ))}

        <AccordionItem
          uuid={FilterLists.data ? FilterLists.data.length + 1 : 1}
        >
          <AccordionItemHeading>
            <AccordionItemButton>برند</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className="sideBarFilters">
              <ul>
                {FilterLists.brands && (
                  <CheckboxesTags
                    title={"برند"}
                    param={"brandCode"}
                    enTitle={"brands"}
                    options={FilterLists.brands}
                    setFilters={setFilters}
                    Filters={Filters}
                  />
                )}
              </ul>
            </div>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem
          uuid={FilterLists.data ? FilterLists.data.length + 2 : 2}
        >
          <AccordionItemHeading>
            <AccordionItemButton>قیمت</AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div className="sideBarFilters">
              <sub>
                {normalPrice(priceFilter[0]) +
                  " ریال - " +
                  normalPrice(priceFilter[1]) +
                  " ریال"}
              </sub>
              <Slider
                getAriaLabel={() => "Price range"}
                defaultValue={[
                  parseInt(priceFilter[0]),
                  parseInt(priceFilter[1]),
                ]}
                scaleLength={50000}
                marks
                range={true}
                min={0}
                max={1000000}
                onChange={handleSlider}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>

      {/*<span>from:{roundPrice(priceFilter[0],10000)}
         - to:{roundPrice(priceFilter[1],10000)}</span>
    <a href={`/category?${filterQuery}`}>اعمال فیلتر</a>*/}
    </>
  );
}
export default SideBarNew;
