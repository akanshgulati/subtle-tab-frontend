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
    },
    getDueDateString(dateString) {
        if (!dateString) {
            return;
        }
        const now = new Date();
        const date = new Date(dateString);
        const nowValue = now.getDate() + now.getMonth() + now.getFullYear();
        const dateValue = date.getDate() + date.getMonth() + date.getFullYear();
        switch (dateValue) {
            case nowValue:
                return {value: 'Today', pending: 1};
            case nowValue + 1:
                return {value: 'Tomorrow', pending: 2};
            case nowValue - 1:
                return {value: 'Yesterday', pending: -1};
            default:
                return {value: date.toLocaleDateString().replace(/\//g, '.'), pending: date - now};
        }
    },
    getDateInputTypeDate(date){
        if (!date) {
            return;
        }
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
}
