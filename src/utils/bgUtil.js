import config from './config';
import storage from './storage';

function getSmartDimensions(){
    let width;
    width = window.screen.width;

}
function getRequestParams(){
    let currentDate = new Date();
    let minDate = +new Date(currentDate.getFullYear(), currentDate.getMonth() - config.background.durationMonths, currentDate.getDate()) / 1000;

}

function filterResponse(response){
    return response.id +','+ response.secret +','+  response.farm +','+  response.server;
}
function filterResponses(response){
    if(response && response.photos && response.photos.photo.length){
        let photos = response.photos.photo;
        let storedSeenIds = storage.get('bg-seen') || [];
        let result = {};
        for(let i = 0; i < config.background.lStoreLimit; i++){
            let photo = photos[i];
            if(storedSeenIds.indexOf(photo.id) > -1) {
                if (photo.url_l && photo.url_h && photo.url_k && photo.views > config.background.minViews) {
                    result[photo.id] = filterResponse(photo);
                }
            }
        }
    }
}
let bgUtil = {
    getWallpaper(theme, callback) {
        let xmlhttp = new XMLHttpRequest();
        let _config = config.background;
        //let url = 'https://pixabay.com/api/?key=2363059-65b4954bde19ecbe197d0f47e&response_group=high_resolution&image_type=photo&orientation=horizontal&per_page=10&editor_choice=true';
        /*let url = 'https://pixabay.com/api/?key=2363059-65b4954bde19ecbe197d0f47e&response_group=high_resolution&image_type=photo&orientation=horizontal&per_page=10&order=ec&colors=black';
        url += '&min_width=' + requestWidth + '&min_height=' + requestHeight;
        if(theme !=='random') {
            url += '&q=' + theme;
        }*/
        let url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
        url += '&api_key=004a2a979699ede40ed45e56a70b7d11';
        url += "&min_upload_date='"+_config.minDate+ "'";
        url += '&tag_mode=any&sort=interestingness-desc&safe_search=1&media=photos&per_page=200&format=json&nojsoncallback=1';
        url += "&tags='" + theme.tags + "'" ;
        url = +'&extras=url_k,url_h,url_l, views';
        xmlhttp.open('GET', url);

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                //responses will be other than seen, having good views and sizes
                let bgData = filterResponses(xmlhttp.responseText);
                storage.set('bg-'+ theme.key, bgData);
                callback(bgData);
            }
            //TODO: Cover failed condition
        };
        xmlhttp.send();

        /*setTimeout(function () {
            let bgData = {
                "totalHits": 500,
                "hits": [{
                    "previewHeight": 116,
                    "largeImageURL": "https://pixabay.com/get/e831b6082af6023ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_1280.jpg",
                    "user_id": 2367988,
                    "imageSize": 1141191,
                    "fullHDURL": "https://pixabay.com/get/e831b6082af6023ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_1920.jpg",
                    "webformatHeight": 496,
                    "imageURL": "https://pixabay.com/get/e831b6082af6023ecd0b4706e04f4693ea6ae3d110b7104996f4c27c.jpg",
                    "webformatWidth": 640,
                    "previewWidth": 150,
                    "userImageURL": "",
                    "previewURL": "https://pixabay.com/get/e831b6082af6023ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_150.jpg",
                    "webformatURL": "https://pixabay.com/get/e831b6082af6023ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_640.jpg",
                    "imageWidth": 3471,
                    "id_hash": "bb4b3fcf992d44405e",
                    "user": "esiul",
                    "type": "photo",
                    "imageHeight": 2692
                }, {
                    "previewHeight": 103,
                    "largeImageURL": "https://pixabay.com/get/e836b20a2df3043ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_1280.jpg",
                    "user_id": 2367988,
                    "imageSize": 1861093,
                    "fullHDURL": "https://pixabay.com/get/e836b20a2df3043ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_1920.jpg",
                    "webformatHeight": 441,
                    "imageURL": "https://pixabay.com/get/e836b20a2df3043ecd0b4706e04f4693ea6ae3d110b7104996f4c27c.jpg",
                    "webformatWidth": 640,
                    "previewWidth": 150,
                    "userImageURL": "",
                    "previewURL": "https://pixabay.com/get/e836b20a2df3043ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_150.jpg",
                    "webformatURL": "https://pixabay.com/get/e836b20a2df3043ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_640.jpg",
                    "imageWidth": 4005,
                    "id_hash": "bb4b38cb9b2a41465e",
                    "user": "esiul",
                    "type": "photo",
                    "imageHeight": 2763
                }, {
                    "previewHeight": 79,
                    "largeImageURL": "https://pixabay.com/get/e836b60c21fd093ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_1280.jpg",
                    "user_id": 2367988,
                    "imageSize": 909839,
                    "fullHDURL": "https://pixabay.com/get/e836b60c21fd093ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_1920.jpg",
                    "webformatHeight": 339,
                    "imageURL": "https://pixabay.com/get/e836b60c21fd093ecd0b4706e04f4693ea6ae3d110b7104996f4c27c.jpg",
                    "webformatWidth": 640,
                    "previewWidth": 150,
                    "userImageURL": "",
                    "previewURL": "https://pixabay.com/get/e836b60c21fd093ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_150.jpg",
                    "webformatURL": "https://pixabay.com/get/e836b60c21fd093ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_640.jpg",
                    "imageWidth": 3756,
                    "id_hash": "bb4b38cf9d264f4b5e",
                    "user": "esiul",
                    "type": "photo",
                    "imageHeight": 1991
                }, {
                    "previewHeight": 99,
                    "largeImageURL": "https://pixabay.com/get/e830b4092cf6053ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_1280.jpg",
                    "user_id": 2995098,
                    "imageSize": 497106,
                    "fullHDURL": "https://pixabay.com/get/e830b4092cf6053ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_1920.jpg",
                    "webformatHeight": 426,
                    "imageURL": "https://pixabay.com/get/e830b4092cf6053ecd0b4706e04f4693ea6ae3d110b7104996f4c27c.jpg",
                    "webformatWidth": 640,
                    "previewWidth": 150,
                    "userImageURL": "https://cdn.pixabay.com/user/2017/02/17/15-31-56-988_250x250.jpg",
                    "previewURL": "https://pixabay.com/get/e830b4092cf6053ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_150.jpg",
                    "webformatURL": "https://pixabay.com/get/e830b4092cf6053ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_640.jpg",
                    "imageWidth": 2048,
                    "id_hash": "bb4b3ecd982b44475e",
                    "user": "Harald_Landsrath",
                    "type": "photo",
                    "imageHeight": 1365
                }, {
                    "previewHeight": 93,
                    "largeImageURL": "https://pixabay.com/get/e831b10c28f5013ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_1280.jpg",
                    "user_id": 2367988,
                    "imageSize": 390422,
                    "fullHDURL": "https://pixabay.com/get/e831b10c28f5013ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_1920.jpg",
                    "webformatHeight": 399,
                    "imageURL": "https://pixabay.com/get/e831b10c28f5013ecd0b4706e04f4693ea6ae3d110b7104996f4c27c.jpg",
                    "webformatWidth": 640,
                    "previewWidth": 150,
                    "userImageURL": "",
                    "previewURL": "https://pixabay.com/get/e831b10c28f5013ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_150.jpg",
                    "webformatURL": "https://pixabay.com/get/e831b10c28f5013ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_640.jpg",
                    "imageWidth": 2160,
                    "id_hash": "bb4b3fc89d2f47435e",
                    "user": "esiul",
                    "type": "photo",
                    "imageHeight": 1348
                }, {
                    "previewHeight": 99,
                    "largeImageURL": "https://pixabay.com/get/ee36b5092df01c3e81584603e54c439ffe76e6dc1fb0194291f3c4_1280.jpg",
                    "user_id": 960286,
                    "imageSize": 1432117,
                    "fullHDURL": "https://pixabay.com/get/ee36b5092df01c3e81584603e54c439ffe76e6dc1fb0194291f3c4_1920.jpg",
                    "webformatHeight": 426,
                    "imageURL": "https://pixabay.com/get/ee36b5092df01c3e81584603e54c439ffe76e6dc1fb0194291f3c4.jpg",
                    "webformatWidth": 640,
                    "previewWidth": 150,
                    "userImageURL": "",
                    "previewURL": "https://pixabay.com/get/ee36b5092df01c3e81584603e54c439ffe76e6dc1fb0194291f3c4_150.jpg",
                    "webformatURL": "https://pixabay.com/get/ee36b5092df01c3e81584603e54c439ffe76e6dc1fb0194291f3c4_640.jpg",
                    "imageWidth": 4272,
                    "id_hash": "bb4d38cc982a4250",
                    "user": "viktoriya_",
                    "type": "photo",
                    "imageHeight": 2848
                }, {
                    "previewHeight": 96,
                    "largeImageURL": "https://pixabay.com/get/e836b80920f0033ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_1280.jpg",
                    "user_id": 2367988,
                    "imageSize": 524988,
                    "fullHDURL": "https://pixabay.com/get/e836b80920f0033ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_1920.jpg",
                    "webformatHeight": 413,
                    "imageURL": "https://pixabay.com/get/e836b80920f0033ecd0b4706e04f4693ea6ae3d110b7104996f4c27c.jpg",
                    "webformatWidth": 640,
                    "previewWidth": 150,
                    "userImageURL": "",
                    "previewURL": "https://pixabay.com/get/e836b80920f0033ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_150.jpg",
                    "webformatURL": "https://pixabay.com/get/e836b80920f0033ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_640.jpg",
                    "imageWidth": 2576,
                    "id_hash": "bb4b38c1982742415e",
                    "user": "esiul",
                    "type": "photo",
                    "imageHeight": 1664
                }, {
                    "previewHeight": 84,
                    "largeImageURL": "https://pixabay.com/get/eb37b00d20fd083ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_1280.jpg",
                    "user_id": 4994132,
                    "imageSize": 2982956,
                    "fullHDURL": "https://pixabay.com/get/eb37b00d20fd083ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_1920.jpg",
                    "webformatHeight": 360,
                    "imageURL": "https://pixabay.com/get/eb37b00d20fd083ecd0b4706e04f4693ea6ae3d110b7104996f4c27c.jpg",
                    "webformatWidth": 640,
                    "previewWidth": 150,
                    "userImageURL": "https://cdn.pixabay.com/user/2017/04/12/12-37-13-274_250x250.jpg",
                    "previewURL": "https://pixabay.com/get/eb37b00d20fd083ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_150.jpg",
                    "webformatURL": "https://pixabay.com/get/eb37b00d20fd083ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_640.jpg",
                    "imageWidth": 5100,
                    "id_hash": "bb4839c99c274f4a5e",
                    "user": "adege",
                    "type": "photo",
                    "imageHeight": 2869
                }, {
                    "previewHeight": 83,
                    "largeImageURL": "https://pixabay.com/get/e836b60b2efd043ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_1280.jpg",
                    "user_id": 2367988,
                    "imageSize": 1396140,
                    "fullHDURL": "https://pixabay.com/get/e836b60b2efd043ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_1920.jpg",
                    "webformatHeight": 356,
                    "imageURL": "https://pixabay.com/get/e836b60b2efd043ecd0b4706e04f4693ea6ae3d110b7104996f4c27c.jpg",
                    "webformatWidth": 640,
                    "previewWidth": 150,
                    "userImageURL": "",
                    "previewURL": "https://pixabay.com/get/e836b60b2efd043ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_150.jpg",
                    "webformatURL": "https://pixabay.com/get/e836b60b2efd043ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_640.jpg",
                    "imageWidth": 3316,
                    "id_hash": "bb4b38cf9a294f465e",
                    "user": "esiul",
                    "type": "photo",
                    "imageHeight": 1848
                }, {
                    "previewHeight": 112,
                    "largeImageURL": "https://pixabay.com/get/e831b60d2efc063ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_1280.jpg",
                    "user_id": 2367988,
                    "imageSize": 951005,
                    "fullHDURL": "https://pixabay.com/get/e831b60d2efc063ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_1920.jpg",
                    "webformatHeight": 481,
                    "imageURL": "https://pixabay.com/get/e831b60d2efc063ecd0b4706e04f4693ea6ae3d110b7104996f4c27c.jpg",
                    "webformatWidth": 640,
                    "previewWidth": 150,
                    "userImageURL": "",
                    "previewURL": "https://pixabay.com/get/e831b60d2efc063ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_150.jpg",
                    "webformatURL": "https://pixabay.com/get/e831b60d2efc063ecd0b4706e04f4693ea6ae3d110b7104996f4c27c_640.jpg",
                    "imageWidth": 2648,
                    "id_hash": "bb4b3fcf9c294e445e",
                    "user": "esiul",
                    "type": "photo",
                    "imageHeight": 1992
                }],
                "total": 158014
            };

        }, 200);*/
    },
    getFormattedJSON(dataArr){
        let url, screenWidth, arr = [];
        screenWidth = window.screen.width;
        if(screenWidth <= 1280){
            url = 'largeImageURL';
        }else if(screenWidth <= 1920){
            url = 'fullHDURL';
        }else{
            url = 'imageURL'
        }
        for( let i = 0; i < dataArr.hits.length; i++){
            arr[i] = dataArr.hits[i][url];
        }
        return arr;
    },
    formImgURL(string){
        let arr = string.split(',');
        return 'https://farm'+ arr[2] + '.staticflickr.com/'+ arr[3] + '/'+ arr[0] + '_' + arr[1]+ '_' + this.getWallpaperSize() + '.jpg';
    },
    getWallpaperSize(){
        let screenWidth = window.screen.width;
        if(screenWidth < 1600){
            return 'url_b';
        }else{
            return 'url_h';
        }
    },
    getCurrentTheme(id){
    let themes = this.themes;
    for (let i = 0; i < themes.length; i++) {
        if (themes[i].id === id) {
            return themes[i];
        }
    }
},
};
export default bgUtil;