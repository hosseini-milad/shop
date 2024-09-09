import { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
function GeoLocation(props){
    const [geoDone,setGeoDone] = useState(0)
    var { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        })
    const getGeo=()=>{
        try{
        props.update(prevState => ({
            ...prevState,
            nif:(coords.longitude+","+coords.latitude)
          }))
          setGeoDone(1)
        }catch{}
    }
    return geoDone?(
        <div>{coords.longitude+","+coords.latitude} Set</div>
    ): !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : coords ? (
        <i className="fa fa-map" onClick={()=>getGeo()}/>
    ) : (
        <div>Getting the location data&hellip; </div>
    );
    return(
        <i className="fa fa-map"
        onClick={()=>getGeo()}></i>
    )
}
export default GeoLocation