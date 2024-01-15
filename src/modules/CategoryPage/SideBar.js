import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
  } from 'react-accessible-accordion';
  import 'react-accessible-accordion/dist/fancy-example.css';
import env, { filterToUrl, normalPrice, roundPrice, siteApi } from '../../env';
import simpleFetch from '../../components/simpleFetch';
import {Slider} from "material-ui-slider";
import { useState } from 'react';
import Select from 'react-select';

function SideBar(props){
    //console.log(props.brands)
    const preFilter = props.productQuery.filter;
    const preBrands = props.productQuery.brands;
    const pathUrl = window.location.pathname.split('/');
    
    var catPath = pathUrl[2]?("/"+pathUrl[2]):"";
    if(window.location.pathname.split('/')[1]=="brand")catPath=""
    var filtersList = preFilter;
    const[filterNum , setFilterNum] = useState([]);
    const cats = props.categories;
    var catName = '';
    for(var index = 0;index<cats.length;index++)
        if(cats[index].id == props.catId)
            {catName = cats[index].title;break;}
    const filters = props.filters
    //console.log(filters)
    const categories = props.categories;
    console.log(categories)
    var filterQuery =props.productQuery;
    //var filterQuery=`filter=${filterNum}&cat=${props.catId}&search=روغن`
    //const filters = ''
    const [priceFilter , setPriceFilter] = useState([0,filterQuery.max_price?filterQuery.max_price:1000000]);
    const [brand,setBrand]=useState('');
    const [car,setCar] = useState({carName:'',carId:''});
    //console.log(filterQuery)
    const handleInput=async(e)=>{
        console.log(e)
        const index = filterQuery.filter.indexOf(parseInt(e.target.value));
        if(index>-1)
            filterQuery.filter.splice(index,1)
        else filterQuery.filter.push(parseInt(e.target.value))
        window.location=`/category${catPath}?${filterToUrl(filterQuery)}`;
    }
    const handleBrand=async(e)=>{
        const index = filterQuery.brands.indexOf(parseInt(e.target.value));
        if(index>-1)
            filterQuery.brands.splice(index,1)
        else filterQuery.brands.push(parseInt(e.target.value))
        window.location=`/category${catPath}?${filterToUrl(filterQuery)}`;
    }
    var options = [];
    if(filters&&filters.filter[1])
        for(var indx = 0;indx<filters.filter[1].get_child.length;indx++)
            options.push(
                { value: filters.filter[1].get_child[indx].id, 
                  label: filters.filter[1].get_child[indx].title },
            )
        
    const setBrandFunction=(brand)=>{
        console.log(brand)
    }
    function valuetext(value) {
        return `${normalPrice(value)}`;
      }
      const handleSlider = (event, newValue) => {
        
        if(priceFilter.toString()!==event.toString()){
            setPriceFilter(event);
            filterQuery.max_price= event[1];
            setTimeout(()=>window.location=`/category${catPath}?${filterToUrl(filterQuery)}`,1000);
        }
       //props.setPriceFilter(newValue);
       //props.setIndex(0)
     };
    return(<>
    <h3>{categories&&categories.find(cat=>cat.ename===props.catId)
                   &&categories.find(cat=>cat.ename===props.catId).name}</h3>
    <h4>محصول</h4>
    {/*<span>روغن موتور</span>*/}
    {categories&&categories.map((categories,i)=>(
        //categories.products.length>2&&
        <div key={i}
            className={`filterCat ${categories.link===props.catId?'filterActive':'notActive'} `}>
                <a href={categories.parent||categories.link==="motor-oil"?
                `/category/${categories.link}`:
                `/category-landing/${categories.link}`}> 
                {categories.title}</a>
                
        </div>
    ))}
    <Accordion preExpanded={['0']} allowZeroExpanded>
    <AccordionItem uuid={'0'}>
                <AccordionItemHeading>
                    <AccordionItemButton >
                        مناسب برای
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="sideBarFilters">
                        {/*<select onChange={(e)=>setBrandFunction(this)}>
                            {filters&&filters.filter[1]&&
                            filters.filter[1].get_child.map(filter=>(
                            <option id={filter.id} value={filter.title}
                                    key={filter.id}>{filter.title}</option>))
                        }
                    </select>*/}
                    <Select
                        value={brand}
                        onChange={(value)=>{setBrand(value)}}
                        options={options}
                    />
                        <ul>{filters&&filters.filter[1]&&brand&&
                        filters.filter[1].get_child.find(record=>record.id===brand.value).get_child.map(brand=>(
                            <li key={brand.id}>
                            <input
                              type="checkbox"
                              name="address"
                              value={brand.id}
                              defaultChecked={filtersList.includes(brand.id)?true:false}
                              onChange={(e)=>handleInput(e)}
                          /><small className="filterValue">{brand.title} <i> </i></small>
                          </li>
                            ))}
                        </ul>
                    </div>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem uuid={'1'}>
                <AccordionItemHeading>
                    <AccordionItemButton >
                        ویسکوزیته
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="sideBarFilters">
                      <ul>
                          {filters&&filters.filter[0]&&filters.filter[0].get_child.map(filter=>(
                              <li key={filter.id}><input
                              type="checkbox"
                              name="address"
                              value={filter.id}
                              defaultChecked={filtersList.includes(filter.id)?true:false}
                              onChange={(e)=>handleInput(e)}
                          /><small className="filterValue">{filter.title} <i> </i></small></li>
                          ))}
                     
                    </ul>
                    </div>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem uuid={'2'}>
                <AccordionItemHeading>
                    <AccordionItemButton >
                        برند
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="sideBarFilters">
                      <ul>
                          {props.brands&&props.brands.map(brand=>(
                              <li key={brand.payload.id}><input
                              type="checkbox"
                              name="address"
                              value={brand.payload.id}
                              defaultChecked={preBrands.includes(brand.payload.id)?true:false}
                              onChange={(e)=>handleBrand(e)}
                          /><small className="filterValue">{brand.payload.title} <i> </i></small></li>
                          ))}
                     
                    </ul>
                    </div>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem uuid={'3'}>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        کاربرد
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                <div className="sideBarFilters">
                      <ul>
                          {filters&&filters.filter[2]&&filters.filter[2].get_child.map(filter=>(
                              <li key={filter.id}><input
                              type="checkbox"
                              name="address"
                              value={filter.id}
                              defaultChecked={filtersList.includes(filter.id)?true:false}
                              onChange={(e)=>handleInput(e)}
                          /><small className="filterValue">{filter.title} <i> </i></small></li>
                          ))}
                    </ul>
                    </div>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem uuid={'4'}>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        قیمت
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                <div className="sideBarFilters">
                    <sub>{normalPrice(priceFilter[0]) + ' ریال - '+normalPrice(priceFilter[1])+' ریال'}</sub>
                <Slider
                    getAriaLabel={() => 'Price range'}
                    defaultValue={[parseInt(priceFilter[0]),parseInt(priceFilter[1])]}
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
    </>)
}
export default SideBar