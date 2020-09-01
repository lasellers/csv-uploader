import React from 'react';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style to.be ...
var should = chai.should();  // Using Should style
import CsvUploadPage from "./CsvUploadPage";

it("renders without crashing", () => {
    shallow(<CsvUploadPage/>);
});

it("renders menu title", () => {
    const wrapper = shallow(<CsvUploadPage/>);
    const title = <h1>CSV File Upload</h1>
    expect(wrapper.contains(title)).to.equal(true);
});

it("Has file button", () => {
    const wrapper = shallow(<CsvUploadPage/>);
    const button = wrapper.find('.btn-secondary');
    expect(button.text()).to.equal('');
});

it("Has upload button", () => {
    const wrapper = shallow(<CsvUploadPage/>);
    // console.log(wrapper.debug());
    const button = wrapper.find('.btn-primary');
    expect(button.text()).to.equal('Upload');
});
