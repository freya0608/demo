/**
 * Created by freya on 2017/4/21.
 */

//  1
function convert(s) {
    console.log(s);//hi
    s +=s.toUpperCase();
    console.log(s);//hiHI
}
function funny(s) {
    convert(s);
    console.log(s);//hi
}
funny('hi');


//  2

var a = [1,2,3,4,5];
a=a.map((i)=>i+1).filter((i)=>i%2);
console.log(a);//[3, 5]



// 3
function trans(a) {
    a/=2;
}
function f(g) {
    return typeof g
}
console.log(f(trans),typeof trans(4));//function undefined


// 4
function Person(name, city) {
    this.name = name;
    this.address.city = city;
}
Person.prototype.address = {city:'X'};
var p1 = new Person('tony','A');
var p2 = new Person('sam','B');
console.log(p1==p2)//false
            console.log(p1.address == p2.address)//true
           console.log( p1.address.city == p2.address.city)//true

// 5
var  i = 1,j=2;
setTimeout(function () {
    i='Hi';
    j='ha'
},0)
var a = i+j;
setTimeout(function () {
    console.log([a,i+j])//[3, "Hiha"]
},50)


//7
console.log(typeof 1)//number
console.log(typeof Number(1));//number
console.log(typeof new Function)//function
console.log(typeof []);//object
console.log(typeof {})//object

//8

function Animal() {};
function Cat() {};
function Dog() { return new Animal};
Cat.prototype = new Animal;
console.log(new Dog instanceof Animal);//true
console.log(new Dog instanceof Dog);//false
console.log(new Cat instanceof Animal);//true




//9

function Super() {};
Super.prototype.name = 'S';
Super.prototype.age = 18;
function Demo(name) {this.name = name;}
Demo.prototype = Super.prototype;
var d  = new Demo('D'),s = new Super;
var a = [d.name,d.age,s.name,s.age];
Super.prototype.name = 'C';
Super.prototype.age = 25;
console.log([a,d.name,d.age,s.name,s.age]);
//0:"D"1:182:"S"3:18
//1:"D"  2:25  3:"C"  4:25


//10
var fs = [],sum = 0;
for(var i=0;i<10;i++){
    fs.push(function () {
        return i;
    })
}
for(var j = 0;j<10;j++) sum += fs[j]();;
console.log(sum);


//  11
var x='x',y='y';
function foo() {
    var x=4;
    return function () {
        return [x,y];
    }
}
function bar() {
   y=6;
    return function () {
        return [x,y];
    }
};
console.log(foo()(),bar()(),foo()());//[4, "y"] ["x", 6] [4, 6]

console.log(foo(),bar(),foo());
// function () {
// return [x,y];
// } function () {
//     return [x,y];
// } function () {
//     return [x,y];
//}


//12
var list = [],str='';
for(var i=0;i<10;i++){
    (function (i) {
        list.push(function () {
            return i;
        })

    })(i)
}
for(var j = 0;j<10;j++) str += list[j]();;
console.log(str);//0123456789



//13
var fs = [],sum = 0,i;
for(var i=0;i<10;i++){
    fs.push(function () {
        return i;
    })
}
for(var i = 0;i<10;i++) sum += fs[i]();;
console.log(sum);

