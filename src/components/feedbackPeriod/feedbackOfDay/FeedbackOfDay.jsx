import React, {useEffect, useState} from 'react';
import {getFeedbackData, getFeedbackInfo} from "../utils";
import FieldFeedback from "../fieldFeedback/FieldFeedback";
import {DateCalendar, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


    const FeedbackOfDay = () => {
        const [selectedDate, setSelectedDate] = useState(null);
        const [selectedYear, setSelectedYear] = useState('');
        const [selectedMonth, setSelectedMonth] = useState('');
        const [selectedDay, setSelectedDay] = useState('');
        const [feedbackData, setFeedbackData] = useState([]);

        useEffect(() => {
            const fetchData = async () => {
                const data = await getFeedbackData();
                setFeedbackData(data);
            };

            fetchData();
        }, []);

        const handleDateChange = (date) => {
            setSelectedDate(date);
            setSelectedYear(date ? date.getFullYear().toString() : '');
            setSelectedMonth(date ? (date.getMonth() + 1).toString() : '');
            setSelectedDay(date ? date.getDate().toString() : '');
        };

        const {voteCount, noVote, indexNPS, average, commentCount,  comments} = getFeedbackInfo(
            feedbackData,
            selectedYear,
            selectedMonth,
            selectedDay,
        );

        return (
            <div style={{display: "flex"}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateCalendar value={selectedDate} onChange={handleDateChange} />
                    {selectedDate && voteCount > 0 &&  (
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                                   <FieldFeedback average={average}
                                                  noVote={noVote}
                                                  indexNPS={indexNPS}
                                                  commentCount={commentCount}
                                                  comments={comments}
                                                  voteCount={voteCount}
                                                  feedbackData={feedbackData}
                                                  selectedYear={selectedYear}
                                                  selectedMonth={selectedMonth}
                                                  selectedDay={selectedDay}
                                   />
                        </div>
                    )}
                </LocalizationProvider>
            </div>
        );
    };

export default FeedbackOfDay;