let storage = {
    get(key){
        let value = localStorage.getItem(key);
        return isNaN(value) ? JSON.parse(value) : value;
    },
    set(key, data){
        return localStorage.setItem(key, JSON.stringify(data));
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

};
export default storage;