import React, {useState} from 'react';
import styles from './FieldFeedback.module.css'
import Chart from "../Chart";
import {Pagination, Stack} from "@mui/material";

const FieldFeedback = (
    {
        voteCount,
        noVote,
        indexNPS,
        average,
        commentCount,
        comments,
        selectedYear,
        feedbackData,
        selectedMonth,
        selectedDay
    }) => {

    const [showStatistic, setShowStatistic] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);


    const itemsPerPage = 3;
    const totalPages = Math.ceil(commentCount / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const commentsForPage = comments.slice(startIndex, endIndex);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };


    const handleFeedbackClick = () => {
        setShowStatistic(!showStatistic);
        setShowComments(false);
        setShowStatistic(true);
    };

    const handleCommentsClick = () => {
        setShowComments(!showComments);
        setShowStatistic(false);
        setShowComments(true);
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.headerBlock}>
                <span onClick={handleFeedbackClick} className={styles.feedback}>Статистика</span>
                <span onClick={handleCommentsClick} className={styles.comment}>Коментарі</span>
            </div>
            <div className={styles.feedbackBlock}>
                {showStatistic && (
                    <>
                        <ul className={styles.list}>
                            <li>Голосували - {voteCount} </li>
                            <li>Відмовилися - {noVote} </li>
                            <li>Індекс CSAT - {average}% </li>
                            <li>Індекс NPS  {indexNPS}%</li>
                            <li>Коментарів - {commentCount} </li>
                        </ul>
                        <div className={styles.chart}>
                            {selectedYear && !selectedMonth && (
                                <Chart
                                    selectedYear={selectedYear}
                                    feedbackData={feedbackData}
                                />
                            )}

                            {selectedYear && selectedMonth && !selectedDay && (
                                <Chart
                                    selectedYear={selectedYear}
                                    selectedMonth={selectedMonth}
                                    feedbackData={feedbackData}
                                />
                            )}
                            {selectedYear && selectedMonth && selectedDay && (
                                <Chart selectedYear={selectedYear}
                                       selectedMonth={selectedMonth}
                                       feedbackData={feedbackData}
                                       selectedDay={selectedDay}/>
                            )}
                        </div>
                    </>
                )}
                {showComments && (
                    <div className={styles.commentsBlock}>
                        <div className={styles.commentsWrapper}>
                            {commentsForPage.map((comment, i) => (
                                <div key={startIndex + i + 1} className={styles.commentItem}>
                                    <span className={styles.commentNumber}>
                                         Коментар {startIndex + i + 1}
                                    </span>
                                    <span>{comment}</span>
                                </div>
                            ))}
                        </div>
                        {commentCount > itemsPerPage && (
                            <div className={styles.paginationWrapper}>
                                <Stack spacing={2}>
                                    <Pagination
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        shape="rounded"
                                        color="primary"
                                    />
                                </Stack>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FieldFeedback;