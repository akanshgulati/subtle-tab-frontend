export default {
    isTodayDate(timeStamp){
        // This will be according to user time zone
        let now = new Date();
        let minTime = +now.setHours(0, 0, 0, 0);
        let maxTime = +now.setHours(23, 59, 59, 59);
        return minTime <= timeStamp <= maxTime;
    }
}