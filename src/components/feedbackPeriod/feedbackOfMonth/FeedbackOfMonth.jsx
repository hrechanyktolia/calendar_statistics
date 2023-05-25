import React, {useEffect, useState} from 'react';
import {FormControl, MenuItem, Select} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FieldFeedback from "../fieldFeedback/FieldFeedback";
import {getFeedbackData, getFeedbackInfo, monthList} from "../utils";
import styles from './FeedbackOfMonth.module.css'




const FeedbackOfMonth = () => {
    const [selectedYear, setSelectedYear] = useState('')
    const [selectedMonth, setSelectedMonth] = useState(null)
    const [monthStates, setMonthStates] = useState(Array(12).fill(false))
    const [feedbackData, setFeedbackData] = useState([])

    const toggleMonthState = (index) => {
        setMonthStates((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];

            if (newState[index]) {
                setSelectedMonth(index + 1);
            } else {
                setSelectedMonth(null);
            }

            for (let i = 0; i < newState.length; i++) {
                if (i !== index) {
                    newState[i] = false;
                }
            }

            return newState;
        });
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
        setMonthStates(Array(12).fill(false));
    };


    useEffect(() => {
        const fetchData = async () => {
            const data = await getFeedbackData();
            setFeedbackData(data);
        };

        fetchData();
    }, [selectedMonth]);

    const {voteCount, noVote, indexNPS, average, commentCount, comments} = getFeedbackInfo(
        feedbackData,
        selectedYear,
        selectedMonth
    )


    return (
        <div>
            <FormControl sx={{m: 1, minWidth: 120}}>
                <Select
                    value={selectedYear}
                    onChange={handleYearChange}
                    displayEmpty
                    inputProps={{'aria-label': 'Without label'}}
                >
                    <MenuItem value="">
                        <em>Вибрати рік</em>
                    </MenuItem>
                    {Array.from({length: 77}, (_, i) => 2023 + i).map((year) => (
                        <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {selectedYear && (
                <div className={styles.monthContainer}>
                    <ul className={styles.listMonth}>
                        {monthList.map((month, index) => (
                            <li className={styles.monthBlock} key={month} >
                                <div className={styles.month}>
                                    {month} {selectedYear} р.
                                    {monthStates[index] === false ? (
                                            <KeyboardArrowDownIcon
                                                sx={{ cursor: "pointer" }}
                                                onClick={() => toggleMonthState(index)}/>
                                        ) : (
                                            <KeyboardArrowUpIcon
                                                onClick={() => toggleMonthState(index)} />
                                        )}
                                </div>
                                <div className={styles.field}>
                                    {monthStates[index] && selectedYear && selectedMonth === index + 1  && voteCount > 0 && (
                                        <FieldFeedback  average={average}
                                                        noVote={noVote}
                                                        indexNPS={indexNPS}
                                                        comments={comments}
                                                        commentCount={commentCount}
                                                        feedbackData={feedbackData}
                                                        selectedYear={selectedYear}
                                                        selectedMonth={selectedMonth}
                                                        voteCount={voteCount}/>
                                    )}
                                </div>
                                <hr/>

                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default FeedbackOfMonth;