
import { useState } from "react"
import FilterGrid from "./FilterGrid"
import StyleSelect from "../../components/Button/AutoComplete"

function OrderFilters(props){
  const [brands,setBrands]= useState([
    {title:"کاسپین",imageUrl:"/img/business/caspian-brand.png",enTitle:"Caspian"},
    {title:"بهران",imageUrl:"/img/business/bahran-brand.png",enTitle:"Caspian"},
    {title:"سرکان",imageUrl:"/img/business/serkan-brand.png",enTitle:"Caspian"},
    {title:"کسترول",imageUrl:"/img/business/castrol-brand.png",enTitle:"Caspian"}])
  const [cat,setCat] = useState([
      {title:"روغن موتور",imageUrl:"/img/business/car-oil.png",enTitle:"Caspian",
          subCats:[]},
      {title:"روان کننده موتور",imageUrl:"/img/business/car-lub.png",enTitle:"Caspian",
          subCats:[
              {title:"روغن صنعتی",imageUrl:"/img/business/oil-factory.png",enTitle:"Caspian"},
              {title:"روغن گیربکس",imageUrl:"/img/business/oil-trans.png",enTitle:"Caspian"},
              {title:"روغن ترمز",imageUrl:"/img/business/break-oil.png",enTitle:"Caspian"},
              {title:"گریس",imageUrl:"/img/business/greace.png",enTitle:"Caspian"}
          ]},
      {title:"محصولات جانبی",imageUrl:"/img/business/car-acc.png",enTitle:"Caspian",
          subCats:[
              {title:"فیلتر روغن",imageUrl:"/img/business/oil-filter.png",enTitle:"Caspian"},
              {title:"فیلتر هوا",imageUrl:"/img/business/air-filter.png",enTitle:"Caspian"},
              {title:"ضدیخ",imageUrl:"/img/business/antifreeze.png",enTitle:"Caspian"},
              {title:"شمع خودرو",imageUrl:"/img/business/car-spark.png",enTitle:"Caspian"}
          ]}
  ])
  console.log(props.filters)
    return(
    <div className="filter-sec">
      {props.grid?<div className="list-filter-wrapper">
        <div className="main-filters">
          <StyleSelect title={"برند"} direction={"rtl"} 
                options={brands||[]} label="title"
                class="f-company" 
                action={(e)=>props.setFilters(prevState => ({
                  ...prevState,
                  brand:e
                }))}
                
          />
          <StyleSelect title={"دسته بندی"} direction={"rtl"} 
                options={cat||[]} label="title"
                class="f-company" 
                action={(e)=>props.setFilters(prevState => ({
                  ...prevState,
                  category:e
                }))}
                
          />
          <StyleSelect title={"زیر دسته بندی"} direction={"rtl"} 
          options={(props.filters&&props.filters.category)?
            props.filters.category.subCats:[]} label="title"
          class="f-company" 
          action={(e)=>props.setFilters(prevState => ({
            ...prevState,
            subCat:e
          }))}
          
    />
        </div>
      </div>:
      <>
      <FilterGrid setFilters={props.setFilters}
      brands={brands} cat={cat}/>
      <div className="add-wrapper display-on">
        <img src="/img/business/ad-pic.jpg" alt="ad"/>
      </div></>}
    </div>
    )
}
export default OrderFilters