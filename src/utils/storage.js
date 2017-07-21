import constants from './Constants';

let storage = {
    get(key){
        let value = localStorage.getItem(key);
        return isNaN(value) ? JSON.parse(value) : value;
    },
    set(key, value){
        if (constants.SYNC.indexOf(key) > -1 || key.indexOf('note-') > -1) {
            let obj = {};
            obj[key] = value;
            chrome.storage.sync.set(obj);
        }
        localStorage.setItem(key, JSON.stringify(value));
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
            try {
                chrome.storage.sync.get(key, (details) => {
                    if(callback) {
                        callback(details);
                    }
                });
            } catch (e) {
                console.log(e);
            }
        },
        set(key, value, callback){
            try {
                let obj = {};
                obj[key] = value;
                chrome.storage.sync.set(obj, (details) => {
                    if(callback) {
                        callback(details);
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
    }

};
export default storage;