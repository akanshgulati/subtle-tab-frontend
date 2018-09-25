import constants from './Constants';

const isSyncStorageKey = (key) => {
    return constants.SYNC.indexOf(key) > -1 || key.indexOf('note-') > -1 || key.indexOf('todo') === 0
};

const storage = {
    get(key) {
        if (!key) {
            return
        }
        let value = localStorage.getItem(key);
        return JSON.parse(value);
    },
    set(key, value) {
        if (!key || value === undefined || value === null) {
            return
        }
        if (isSyncStorageKey(key)) {
            let obj = {};
            obj[key] = value;
            chrome.storage.sync.set(obj);
        }
        localStorage.setItem(key, JSON.stringify(value));
    },
    setLocal(key, value) {
        if (!key || value === undefined || value === null) {
            return
        }
        localStorage.setItem(key, JSON.stringify(value));
    },
    remove(key) {
        if (!key) {
            return;
        }
        if (isSyncStorageKey(key)) {
            chrome.storage.sync.remove(key);
        }
        return localStorage.removeItem(key);
    },
    increment(key) {
        let item = this.get(key);
        if (typeof item === 'number') {
            this.set(key, item + 1)
        }
    },
    append(key, value) {
        let initialValue = this.get(key) || [];
        initialValue.push(value);
        this.set(key, initialValue);
    },
    prepend(key, value) {
        let initialValue = this.get(key) || [];
        initialValue.unshift(value);
        this.set(key, initialValue);
    },
    getMap(key) {
        const value = localStorage.getItem(key);
        return isNaN(value) ? JSON.parse(value) : value;
    },
    setMap(key, data) {
        return localStorage.setItem(key, JSON.stringify(data));
    },
    chromeSync: {
        get(key, callback) {
            try {
                chrome.storage.sync.get(key, (details) => {
                    if (callback) {
                        callback(details);
                    }
                });
            } catch (e) {
                console.log(e);
            }
        },
        set(key, value, callback) {
            try {
                let obj = {};
                obj[key] = value;
                chrome.storage.sync.set(obj, (details) => {
                    if (callback) {
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
export const Get = storage.get;
export const Set = storage.set;
export const Remove = storage.remove;
export const Append = storage.append;
