import React from 'react';
//import { render } from '@testing-library/react';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';

var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style to.be ...
var should = chai.should();  // Using Should style
import ErrorBox from "./ErrorBox";

it("renders without crashing", () => {
    shallow(<ErrorBox/>);
});
/*
it("renders", () => {
    const wrapper = shallow(<ErrorBox/>);
    const title = <h1>CSV File Upload</h1>
    expect(wrapper.contains(title)).to.equal(true);
});
*/