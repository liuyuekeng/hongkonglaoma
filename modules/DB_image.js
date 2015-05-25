/*
 *  images 表结构
 *  name 图片名称
 *  size 图片大小
 *  url 图片访问 url
 */
var Image = function(db) {
    if (!db.articles) {
        db.bind('images');
    }
    var images = db.images;

    var uploadImage = function(){
    };
    var uploadImages = function(){
    };
    var deletImage = function(){
    };
    var deletImages = function(){
    };

    return {
        'uploadImage': uploadImage,
        'uploadImages': uploadImages,
        'deletImage': deletImage,
        'deletImages': deletImages
    }
}
