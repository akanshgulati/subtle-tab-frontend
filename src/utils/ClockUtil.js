const getZeroPad = (n) =>{
    return (parseInt(n, 10) >= 10 ? '' : '0') + n
}
const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October','November', 'December'];
const dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const getTime = (timestamp, isTwelveHourClock) => {
    const date = new Date(timestamp);
    let hrs = date.getHours();
    let unit;
    if (isTwelveHourClock) {
        unit = hrs >= 12 ? 'PM' : 'AM'
        hrs = (hrs !== 0 && hrs !== 12) ? hrs % 12 : 12
    }
    return {
        hrs,
        min: getZeroPad(date.getMinutes()),
        unit
    }
}
export const getDate = (timestamp)=>{
    const date = timestamp ? new Date(timestamp) : new Date()
    return {
        day: dayArr[date.getDay()],
        date: date.getDate(),
        month: monthArr[date.getMonth()],
        iso: date.toISOString()
    }
}