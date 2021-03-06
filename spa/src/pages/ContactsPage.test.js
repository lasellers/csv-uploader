import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style to.be ...
var should = chai.should();  // Using Should style
import ContactsPage from "./ContactsPage";

it("renders without crashing", () => {
    shallow(<ContactsPage />);
});

it("renders menu title", () => {
    const wrapper = shallow(<ContactsPage />);
    const title =  <h1>Contacts</h1>
    expect(wrapper.contains(title)).to.equal(true);
});
/*
it("Has back nav button", () => {
    const wrapper = shallow(<ContactsPage />);
    const button = wrapper.find('.btn-secondary');
    expect(button.text()).to.equal('Back');
});
it("Has next nav button", () => {
    const wrapper = shallow(<div><button className='btn btn-primary'>Next</button></div>);
    //const wrapper = shallow(<ContactsPage />);
    console.log(wrapper);
    //const button = wrapper.find('.btn-primary');
    const button = wrapper.find({ class:'btn btn-primary'});
    expect(button.text()).to.equal('Next');
});
*/
/*
it("Has CsvUploadPage component", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(CsvUploadPage)).to.have.lengthOf(1);
});
it("Has Upload button", () => {
  const wrapper = shallow(<App />);
  const text = <button>Upload</button>;
  expect(wrapper.contains(text)).to.equal(true);
});

it("Has Choose File button", () => {
  const wrapper = shallow(<App />);
  const text = <input type="file" />;
  expect(wrapper.contains(text)).to.equal(true);
});
*/