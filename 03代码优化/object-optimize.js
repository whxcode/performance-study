// 1、对象属性初始化数据
// 正常情况下 v8 引擎会给对象添加 隐藏类型
var RectArea = /** @class */ (function () {
    function RectArea(l, w) {
        this.l = l; // HC0
        this.w = w; // HC0
    }
    return RectArea;
}());
/***
 * 如果初始化顺序都是相同的则编译器可以复用隐藏类型
 *
 *
 */
var urect1 = new RectArea(1, 2);
var rect2 = new RectArea(1, 2);
var rect3 = new RectArea(1, 2);
var rect4 = new RectArea(1, 2);
var car1 = { color: 'red' }; // HC0
// @ts-ignore
car1.seats = '1'; // HC1
var car2 = { seats: 2 };
// @ts-ignore
car2.color = 'blue';
// 对象属性的存储位置 In-object 属性 和 property store 属性
var car3 = {
    color: 'red' // in-object-prototype
};
// @ts-ignore
car3.seats = 4; // Normal/Fast 属性，存在在 properties store 里面，如果后续访问需要间接查找
// 通过描述数组简介查找
var arrObj = {
    0: 1,
    1: 2,
    length: 2,
};
console.log(Array.prototype.slice.call(arrObj))
// 利用 Array 代替 like Array 属性
Array.prototype.forEach.call(arrObj, function (o) {
    console.log(o);
});

Array.prototype['3'] = 1000
const arr = [1,2]
console.log(arr)
console.log(arr[3])
