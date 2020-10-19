import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { cleanup } from '@testing-library/react';
import { Row } from 'antd';
import { useHistory } from 'react-router-dom';

import { RenderWritingSub } from '../components/pages/WritingSub/RenderWritingSub';
import InstructionsModal from '../components/common/InstructionsModal';
import Header from '../components/common/Header';

configure({ adapter: new Adapter() });

afterEach(() => {
  cleanup();
});

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('<RenderWritingSub />', () => {
  let wrapper;

  it('Should render <SubmissionModal />', () => {
    wrapper = shallow(
      <RenderWritingSub instructions={() => {}} tasks={{ story: {} }} />
    );
    wrapper.setProps({ instructions: { inst: '' } });
    expect(wrapper.find(InstructionsModal)).toHaveLength(1);
  });
  it('Should render <Header />', () => {
    wrapper = shallow(
      <RenderWritingSub title={() => {}} tasks={{ story: {} }} />
    );
    wrapper.setProps({ title: { title: '' } });
    expect(wrapper.find(Header)).toHaveLength(1);
  });
  it('should render a Button in the antD form', () => {
    wrapper = shallow(<RenderWritingSub tasks={{ story: {} }} />);
    expect(wrapper.find(Row)).toHaveLength(1);
  });
});
