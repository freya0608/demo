
/**
 * Created by Administrator on 2016/12/31.
 */
function compare(num1,num2) {
    return num1 - num2;
}
var nums = [3,1,2,100,4,200];
nums.sort(compare);
print(nums);