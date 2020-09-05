import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style to.be ...
var should = chai.should();  // Using Should style
import ProcessPage from "./ProcessPage";

it("renders without crashing", () => {
    shallow(<ProcessPage />);
});

it("renders menu title", () => {
    const wrapper = shallow(<ProcessPage />);
    const title =  <h1>Process</h1>
    expect(wrapper.contains(title)).to.equal(true);
});
