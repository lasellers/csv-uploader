import React from 'react';
//import { render } from '@testing-library/react';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';

var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style to.be ...
var should = chai.should();  // Using Should style
import CsvUploadPage from "./CsvUploadPage";

/*
test('renders without crashing (testing library)', () => {
  const { getByText } = render(<App />);
});

test('renders menu title (testing library)', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/CSV Uploader/i);
  expect(linkElement).toBeInTheDocument();
});
*/

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
    //const wrapper = shallow(<div><button className='btn btn-primary'>Next</button></div>);
    const wrapper = shallow(<CsvUploadPage/>);
    console.log(wrapper);
    const button = wrapper.find('.btn-primary');
    expect(button.text()).to.equal('Upload');
});

/*
test('choose file', () => {
    const app = {setState: jest.fn()};
    const wrapper = shallow(<CsvUploadPage app={app}/>);
    wrapper.find('.btn-secondary').at(0).simulate('click');
    expect(app.setState).to.have.been.last.called.with({modalIsOpen: false});
});
*/
/*
test('upload', () => {
    const app = {setState: jest.fn()};
    const wrapper = shallow(<CsvUploadPage app={app}/>);
    wrapper.find('.btn-primary').simulate('click');
    //expect(app.setState).to.have.been.last.called.with({modalIsOpen: false});
});
*/
/*
it("Has Upload button", () => {
  const wrapper = shallow(<CsvUploadPage />);
  const text = <button>Upload</button>;
  expect(wrapper.contains(text)).to.equal(true);
});*/

/*
it("Has Choose File button", () => {
  const wrapper = shallow(<CsvUploadPage />);
  const text = <input type="file" />;
  expect(wrapper.contains(text)).to.equal(true);
});
*/
