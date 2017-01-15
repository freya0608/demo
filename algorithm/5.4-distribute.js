/**
 * Created by Administrator on 2017/1/15.
 */
function distribute(nums, queues, n, digit) {
    for(var i=0;i<n;++i){
        if(digit == 1){
            queues[nums[i]%10].enqueue(nums[i]);
        }else {
            queues[Math.floor(nums[i]/10)].enqueue(nums[i]);
        }

    }
}
function collection(queues, nums) {
    var i=0;
    for(var digit=0;digit<10;++digit){
        while (!queues[digit].empty()){
            nums[i++] = queues[digit].dequeue();
        }
    }
}
function disArray(arr) {
    for(var i=0;i<arr.length;++i){
        putstr(arr[i]+'');
    }
}
