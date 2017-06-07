import config from './config';
import storage from './storage';
import bgData from './backgroundData';

let bgUtil = {
    getFormattedJSON(dataArr){
        let url, screenWidth, arr = [];
        screenWidth = window.screen.width;
        if (screenWidth <= 1280) {
            url = 'largeImageURL';
        } else if (screenWidth <= 1920) {
            url = 'fullHDURL';
        } else {
            url = 'imageURL'
        }
        for (let i = 0; i < dataArr.hits.length; i++) {
            arr[i] = dataArr.hits[i][url];
        }
        return arr;
    },
    formImgURL(string, id){
        let arr = string.split(',');
        if (arr.length > 1) {
            return 'https://farm' + arr[1] + '.staticflickr.com/' + arr[2] + '/' + id + '_' + this.getSecret(arr) + '_' + this.getWallpaperSize() + '.jpg';
        } else {
            return string;
        }
    },
    getSecret(arr){
        let screenWidth = window.screen.width;
        if (screenWidth <= 1200) {
            return arr[0];
        } else if(screenWidth > 1200 && screenWidth < 1920 ){
            return arr[3];
        }else{
            return arr[4];
        }
    },
    getWallpaperSize(){
        let screenWidth = window.screen.width;
        if (screenWidth <= 1024) {
            return 'b';
        } else if(screenWidth > 1024 && screenWidth < 1920 ){
            return 'h';
        }else{
            return 'k';
        }
    },
    getCurrentTheme(id){
        let themes = bgData.themes;
        for (let i = 0; i < themes.length; i++) {
            if (themes[i].id === id) {
                return themes[i];
            }
        }
    }
};

export default bgUtil;