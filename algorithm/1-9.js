
/**
 * Created by Administrator on 2016/12/25.
 */
function factorial(number) {
    var product = 1;
    for(var i=number;i>=1;--i){
        product*=i;
    }
    return product;
}
alert(factorial(4));
alert(factorial(5));
alert(factorial(10));