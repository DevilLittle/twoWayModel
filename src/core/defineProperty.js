/*
 * @param: obj:需要定义属性的对象;
 *         prop:需要定义或修改的属性；
 *         descriptor:将被定义或修改属性的描述符
*/

function defineReactive(obj,prop,descriptor) {

    return Object.defineProperty(obj,prop,{
        enumerable:true,
        configurable:false,

        get:function () {
            console.log('value  '+ descriptor);
            return descriptor;
        },
        set:function (newVal) {
            console.log('new value' + newVal);
            descriptor = newVal;
        }
    });

}

let obj = {};

obj.name = 'haha';
console.log(defineReactive(obj,'name','dd').name);
var o = {};
var bValue;
Object.defineProperty(o, "b", {
    get : function(){
        return bValue;
    },
    set : function(newValue){
        bValue = newValue;
    },
    enumerable : true,
    configurable : true
});

o.b = 38;
console.log(o.b);
module.exports = {
    defineReactive
};