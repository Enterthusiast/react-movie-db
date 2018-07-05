import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import AppWrapper from '../appWrapper';
import { ProgressBar } from 'react-materialize';
jest.mock('../../containers/pagination');
jest.mock('../../containers/movie/movieList');

let props = {};
beforeEach(() => {
	props = {
    apiStatus: {
      apiLoadingStatus: false,
      apiErrorStatus: false,
      apiErrorConfigStatus: false,
      apiErrorDetails: {}
    },
    updateMovieList: () => {}
  }
})

describe('render', () => {
  it('shallow renders without crashing', () => {
    shallow(<AppWrapper {...props} />);
  });
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppWrapper {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('apiLoading', () => {
  it('show a progress bar if apiLoadingStatus is true', () => {
    props.apiStatus.apiLoadingStatus = true;

    const wrapper = mount(<AppWrapper {...props} />);
    wrapper.setState({apiLoading: true});
    expect(wrapper).toContainReact(<ProgressBar />);
  });
  it('show placeholder if apiLoadingStatus is false', () => {
    const wrapper = mount(<AppWrapper {...props} />);
    const selector = '.App-ProgressBar-placeholder';
    wrapper.setState({apiLoading: false});
    expect(wrapper.find(selector)).toExist();
  });
});

describe('apiErrorConfigStatus and apiErrorStatus', () => {
  describe('apiErrorConfigStatus true', () => {
    it('to render API Configuration Error with apiErrorStatus true ', () => {
      props.apiStatus.apiErrorConfigStatus = true;
      props.apiStatus.apiErrorStatus = true;

      const wrapper = mount(<AppWrapper {...props} />);
      expect(wrapper).toContainReact(<b>Couldn't reach the API to get the configuration.</b>);
    });
    it('to render nothing with apiErrorStatus false ', () => {
      props.apiStatus.apiErrorConfigStatus = true;

      const wrapper = mount(<AppWrapper {...props} />);
      const selector = '.App-content';
      expect(wrapper.find(selector)).toHaveText('');
    });
  })
  describe('apiErrorConfigStatus false', () => {
    it('to render API Error with apiErrorStatus true ', () => {
      props.apiStatus.apiErrorStatus = true;

      const wrapper = mount(<AppWrapper {...props} />);
      expect(wrapper).toContainReact(<b>API Error.</b>);
    });
    it('to render Pagination and MovieList with apiErrorStatus false ', () => {
      const wrapper = mount(<AppWrapper {...props} />);
      console.log(wrapper.debug())
      expect(wrapper.find('Pagination')).toBeTruthy();
      expect(wrapper.find('MovieList')).toBeTruthy();
    });
  });
});