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
function g() {

    
}