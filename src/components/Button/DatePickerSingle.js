import { useEffect, useState } from "react";
import DatePicker from "react-modern-calendar-datepicker";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { jalali_to_gregorian} from "../../env";

function StyleDatePickerSingle(props){
    const [selectedDate, setSelectedDate] = useState();
    
      const changeDate=()=>{
        const def = props.default
        //console.log(def)
        var dateArray =(selectedDate?{
                    year:selectedDate.year?selectedDate.year:selectedDate,
                    month:selectedDate.month?selectedDate.month:1,
                    day:selectedDate.day?selectedDate.day:1}:
                    def?
                    {year:def.split('/')[0],
                    month:def.split('/')[1],
                    day:def.split('/')[2]}:''
        )
        console.log(selectedDate)
        console.log(dateArray)
        if(!selectedDate&&def){
            console.log(dateArray)
            setSelectedDate(dateArray)
        }
        props.action(dateArray.year+"/"+dateArray.month+"/"+dateArray.day)
    }
    useEffect(()=>{
        if(selectedDate||props.default)
            changeDate()
    },[selectedDate])
    return(
        <DatePicker
            value={selectedDate||null}
            onChange={setSelectedDate}
            inputPlaceholder={props.title}
            shouldHighlightWeekends
            locale={props.local} // add this
    />
    )
}
export default StyleDatePickerSingle