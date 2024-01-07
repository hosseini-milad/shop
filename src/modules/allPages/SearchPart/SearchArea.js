import { useState } from "react";
import SearchPList from "./searchPList";
import SearchPhase1 from "./searchS1";
import SearchPhase2 from "./searchS2";
import SearchPhase3 from "./searchS3";
//const { default: SearchPhase1 } = require();

function SearchArea(){
    const[vehicleKind, setVehicle] = useState(0);
    const[modelKind , setModel] = useState(0);
    const[carName,setCarName] = useState(0);
    const[oilKind , setOilKind] = useState(0);
    const[directSearch,setDirectSearch] = useState(0)
    return(
        <>
            <SearchPhase1 vehicleHandler={setVehicle} directHandler={setDirectSearch}/>
            {!directSearch&&vehicleKind !== 0&&modelKind === 0&&
                <SearchPhase2 vehicle={vehicleKind} modelHandler={setModel}
                              carHandler={setCarName}/>}
            {!directSearch&&modelKind !== 0&&oilKind===0&&<SearchPhase3 vehicle={vehicleKind} 
                        model={modelKind} kindHandler={setOilKind} carName={carName}
                        carHandler={setModel}/>}
            {directSearch||oilKind !== 0&&<SearchPList vehicle={vehicleKind} model={carName} carName={carName}/>}
        </>
    )
}
export default SearchArea