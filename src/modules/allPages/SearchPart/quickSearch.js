import { useState } from "react";
import SimpleFetch from "../../../components/simpleFetch";
import env, { siteApi } from "../../../env";
import SearchPList from "./searchPList";
import SearchPhase1 from "./searchS1";
import SearchPhase2 from "./searchS2";
import SearchPhase3 from "./searchS3";

function QuickSearch(props){
    const[step , setStep] = useState(1);
    const[vehicleKind, setVehicle] = useState(0);
    const[motorOil,setMotorOil] = useState('')
    const[modelKind , setModel] = useState(0);
    const[carNames,setCarNames] = useState(0);
    const[carFinded , findCar] = useState(0);
    
    const filters = props.quickSearch;
    //console.log(carFinded)
    return(
        <>
            <div className="searchPhase1 searchPhase2">
                <ul className="vehiclePart">
                {vehicleKind?<li onClick={()=>{setStep(1);setVehicle(0);setModel(0);setCarNames(0);findCar(0)}}
                    dangerouslySetInnerHTML={{__html:vehicleKind.innerHTML}}></li>:''}
                {modelKind?<li onClick={()=>{setStep(2);setModel(0);setCarNames(0);findCar(0)}}
                    dangerouslySetInnerHTML={{__html:modelKind.innerHTML}}></li>:''}
                {carNames?<li onClick={()=>{setStep(3);setCarNames(0);findCar(0)}}
                    dangerouslySetInnerHTML={{__html:carNames.innerHTML}}></li>:''}
                {carFinded?<li onClick={()=>{setStep(4);findCar(0)}}
                    dangerouslySetInnerHTML={{__html:carFinded.innerHTML}}></li>:''}
                </ul>
                <SearchPhase1 step={step===1?"block":"none"}
                    filters={filters}
                    setMotorOil={setMotorOil}
                    vehicleHandler={setVehicle} 
                    setStep={setStep}/>
            
                <SearchPhase2 step={step===2?"block":"none"} 
                    filters={filters}
                    modelHandler={setModel} 
                    carHandler={setCarNames} setStep={setStep}/>
            
                {step===3&&<SearchPhase3 step={step===3?"block":"none"} 
                    findCar={findCar} 
                    carName={carNames} 
                    setStep={setStep}/>}
            </div>
            <div className="offerItemDisplay" style={{display:step===4?"block":"none"}}>
                {step===4&&<SearchPList vehicle={vehicleKind} model={modelKind}
                    carName={carFinded} motorOil={motorOil}/>}
            </div>
        </>
    )
}
export default QuickSearch