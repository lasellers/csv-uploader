import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style to.be ...
var should = chai.should();  // Using Should style
import CsvColumnMappingPage from "./CsvColumnMappingPage";

it("renders without crashing", () => {
    shallow(<CsvColumnMappingPage />);
});

it("renders menu title", () => {
    const wrapper = shallow(<CsvColumnMappingPage />);
    const title =  <h1>Remapping</h1>
    expect(wrapper.contains(title)).to.equal(true);
});
