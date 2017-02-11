/**
 * Created by freya on 2017/2/11.
 */
var data = mockData;
var type = 'random';//  默认散列排布
var globalIndex;//  保持中心图片状态

//  通过类名和ID获取DOM对象的工具函数
function g( string ) {
    return (string.substring(0,1) == ".") ?
        document.getElementsByClassName(string.substring(1)) : 
        document.getElementById(string.substring(1));
}
/**
 * 画廊模板生成函数
 */
(function createTemplate() {
    var template = g(".wrap")[0].innerHTML;// 获取模板字符串
    var html = [];//  生成的HTML数组
    var element;//  根据模板生成的元素
    var nav = [];// 控制器模板
    var controllers;//  控制器
    for (var s in data){
        element = template.replace(/\{\{index\}\}/ig, s)
            .replace(/\{\{src\}\}/ig, data[s].fileName)
            .replace(/\{\{title\}\}/ig, data[s].title)
            .replace(/\{\{desc\}\}/ig, data[s].desc)
        controllers = '<span class="nav-control" onclick="turnPhoto('+ s +')"></span>'
        html.push(element)
        nav.push(controllers)
    }
    g(".wrap")[0].innerHTML = html.join('')
    g('.nav')[0].innerHTML = nav.join('')
    positionResort(getRandom([0,html.length-1]))
})()

/**
 * 重新排布所有图片的位置，并根据索引生成居中图片
 * @param index 元素的索引位置
 */
function positionResort( index ){
    var container = g(".wrap")[0];
    var _elements = g('.photo-stack')
    var controllers = g('.nav-control')// 控制器
    var elements = [];//  图片数组对象
    globalIndex = index

    for (var i = 0; i < _elements.length; i++){
        //  去除已有的居中类名、翻转类名   /\s*photo-stack-center\s*/  同时去除多余的空格
        _elements[i].className = _elements[i].className.replace(/\s*photo-stack-center\s*/,' ')
            .replace(/\s*photo-stack-back\s*/,' ')
        //  清除控制器类名
        controllers[i].className = controllers[i].className.replace(/\s*current-control\s*/,' ')
            .replace(/\s*current-control-back\s*/,' ')
        elements.push(_elements[i])
    }
    //  选定居中的图片
    elements[index].className += ' photo-stack-center'
    //  重置中心图片位置
    elements[index].style.left = '';
    elements[index].style.top = '';
    //  重置中心图片角度
    elements[index].style.MozTransform = ''
    elements[index].style.WebkitTransform = ''
    elements[index].style.msTransform = ''
    elements[index].style.transform = ''
    //  控制器切换
    controllers[index].className += ' current-control'

    //  元素的宽度和高度
    var photoWidth = elements[0].offsetWidth,
        photoHeight = elements[0].offsetHeight,
        wrapWidth = container.offsetWidth,
        wrapHeight = container.offsetHeight;
    //  左边位置限定
    var leftPosition = {
        // left: [0 - photoWidth/2, wrapWidth/2 - photoWidth/2*3],//  [最小值,最大值]
        left: [0 - photoWidth/2, wrapWidth/2 - photoWidth/2],//  增加中间图片上半部分两边的位置
        top: [0 - photoHeight/2, wrapHeight - photoHeight/2]
    }
    //  右边位置限定
    var rightPosition = {
        // left: [wrapWidth/2 + photoWidth/2, wrapWidth - photoWidth/2],//  [最小值,最大值]
        left: [wrapWidth/2, wrapWidth - photoWidth/2],//  增加中间图片上半部分两边的位置
        top: leftPosition.top,//  与左半部分高度一致
    }
    //  中间上边部分的两边特殊位置,待定
    //  限定高度，当左边X轴大于wrapWidth/2 - photoWidth/2*3并小于最大值时，以及右边X轴大于最小值并且小于wrapWidth/2 + photoWidth/2
    var specTop = [0 - photoHeight,0 - photoHeight/2]
    var randomLeft,randomRight;

    elements.splice(index,1)//  去除中间图片的对象
    if (type == 'random'){
        for (var j = 0; j < elements.length; j++){
            if (Math.random() < 0.5){// 左半部分图片位置
                randomLeft = getRandom(leftPosition.left)
                elements[j].style.left = randomLeft + 'px'
                elements[j].style.top = randomLeft > (wrapWidth/2 - photoWidth/2*3) ? getRandom(specTop) + 'px': getRandom(leftPosition.top) + 'px';
            }else {
                randomRight = getRandom(rightPosition.left)
                elements[j].style.left = randomRight + 'px'
                elements[j].style.top = randomRight < (wrapWidth/2 + photoWidth/2) ? getRandom(specTop) + 'px': getRandom(rightPosition.top) + 'px'
            }
            //  所有的元素角度随机度数为-35°到35°
            elements[j].style.MozTransform = 'rotate('+ getRandom([-35,35]) +'deg)'
            elements[j].style.WebkitTransform = 'rotate('+ getRandom([-35,35]) +'deg)'
            elements[j].style.msTransform = 'rotate('+ getRandom([-35,35]) +'deg)'
            elements[j].style.transform = 'rotate('+ getRandom([-35,35]) +'deg)'
        }
    }else {
        //  环形图片路径，距离取中心图片中点为圆心，半径1.5倍photoWidth或者photoHeight，取决于大数,加的数值是预留空隙
        var radius = photoWidth > photoHeight ? (photoWidth + 50): (photoHeight + 50);
        //  中心点位置
        var centerPoint = {
            left: wrapWidth/2,
            top: wrapHeight/2
        }
        var randomAngle;//  随机圆心角
        var sinY,cosX;
        for ( var m = 0; m < elements.length; m++){
            //  利用三角函数公式获取元素相对圆心点X轴以及Y轴的位置,注意三角函数为弧度制
            randomAngle = getRandom([0,360]);
            cosX = Math.cos(randomAngle*Math.PI/180)*radius
            sinY = Math.sin(randomAngle*Math.PI/180)*radius
            console.log(elements[m].id + ':'+cosX+','+sinY+','+randomAngle)
            //  left为中心点位置加相对圆心的X轴偏移量，还要再减去一半自身的宽度，这样视觉上两边就对等了，top原理同left
            elements[m].style.left = (centerPoint.left + cosX - photoWidth/2) + 'px';
            elements[m].style.top = (centerPoint.top + sinY - photoHeight/2) + 'px'
            //  旋转角度的问题
            elements[m].style.MozTransform = 'rotate('+ (randomAngle + 90) +'deg)'
            elements[m].style.WebkitTransform = 'rotate('+ (randomAngle + 90) +'deg)'
            elements[m].style.msTransform = 'rotate('+ (randomAngle + 90) +'deg)'
            elements[m].style.transform = 'rotate('+ (randomAngle + 90) +'deg)'
        }
    }
}

/**
 * 返回一个给定范围的随机数
 * @param array 给定范围的数组
 * @returns {number}  随机数
 */
function getRandom( array ) {
    var min = Math.min(array[0],array[1]);//  获取数组中较小值
    var max = Math.max(array[0],array[1])//  获取数组中较大值

    return Math.ceil(Math.random()*(max-min) + min)
}
/**
 * 根据被点击的图片来确定是翻转图片还是进行居中排布
 * @param index 被点击图片的索引
 */
function turnPhoto( index ) {
    var _elements = g('.photo-stack')
    var controllers = g('.nav-control')

    //  判断是否是来自居中图片的点击
    if (/\s*photo-stack-center\s*/.test(_elements[index].className)){
        if (/\s*photo-stack-back\s*/.test(_elements[index].className)){// 已经反面状态
            _elements[index].className = _elements[index].className.replace(/\s*photo-stack-back\s*/,' ')
            controllers[index].className = controllers[index].className.replace(/\s*current-control-back\s*/,' ')
            return
        }
        _elements[index].className += ' photo-stack-back'
        controllers[index].className += ' current-control-back'
    }else {// 否则对图片进行居中并重新排布位置
        positionResort(index)
    }
}
/**
 * 切换显示排布方式
 * @param string
 */
function changeType(string) {
    if (type == string ){
        return
    }
    type = string
    positionResort(globalIndex)
}
