import {getFeedbackData, getFeedbackInfo} from "./utils";
import {useEffect, useState} from "react";
import {FormControl, MenuItem, Select} from "@mui/material";
import FieldFeedback from "./fieldFeedback/FieldFeedback";



const FeedbackOfYear = () => {

    const [selectedYear, setSelectedYear] = useState('');
    const [feedbackData, setFeedbackData] = useState([]);

    const handleYearChange = (e) => setSelectedYear(e.target.value);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getFeedbackData();
            setFeedbackData(data);
        };

        fetchData();
    }, [selectedYear]);

    const {voteCount, noVote, indexNPS, average, commentCount, comments} = getFeedbackInfo(feedbackData, selectedYear);

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                    value={selectedYear}
                    onChange={handleYearChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="">
                        <em>Виберіть рік</em>
                    </MenuItem>
                    {Array.from({ length: 77 }, (_, i) => 2023 + i).map((year) => (
                        <MenuItem key={year} value={year}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {selectedYear && voteCount > 0 && (

                <div>
                    <FieldFeedback average={average}
                                   noVote={noVote}
                                   indexNPS={indexNPS}
                                   commentCount={commentCount}
                                   comments={comments}
                                   voteCount={voteCount}
                                   feedbackData={feedbackData}
                                   selectedYear={selectedYear}
                    />
                </div>
            )}
        </div>
    );
};


export default FeedbackOfYear;