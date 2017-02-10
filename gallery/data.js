/**
 * Created by Administrator on 2017/2/10.
 */
var data=[];
var dataStr = '1、霍比特人<br>导演：某某<br>编剧：某某<br>，主演：啦啦啦<br>';
var d = dataStr.split('<br><br><br>')
for(var i = 0;i<d.length;i++){
    var c = d[i].split('<br><br>');
    data.push({
        img:c[0].replace('、',' ')+'.jpg',
        caption:c[0].split('、')[1],
        desc:c[1]
    });
    console.log(c[0].replace('、',' ')+'.jpg');
}