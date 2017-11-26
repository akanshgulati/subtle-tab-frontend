export default {
    isTodayDate(timeStamp){
        if(!timeStamp){
            return false;
        }
        timeStamp = +new Date(timeStamp);
        // This will be according to user time zone
        let now = new Date();
        let minTime = +now.setHours(0, 0, 0, 0);
        let maxTime = +now.setHours(23, 59, 59, 59);
        return minTime <= timeStamp && timeStamp <= maxTime;
    },
    getEndOfDay(days){
        let now = new Date().setHours(23,59,59,59);
        days = days ? days : 0;
        now = new Date(+now + 86400000 * days);
        return now.toISOString().substring(0,10);
    }
}
