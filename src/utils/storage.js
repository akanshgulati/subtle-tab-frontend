import constants from './Constants';

let storage = {
    get(key){
        let value = localStorage.getItem(key);
        return isNaN(value) ? JSON.parse(value) : value;
    },
    set(key, value){
        if (constants.SYNC.indexOf(key) > -1 && localStorage.getItem('sync')) {
            let obj = {};
            obj[key] = value;
            console.log(obj);
            chrome.storage.sync.set(obj);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    },
    setLocal(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    },
    remove(key){
        return localStorage.removeItem(key);
    },
    increment(key){
        let item = this.get(key);
        if (typeof item === 'number') {
            this.set(key, item + 1)
        }
    },
    append(key, value){
        let initialValue = this.get(key) || [];
        initialValue.push(value);
        this.set(key, initialValue);
    },
    getMap(key){
        let value = localStorage.getItem(key);
        return isNaN(value) ? JSON.parse(value) : value;
    },
    setMap(key, data){
        return localStorage.setItem(key, JSON.stringify(data));
    },
    chromeSync: {
        get(key, callback){
            chrome.storage.sync.get(key, (details) => {
                callback(details);
            });
        },
        set(key, value, callback){
            chrome.storage.sync.set({key: value}, (details) => {
                callback(details);
            });
        }
    }

};
export default storage;