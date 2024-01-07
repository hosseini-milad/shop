import { TextField } from "@material-ui/core"
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState } from "react";
import { filterToUrl } from "../../env";
 
function FilterPart(props){
    //const url = document.location.href.split("/")[2];
    const filterQuery = props.productQuery
    const cats = ''//props.catName.data.categories;
    {/*{title:" نزولی",id:23},
    {title:" صعودی",id:26},*/}
    var options = [
        {title:"پرفروش ترین",id:22},
    
        {title:"ارزانترین",id:24},
        {title:"گرانترین",id:25},];
    var catName = ''
    const [filter,setFilter]=useState('');
    for(var index = 0;index<cats.length;index++)
        if(cats[index].payload.id == props.catId)
            {
                catName = cats[index].payload.title;
                break;
            }
    //console.log(filterQuery.sortby,options.find(item=>item.id == filterQuery.sortby))
    const handleInput=()=>{
        console.log("change")
    }
    const changeOption=async(e)=>{
        filterQuery.sortby=e.id;
        
        console.log(filterQuery)
        window.location=`?${filterToUrl(filterQuery)}`;
    }
    return(
    <div className="resultFilter">
        <div className="resultCount">{catName}</div>
        <div className="filterSortBy">
        
        <Autocomplete
            disableClearable freeSolo
            options={options||[]}
            getOptionLabel={option => option.title||null}
            style={{ width: 200}}
            defaultValue={filterQuery.sortby?
                options.find(item=>item.id == filterQuery.sortby):{title:"پرفروش ترین",id:25}}
            onChange={(_event, Sort)=>changeOption(Sort)}
            renderInput={(params) =>
            <TextField {...params}   standard />}
            />
            <div className="filterButtons">
                <a className="filterBtn categoryFilterButton" onClick={(e)=>handleInput(e)}>
                    <i className="fas fa-filter"></i> فیلتر
                </a>
            </div>
        </div>
        
        </div>
        )
}
export default FilterPart