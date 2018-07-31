
function observe(data) {
    if(!data || typeof data !== 'object'){
        return;
    }

    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key]);
    });

}

function defineReactive(data,key,val) {
    observe(val);
    Object.defineProperty(data,key,{
        enumerable:true,
        configurable:false,
        get:function () {
            return val;
        },
        set:function (newVal) {
            console.log('哈哈哈，监听到值变化了 ', val, ' --> ', newVal);
            val = newVal;
        }
    })

}

var data = {name: 'kindeng'};
// observe(data);
// console.log(observe(data));
data.name = 'dmq'; // 哈哈哈，监听到值变化了 kindeng --> dmq

module.exports = {
    observe,
};