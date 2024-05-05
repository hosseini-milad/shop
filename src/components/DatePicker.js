import { useEffect, useState } from "react";
import DatePicker from "react-modern-calendar-datepicker";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { jalali_to_gregorian} from "../../env";

function StyleDatePicker(props){
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
      });
      const changeDate=()=>{
        selectedDayRange.to&&selectedDayRange.from&&
        props.action({
                dateFrom:selectedDayRange.from?jalali_to_gregorian(
                    selectedDayRange.from.year,selectedDayRange.from.month,
                    selectedDayRange.from.day)
                :0 ,dateTo:selectedDayRange.to?jalali_to_gregorian(
                    selectedDayRange.to.year,selectedDayRange.to.month,
                    selectedDayRange.to.day):0
                }
        )
    }
    useEffect(()=>{
        changeDate()
    },[selectedDayRange])
    return(
        <DatePicker
            value={selectedDayRange}
            onChange={setSelectedDayRange}
            inputPlaceholder={props.title}
            shouldHighlightWeekends
            locale={props.local} // add this
        />
    )
}
export default StyleDatePicker