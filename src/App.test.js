import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style to.be ...
var should = chai.should();  // Using Should style
import App from './App';
import NavHeader from "./components/NavHeader";

it("renders without crashing", () => {
  shallow(<App />);
});

it("Has main", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('main')).to.have.lengthOf(1);
});

it("Has child component NavHeader", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(NavHeader)).to.have.lengthOf(1);
});
