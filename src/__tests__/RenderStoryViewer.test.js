import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';

import RenderStoryViewer from '../components/pages/StoryPrompt/RenderStoryViewer';

import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const store = mockStore();

configure({ adapter: new Adapter() });

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => {
    return {
      authState: {},
      authService: {},
    };
  },
}));

const Component = () => {
  return (
    <Provider store={store}>
      <RenderStoryViewer />
    </Provider>
  );
};

describe('<RenderStoryViewer /> test suite', () => {
  it('does not render incorrect text', () => {
    const wrapper = shallow(<Component />);
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.contains(<h2>Welcome to React</h2>)).toEqual(false);
  });
});
