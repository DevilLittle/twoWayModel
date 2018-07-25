let {defineReactive} = require('../../src/core/defineProperty.js');

describe('Object DefineProperty',function () {
   it('should modify object property',function () {

       let obj = {};
       obj.name = 'haha';
       // let obj = {name:'haha'};
       let prop = 'name';
       let descriptor = '123';

       let result = defineReactive(obj,prop,descriptor)[prop];

       let expected = '123';
       expect(result).toEqual(expected);
   })
});