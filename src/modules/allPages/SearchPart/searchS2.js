//import FetchGraph from "../../../components/fetchGraph"
//import {BRAND_QUERY} from '../../../components/Query'

import SimpleFetch from "../../../components/simpleFetch";
import env, { siteApi, siteApiUrl } from "../../../env";

function SearchPhase2(props){
    var BRANDS = props.filters;
    //BRANDS = SimpleFetch(siteApi+env.filterListApi+"motor-oil");
    
    const handleBrand=(e,brands)=>{
        //console.log(e,brands)
        props.carHandler(brands.get_child);
        props.modelHandler(e)
        props.setStep(3);
    }
    return(<div className="searchPhase1 searchPhase2" style={{display:props.step}}>
            <ul className="brandPart">
                {BRANDS&&BRANDS.filter[1]&&BRANDS.filter[1].get_child.map(((brands,i)=>(
                    <li onClick={(e)=>handleBrand(e.target.parentNode,brands)
                    } key={i}>
                        <img src={env.siteUrl+"/images/brands/"+brands.title+".png"}/>
                        <span>{brands.title}</span>
                    </li>
                )))}
                
            </ul>
        </div>)
}
export default SearchPhase2