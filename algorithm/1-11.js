
/**
 * Created by Administrator on 2016/12/25.
 */function factorial(number) {
    if (number==1){
        return number;
    }else{
        return number * factorial(number-1);
    }
}
alert(factorial(5));