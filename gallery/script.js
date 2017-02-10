/**
 * Created by Administrator on 2017/2/10.
 */
//1.翻面控制
function turn(elem) {
    var cls = elem.className;
    if(/photo_front/.test(cls)){
        cls = cls.replace(/photo_front/,'photo_back');
    }else{
        cls = cls.replace(/photo_back/,'photo_front');
    }
    return elem.className = cls;

}
//3.通用函数
function g(selector) {
    var method = selector.substr(0,1) == '.'?'getElementByClassName':'getElementById';
    return document[method](selector.substr(1));
}
//4.输出所有的海报
var data = data;
function addPhotos() {
    var template = g('#wrap').innerHTML;
}
addPhotos();