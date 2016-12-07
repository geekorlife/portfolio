// this regex matches any js files in __tests__ directories
const context = require.context('.', true, /__tests__\/.+\.js$/);
context.keys().forEach(context);

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import Root from './src/mainApp';

console.log('READY');

describe('TEST', () => {
    it('test is true ?', () => {
        let a = true;
        expect(a).toBe(true);
    })

    it("and can have a negative case", function() {
    expect(false).not.toBe(true);
  });
})


describe('root', function () {
    console.log('LAUNCH');
    it('renders without problems', function () {
        var root = TestUtils.renderIntoDocument(<Root/>);
        expect(root).toExist();
    });
});