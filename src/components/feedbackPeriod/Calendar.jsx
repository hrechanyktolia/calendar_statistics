import {useState} from 'react';
import {FormControl, MenuItem, Select} from "@mui/material";
import FeedbackOfMonth from "./feedbackOfMonth/FeedbackOfMonth";
import FeedbackOfYear from "./FeedbackOfYear";
import FeedbackOfDay from "./feedbackOfDay/FeedbackOfDay";


const Calendar = () => {

    const [calendarPeriod, setCalendarPeriod] = useState('')

    const handleChange = (e) => setCalendarPeriod(e.target.value)

    return (
        <div style={{display: "flex"}}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                    value={calendarPeriod}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="">
                        <em>Вибрати період</em>
                    </MenuItem>
                    <MenuItem value={'year'} onClick={() => setCalendarPeriod("year")}>Рік</MenuItem>
                    <MenuItem value={'month'} onClick={() => setCalendarPeriod("month")}>Місяць</MenuItem>
                    <MenuItem value={'day'} onClick={() => setCalendarPeriod("day")}>День</MenuItem>
                </Select>
            </FormControl>

            <div>
                {calendarPeriod === "year" && <FeedbackOfYear/>}
                {calendarPeriod === "month" && <FeedbackOfMonth/>}
                {calendarPeriod === "day" && <FeedbackOfDay/>}
            </div>
        </div>
    );
};

export default Calendar;