import {format} from 'date-fns'

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
        }
        if ((now.getFullYear() - date.getFullYear()) === 0) {
            return {value: format(date, 'DD MMM'), pending: dateValue - nowValue};
        } else {
            return {value: format(date, 'DD MMM, YYYY'), pending: dateValue - nowValue};
        }
    },
    getDateInputTypeDate(date){
        if (!date) {
            return;
        }
        return format(date, 'YYYY-MM-DD')
    }
}
