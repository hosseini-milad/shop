import { useEffect, useState } from "react";
import DatePicker from "react-modern-calendar-datepicker";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { jalali_to_gregorian} from "../../env";

function StyleDatePickerSingle(props){
    console.log(props.defaultValue)
    const [selectedDate, setSelectedDate] = useState(props.defaultValue?
        props.defaultValue:'');
      const changeDate=()=>{
        props.action(
            selectedDate?(
                selectedDate)
            :''
        )
    }
    useEffect(()=>{
        if(selectedDate)
            changeDate()
    },[selectedDate])
    return(
        <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            inputPlaceholder={props.title}
            shouldHighlightWeekends
            locale={props.local} // add this
        />
    )
}
export default StyleDatePickerSingle