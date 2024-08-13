import { useState } from "react";
import env from "../../env";

function FilterGrid(props) {
  const cat = props.cat;
  const brands = props.brands;
  const [subCat, setSubCat] = useState();
  const [brandIndex, setBrandIndex] = useState(-1);
  const [catIndex, setCatIndex] = useState(-1);
  const [subIndex, setSubIndex] = useState(-1);

  const updateBrand = (brand, index) => {
    if (brandIndex === index) {
      setBrandIndex(-1);
      props.setFilters((prevState) => ({
        ...prevState,
        brand: "",
      }));

      props.setAppFilter((prevState) => ({
        ...prevState,
        brand: "",
      }));
    } else {
      setBrandIndex(index);
      setCatIndex(-1);
      setSubIndex(-1);
      props.setFilters((prevState) => ({
        ...prevState,
        brand: brand,
      }));
      props.setAppFilter((prevState) => ({
        ...prevState,
        brand: brand ? brand.brandCode : "",
      }));
    }

    props.setFilters((prevState) => ({
      ...prevState,
      category: "",
    }));

    props.setFilters((prevState) => ({
      ...prevState,
      subCategory: "",
    }));
    props.setAppFilter((prevState) => ({
      ...prevState,
      category: "",
    }));

    props.setAppFilter((prevState) => ({
      ...prevState,
      subCategory: "",
    }));
  };
  const updateCategory = (category, index) => {
    if (catIndex === index) {
      setSubIndex(-1);
      setCatIndex(-1);
      setSubCat("");
      props.setFilters((prevState) => ({
        ...prevState,
        category: "",
      }));

      props.setAppFilter((prevState) => ({
        ...prevState,
        category: "",
      }));
    } else {
      setCatIndex(index);
      setSubCat(category);
      props.setFilters((prevState) => ({
        ...prevState,
        category: category,
      }));

      props.setAppFilter((prevState) => ({
        ...prevState,
        category: category ? category.catCode : "",
      }));
    }

    props.setFilters((prevState) => ({
      ...prevState,
      subCategory: "",
    }));
    props.setAppFilter((prevState) => ({
      ...prevState,
      subCategory: "",
    }));
  };
  const updateSubCategory = (subCategory, index) => {
    if (subIndex === index) {
      setSubIndex(-1);
      props.setFilters((prevState) => ({
        ...prevState,
        subCategory: subCategory,
      }));
      props.setAppFilter((prevState) => ({
        ...prevState,
        subCategory: "",
      }));
    } else {
      setSubIndex(index);
      props.setFilters((prevState) => ({
        ...prevState,
        subCategory: subCategory,
      }));

      props.setAppFilter((prevState) => ({
        ...prevState,
        subCategory: subCategory ? subCategory.catCode : "",
      }));
    }
  };
  return (
    <div className="tile-filter-wrapper">
      <div className="product-filter-tile-wrapper">
        {brands &&
          brands.map((brand, i) => (
            <div
              className={
                brandIndex === i
                  ? "filter-tile main-filter-btn oil-btn tile-active"
                  : "filter-tile main-filter-btn oil-btn"
              }
              key={i}
              onClick={() => updateBrand(brand, i)}
            >
              <img src={env.siteApiUrl + brand.brandUrl} alt={brand.enTitle} />
              <p>{brand.title}</p>
            </div>
          ))}
      </div>
      <div className="product-filter-tile-wrapper">
        {cat &&
          cat.map((category, i) => (
            <div
              className={
                catIndex === i
                  ? "filter-tile main-filter-btn oil-btn tile-active"
                  : "filter-tile main-filter-btn oil-btn"
              }
              key={i}
              onClick={() => updateCategory(category, i)}
            >
              <img
                src={env.siteApiUrl + category.iconUrl}
                alt={category.link}
              />
              <p>{category.title}</p>
            </div>
          ))}
      </div>
      <div className="product-filter-tile-wrapper">
        {subCat &&
          subCat.children &&
          subCat.children.map((subCat, i) => (
            <div
              className={
                subIndex === i
                  ? "filter-tile acc-filter tile-active"
                  : "filter-tile acc-filter"
              }
              key={i}
              onClick={() => updateSubCategory(subCat, i)}
            >
              <img src={env.siteApiUrl + subCat.iconUrl} alt={subCat.link} />
              <p>{subCat.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
export default FilterGrid;
