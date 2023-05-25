export const getFeedbackInfo = (data, selectedYear, selectedMonth, selectedDay, selectedId) => {
    const filteredData = data.filter((item) => {
        const createdAt = new Date(item.createdAt);
        const year = selectedYear ? createdAt.getFullYear() === parseInt(selectedYear) : true;
        const month = selectedMonth ? createdAt.getMonth() + 1 === parseInt(selectedMonth) : true;
        const day = selectedDay ? createdAt.getDate() === parseInt(selectedDay) : true;
        // const idLecture = selectedId ? item.uuid === selectedId : true;
        return year && month && day // && idLecture ;
    });

    const dataWithoutNullRate = filteredData.filter((item) => item.rate !== null);

    const calculateDayRate = (data) => {
        const dayRate = Array(24).fill(null);
        const hourlyCounts = Array(24).fill(0);

        data.forEach((item) => {
            const createdAt = new Date(item.createdAt);
            const hourIndex = createdAt.getUTCHours();
            const rate = item.rate;
            console.log(rate)

            dayRate[hourIndex] += rate;
            hourlyCounts[hourIndex]++;
        })
        for (let i = 0; i < 24; i++) {
            if (hourlyCounts[i] > 0) {
                dayRate[i] = dayRate[i] / hourlyCounts[i];
            }
        }
        return dayRate;
    };

    const dayRate = calculateDayRate(dataWithoutNullRate);


    const calculateYearRate = (data) => {
        const yearRate = Array(12).fill(0);
    if (!filteredData) {
        return;
    }

        const monthlyCounts = Array(12).fill(0);

        data.forEach((item) => {
            const createdAt = new Date(item.createdAt);
            const monthIndex = createdAt.getMonth();
            const rate = item.rate;
            yearRate[monthIndex] += rate;
            monthlyCounts[monthIndex]++;
        });

        for (let i = 0; i < 12; i++) {
            if (monthlyCounts[i] > 0) {
                yearRate[i] /= monthlyCounts[i];
            }
        }
        return yearRate;
    }

    const yearRate = calculateYearRate(dataWithoutNullRate);



    const calculateMonthRate = (data) => {
        const dailyRate = Array(31).fill(0);
        const dailyCounts = Array(31).fill(0);

        data.forEach((item) => {
            const createdAt = new Date(item.createdAt);
            const dayIndex = createdAt.getDate() - 1;
            const rate = item.rate;
            dailyRate[dayIndex] += rate;
            dailyCounts[dayIndex]++;
        });

        for (let i = 0; i < 31; i++) {
            if (dailyCounts[i] > 0) {
                dailyRate[i] /= dailyCounts[i];
            }
        }

        return dailyRate;
    };

    const generateDayLabels = (year, month) => {
        const numDays = new Date(year, month, 0).getDate();
        const labels = [];

        for (let i = 1; i <= numDays; i++) {
            labels.push(i.toString());
        }

        return labels;
    };

    const labels = generateDayLabels(selectedYear, selectedMonth);
    const dailyRate = calculateMonthRate(dataWithoutNullRate);


    const voteCount = filteredData.filter(item => item.rate !== null).length
    const noVote = filteredData.filter(item => item.rate === null).length

    const recommends = filteredData.map(item => item.recommend)
    const recommend = recommends.filter(item => item !== null)
    let indexNPS = "Не визначено";
    if (recommend.length > 0) {
        const filteredPromote = recommend.filter(item => item >= 9).length;
        const filteredCritic = recommend.filter(item => item <= 6).length;
        indexNPS = (((filteredPromote - filteredCritic) / recommend.length) * 100).toFixed();
    }

    const rates = filteredData.map(item => item.rate)
    const rate = rates.filter(item => item !== null)
    const filteredRatesCSAT = rate.filter(item => item >= 4)
    const average = ((filteredRatesCSAT.length / rate.length) * 100).toFixed()

    const commentCount = filteredData.filter(item => item.comment).length;
    const commentsList = filteredData.map(item => item.comment)
    const comments = commentsList.filter(item => item !== null && item !== "")


    // const lectureTime = filteredData.map((item) => {
    //     const createdAt = new Date(item.createdAt);
    //     const hours = createdAt.getUTCHours();
    //     const minutes = createdAt.getUTCMinutes();
    //     return `${hours}:${minutes}`;
    // });

    return {
        filteredData,
        voteCount,
        noVote,
        average,
        indexNPS,
        commentCount,
        // lectureTime,
        comments,
        yearRate,
        labels,
        dailyRate,
        dayRate,

    };
};



export const monthList = ["Січень", "Лютий", "Березень", "Квітень", "Травень",
    "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Лиспопад", "Грудень"]

export const getFeedbackData = async () => {
    return fetch('https://63a4bd1f2a73744b007f13dd.mockapi.io/date')
        .then(response => response.json())
        .then(data => {
            return data
        })
}