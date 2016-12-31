/**
 * Created by Administrator on 2016/12/31.
 */
function Point(x, y) {
    this.x = x;
    this.y = y;
}
function displayPts(arr) {
    for(var i = 0;i < arr.length;++i){
        print(arr[i].x +','+arr[i].y);
    }
}
var p5 = new Point(12,-3);
points.push(p5);
print('after push:');
displayPts(points);
points.shift();
print('after shift:');
displayPts(points);
