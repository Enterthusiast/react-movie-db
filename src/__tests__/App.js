import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import App from '../App';

import { ProgressBar } from 'react-materialize';

jest.mock('./../services/movieService')

describe('render', () => {
  it('shallow renders without crashing', () => {
    shallow(<App />);
  });
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    // Commented because of unmounting error with async setState call
    // The setState are made after movieService response
    // ReactDOM.unmountComponentAtNode(div);
  });
});

describe('getMovieServiceConfiguration', () => {
  it('set apiReady to true once configuration received', async () => {
    const wrapper = mount(<App />);
    await wrapper.instance().getMovieServiceConfiguration();
    const {apiReady} = wrapper.instance().state;
    expect(apiReady).toBe(true);
  });
});

describe('paginationDataBuilder', () => {
  it('return coherent but useless results with bad data', async () => {
    const dataList = {
      page: null,
      total_pages: null,
    }
    const wrapper = shallow(<App />);
    const paginationData = await wrapper.instance().paginationDataBuilder(dataList);
    const paginationDataExpected = {
      pagePrevious: null,
      pageNext: null,
      pageList: []
    };
    expect(paginationData).toEqual(paginationDataExpected);
  });
  it('return previous, next and list of pages with good data', async () => {
    const dataList = {
      page: 5,
      total_pages: 10,
    }
    const wrapper = shallow(<App />);
    const paginationData = await wrapper.instance().paginationDataBuilder(dataList);
    const paginationDataExpected = {
      pagePrevious: 4,
      pageNext: 6,
      pageList: [3,4,5,6,7]
    };
    expect(paginationData).toEqual(paginationDataExpected);
  });
  it('do not break on first page', async () => {
    const dataList = {
      page: 1,
      total_pages: 10,
    }
    const wrapper = shallow(<App />);
    const paginationData = await wrapper.instance().paginationDataBuilder(dataList);
    const paginationDataExpected = {
      pagePrevious: null,
      pageNext: 2,
      pageList: [1,2,3,4,5]
    };
    expect(paginationData).toEqual(paginationDataExpected);
  });
  it('do not break on last page', async () => {
    const dataList = {
      page: 10,
      total_pages: 10,
    }
    const wrapper = shallow(<App />);
    const paginationData = await wrapper.instance().paginationDataBuilder(dataList);
    const paginationDataExpected = {
      pagePrevious: 9,
      pageNext: null,
      pageList: [6,7,8,9,10]
    };
    expect(paginationData).toEqual(paginationDataExpected);
  });
  it('do not break on first page plus one', async () => {
    const dataList = {
      page: 2,
      total_pages: 10,
    }
    const wrapper = shallow(<App />);
    const paginationData = await wrapper.instance().paginationDataBuilder(dataList);
    const paginationDataExpected = {
      pagePrevious: 1,
      pageNext: 3,
      pageList: [1,2,3,4,5]
    };
    expect(paginationData).toEqual(paginationDataExpected);
  });
  it('do not break on last page minus one', async () => {
    const dataList = {
      page: 9,
      total_pages: 10,
    }
    const wrapper = shallow(<App />);
    const paginationData = await wrapper.instance().paginationDataBuilder(dataList);
    const paginationDataExpected = {
      pagePrevious: 8,
      pageNext: 10,
      pageList: [6,7,8,9,10]
    };
    expect(paginationData).toEqual(paginationDataExpected);
  });
});

describe('getMovieNowPlaying', () => {
  it('populate the state movieList and movieListPagination', async () => {
    const wrapper = shallow(<App />);
    await wrapper.instance().getMovieNowPlaying();
    expect(wrapper.instance().state.movieList).toEqual({
      results: [
        {original_title: 'movie 1', id: 1},
        {original_title: 'movie 2', id: 2},
        {original_title: 'movie 3', id: 3}
      ],
      page: 5,
      total_pages: 10
    });
    expect(wrapper.instance().state.movieListPagination).toEqual({
      previous: 4,
      list: [3,4,5,6,7],
      next: 6,
      current: 5,
      total: 10
    });
  });
});

describe('getMovieDetails', () => {
  it('populate the state movieDetails', async () => {
    const wrapper = shallow(<App />);
    await wrapper.instance().getMovieDetails();
    expect(wrapper.instance().state.movieDetails).toEqual({ original_title: 'title details' });
  });
});

describe('deleteMovieDetails', () => {
  it('set the state movieDetails to {}', async () => {
    const wrapper = shallow(<App />);
    await wrapper.instance().deleteMovieDetails();
    expect(wrapper.instance().state.movieDetails).toEqual({});
  });
});

describe('apiLoading', () => {
  it('show a progress bar if apiLoading is truthy', () => {
    const wrapper = mount(<App />);
    wrapper.setState({apiLoading: true});
    expect(wrapper).toContainReact(<ProgressBar />);
  });
  it('show placeholder if apiLoading is falsy', () => {
    const wrapper = mount(<App />);
    const selector = '.App-ProgressBar-placeholder';
    wrapper.setState({apiLoading: false});
    expect(wrapper.find(selector)).toExist();
  });
});

describe('apiReady and apiError', () => {
  describe('apiReady truthy', () => {
    it('to render API Error with apiError truthy ', () => {
      const wrapper = mount(<App />);
      wrapper.setState({apiLoading: false, apiReady: true, apiError: true});
      expect(wrapper).toContainReact(<b>API Error.</b>);
    });
  });
  describe('apiReady falsy', () => {
    it('to render API Configuration Error with apiError truthy ', () => {
      const wrapper = mount(<App />);
      wrapper.setState({apiLoading: false, apiReady: false, apiError: true});
      expect(wrapper).toContainReact(<b>Couldn't reach the API to get the configuration.</b>);
    });
  })
});