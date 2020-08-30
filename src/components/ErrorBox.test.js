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

it("renders error", () => {
    const mockText = "Error: Lorem Ipsum";
    const wrapper = shallow(<ErrorBox error={mockText}/>);
    console.log( wrapper.debug() );
    const p = wrapper.find('p');
    expect(p.text()).to.equal(mockText);
});

it("renders NavHeader error", () => {
    const wrapper = shallow(<ErrorBox/>);
    console.log( wrapper.debug() );
    const p = wrapper.find('p');
    expect(p.text()).to.equal('');
});
