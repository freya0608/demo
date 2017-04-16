/**
 * Created by freya on 2017/4/16.
 */
for(var i=0;i<5;i++){
    setTimeout(function () {
        console.log(new Date(),i);//5,5,5,5,5
    },1000);
}
console.log(new Date(),i);
//直接输出5，过一秒后输出5个5



for(var i=0;i<5;i++){
    setTimeout(() => {
        console.log(new Date(),i);//5,5,5,5,5
    },1000);
}
console.log(new Date(),i);
//直接输出5，过一秒后输出5个5



for(var i=0;i<5;i++){
    (function (j) {
        setTimeout(function () {
            console.log(new Date(),j);
        },1000);
    })(i);
}
console.log(new Date(),i);
//开始输出5，过一秒后直接输出0,1,2,3,4



var output = function (i) {
    setTimeout(function () {
        console.log(new Date(),i);
    },1000);
};
for(var i=0;i<5;i++){
    output(i);
}
console.log(new Date(),i)
//开始输出5，过一秒后直接输出0,1,2,3,4


for(let i=0;i<5;i++){
    setTimeout(function () {
        console.log(new Date(),i);
    },1000);
}
console.log(new Date(),i);
//开始输出5，过一秒后直接输出0,1,2,3,4





for(var i=0;i<5;i++){
    (function (j) {
        setTimeout(function () {
            console.log(new Date(),j);
        },1000*j);
    })(i);
}
//每隔一秒输出0,1,2,3,4

setTimeout(function () {
    console.log(new Date(),i);
},1000*i);
//隔5秒输出5



const tasks = [];
for(var i=0;i<5;i++){
    ((j)=>{
        tasks.push(new Promise((resolve)=>{
            setTimeout(()=>{
                console.log(new Date(),j);
                resolve();
            },1000*j);
        }));
    })(i);
}
//每隔一秒输出0,1,2,3,4
Promise.all(tasks).then(()=>{
    setTimeout(()=>{
        console.log(new Date(),i);
    },1000)
});
//隔5秒输出5




const tasks = [];
 const output = (i)  => new Promise((resolve)=>{
        setTimeout(()=>{
            console.log(new Date(),i);
            resolve();
        },1000*i);
    });
for(var i=0;i<5;i++){
    tasks.push(output(i));
}
//每隔一秒输出0,1,2,3,4

Promise.all(tasks).then(()=>{
    setTimeout(()=>{
        console.log(new Date(),i);
    },1000)
});
//隔5秒输出5




//ES7
const sleep = (timeountMS)=> new Promise((resolve)=>{
    setTimeout(resolve,timeountMS);
});
(async()=>{
    for(var i=0;i<5;i++){
        await sleep(1000);
        console.log(new Date(),i);
    }
    await sleep(1000);
    console.log(new Date(),i);
})();
//每隔一秒输出0,1,2,3,4,5




