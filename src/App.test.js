import React from 'react';
//import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style to.be ...
var should = chai.should();  // Using Should style
import App from './App';
import CsvUploadPage from "./pages/CsvUploadPage";

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

it("renders without crashing (enzyme)", () => {
  shallow(<App />);
});

it("renders menu title (enzyme)", () => {
  const wrapper = shallow(<App />);
  const title = <h1>CSV Uploader</h1>;
  expect(wrapper.contains(title)).to.equal(true);
});

it("Has header and main", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('main')).to.have.lengthOf(1);
  expect(wrapper.find('header')).to.have.lengthOf(1);
});

/*
it("Has CsvUploadPage component", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(CsvUploadPage)).to.have.lengthOf(1);
});
*/