import React from 'react';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';

var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style to.be ...
var should = chai.should();  // Using Should style
import NotFoundPage from './NotFoundPage';

it("renders without crashing", () => {
    shallow(<NotFoundPage/>);
});

it("renders 404", () => {
    const wrapper = shallow(<NotFoundPage/>);
    const title = <h1>404: Page Not Found</h1>;
    expect(wrapper.contains(title)).to.equal(true);
});
