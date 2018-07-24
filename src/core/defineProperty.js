/*
 * @param: obj:需要定义属性的对象;
 *         prop:需要定义或修改的属性；
 *         descriptor:将被定义或修改属性的描述符
*/
function defineReactive(obj,prop,descriptor) {

    Object.defineProperty(obj,prop,{
        enumerable:true,
        configurable:false,

        get:function () {
            return descriptor;
        },
        set:function (newVal) {
            descriptor = newVal;
        }
    })

}

let obj = {name:'haha'};
let prop = 'name';
let descriptor = {name:'123'};
defineReactive(obj,prop,descriptor);
module.exports = {
    defineReactive
};