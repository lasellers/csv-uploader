import React from 'react';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';

var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style to.be ...
var should = chai.should();  // Using Should style
import NavHeader from "./NavHeader";
import App from "../App";

it("renders without crashing", () => {
    shallow(<NavHeader/>);
});
/*
it("renders", () => {
    const wrapper = shallow(<ErrorBox/>);
    const title = <h1>CSV File Upload</h1>
    expect(wrapper.contains(title)).to.equal(true);
});
*/

it("Has header", () => {
    const wrapper = shallow(<NavHeader />);
    expect(wrapper.find('header')).to.have.lengthOf(1);
});

it("renders title", () => {
    const wrapper = shallow(<NavHeader />);
    const h1 = wrapper.find('h1');
    expect(h1.text()).to.equal('CSV Uploader');
});

