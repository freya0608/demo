/**
 * Created by freya on 2017/2/10.
 */
//1.翻面控制
function turn(elem) {
    var cls = elem.className;
    var n = elem.id.split('_')[1];

    if(!/photo_center/.test(cls)){
        return rsort(n);
    }

    if(/photo_front/.test(cls)){
        cls = cls.replace(/photo_front/,'photo_back');
        g('#nav_'+n).className += ' i_back '
    }else{
        cls = cls.replace(/photo_back/,'photo_front');
        g('#nav_'+n).className += g('#nav_'+n).className.replace(/\s*i_back\s*/,' ');
    }
    return elem.className = cls;

}
//3.通用函数
function g(selector) {
    var method = selector.substr(0,1) == '.'?'getElementsByClassName':'getElementById';
    return document[method](selector.substr(1));
}

// function g( string ) {
//     return (string.substring(0,1) == ".") ?
//         document.getElementsByClassName(string.substring(1)) :
//         document.getElementById(string.substring(1));
// }

//4.输出所有的海报
var data = data;
function addPhotos() {
    var template = g('#wrap').innerHTML;
    var html = [];
    var nav = [];
    for(s in data){
        var _html = template
            .replace('{{index}}',s)
            .replace('{{img}}',data[s].fileName)
            .replace('{{caption}}',data[s].title)
            .replace('{{desc}}',data[s].desc);
        html.push(_html);
        
        nav.push('<span id="nav_'+ s +'" onclick="turn(g(\'#photo_'+s+'\'))" class="i">&nbsp;</span>');
    }
    html.push('<div class="nav">'+nav.join('')+'</div>')
    
    g('#wrap').innerHTML = html.join('');
    rsort(random([0,html.length]));
}
addPhotos();
//    计算左右分区的范围{left  right}
function range() {
    var range = {
        left:{
            x:[],
            y:[]
        },
        right:{
            x:[],
            y:[]
        },
    };
    var wrap = {
        w:g('#wrap').clientWidth,
        h:g('#wrap').clientHeight
    }
    var photo={
        w:g('.photo')[0].clientWidth,
        h:g('.photo')[0].clientHeight
    }
    range.wrap = wrap;
    range.photo = photo;

    range.left.x = [0-photo.w,wrap.w/2-photo.w/2];
    range.left.y = [0-photo.h,wrap.h];

    range.right.x = [wrap.w/2 + photo.w/2, wrap.w + photo.w];
    range.right.y = range.left.y;

    return range;
}
//    5.排序海报
function rsort(n) {
    var _photo = g('.photo');
    var photos = [];
    for(var s = 0;s<_photo.length;s++){
        _photo[s].className = _photo[s].className.replace(/\s*photo_center\s*/,' ');
        _photo[s].className = _photo[s].className.replace(/\s*photo_front\s*/,' ');
        _photo[s].className = _photo[s].className.replace(/\s*photo_back\s*/,' ');
        _photo[s].className += ' photo_front '
        _photo[s].style.left = '';
        _photo[s].style.top = '';
        _photo[s].style['transform'] = 'rotateY(360deg) scale(1.3)'


        photos.push( _photo[s] );
    }
    var photo_center = g('#photo_'+n);
    photo_center.className += ' photo_center';

    photo_center = photos.splice(n,1)[0];


//        把海报分成左右两个部分
    var photos_left = photos.splice(0,Math.ceil(photos.length/2));
    var photos_right = photos;

    var ranges = range();

    for(s in photos_left){
        var photo = photos_left[s];
        photo.style.left = random(ranges.left.x) +'px';
        photo.style.top =  random(ranges.left.y) +'px';

        photos.style['transform'] = photo.style['-webkit-transform']
            = 'rotate('+ random([-150,150])+'deg) scale(1)'

    }
    for(s in photos_right){
        var photo = photos_right[s];
        photo.style.left = random(ranges.right.x) +'px';
        photo.style.top =  random(ranges.left.y) +'px';

        photos.style['transform'] =photo.style['-webkit-transform']
            = 'rotate('+ random([-150,150])+'deg) scale(1)'

    }
    var navs = g('.i');
    for(s in navs){
        navs[s].className = navs[s].className.replace(/\s*i_current\s*/,' ');
        navs[s].className = navs[s].className.replace(/\s*i_back\s*/,' ');
    }
    g('#nav_'+n).className +=' i_current ';
    
}
//    6.随机生成一个值 支持取值范围。
function random(range) {
    var max = Math.max(range[0],range[1]);
    var min = Math.min(range[0],range[1]);
    diff = max - min;
    var number = Math.ceil(Math.random()*diff +min);
    return number;

}