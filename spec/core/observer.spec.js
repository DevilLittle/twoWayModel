let {observe} = require('../core/observer.spec.js');


describe('Observer Function', function () {

    it('should observe empty object', function () {
        let data = {};
        let formattedInput = getFormattedInput(input);
        let expected = ['A', '3', 'J', 'Q', '7'];
        expect(formattedInput).toEqual(expected)
    });
});