/**
 * Created by freya on 2017/4/16.
 */
function showPages(page, total) {
    var str = page+'';
    for(var i=1;i<4;i++){
        if(page-i>1){
            str = page-i+''+str;
        }
        if(page+i<total){
            str = str+''+(page+i);
        }
    }
    if(page-4>1){
        str = '...'+str;
    }
    if(page<total){
        str = str+''+total+'下一页';
    }
    return str;
}






function showPageCommon(config) {
    return function (page, total) {
        var str = '<a>'+page+'<a>';
        
        for(var i=1;i<4;i++){
            if(page-i>1){
                str = '<a class="' +config.color+ '">' +(page-i) +'</a>'+str;
            }
            if(page+i<total){
                str =str+ '<a class="' +config.color+ '">' +(page+i) +'</a>';
                //str = str+''+(page+i);
            }
        }
        if(page-4>1){
            str = '...'+str;
        }
        
        if(page>1){
            str = '上一页'+1+''+str;
        }
        
        if(page+4<total){
            str = str+'...';
        }
        
        if(page<total){
            str = str+''+total+'下一页';
        }
        return str;
    }
}


var showPages = showPageCommon({
    color:'red'
})

var  total = 110;
for(var i=1;i<total;i++){
    var ret = showPages(i,total);
    console.log(ret);
}

var showPages = showPageCommon({
    color:'blue'
})
var  total = 110;
for(var i=1;i<total;i++){
    var ret = showPages(i,total);
    console.log(ret);
}


