
import { useContext,useState, React } from 'react';
import { HotelsContext } from '../providers/hotels-context.js';
import dayjs from 'dayjs';
import DatePicker, { DateObject, Calendar } from "react-multi-date-picker"

export default function CheckInOut({ id }) {

    
      const { handleCheckInOutChange, checkInOutDates } = useContext(HotelsContext);

      const handleChange = (dates) => {
        if (dates.length === 2) {
          handleCheckInOutChange('checkInDate', dates[0]);
          handleCheckInOutChange('checkOutDate', dates[1]);
        }
      };

  return (
    
      <Calendar
        value={[dayjs(checkInOutDates.checkInDate).toDate(), dayjs(checkInOutDates.checkOutDate).toDate()]}
        onChange={handleChange}
        range
        rangeHover
      />

  );
}