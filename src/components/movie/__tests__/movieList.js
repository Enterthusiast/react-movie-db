import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import {ProgressBar} from 'react-materialize';

import MovieList from '../movieList';
jest.mock('../movieListItem');

let props = {};
beforeEach(() => {
	props = {
		apiStatus: {
			apiLoadingStatus: false
		},
		movieList: []
	};
})

describe('render', () => {
  it('shallow renders without crashing', () => {
    shallow(<MovieList {...props} />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MovieList {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('movie list', () => {
  it('to show a list of movieListItem if the list is populated', () => {
    props.movieList = [{original_title: 'movie 1', id: 1}, {original_title: 'movie 2', id: 2}, {original_title: 'movie 3', id: 3}];
  
    const wrapper = mount(<MovieList {...props} />);
    const selector = 'MovieListItem';
    expect(wrapper.find(selector).length).toBe(3);
  });
});

describe('api loading and movie list empty', () => {
  it('to show a progress bar if loading', () => {
    props.apiStatus.apiLoadingStatus = true;

    const wrapper = shallow(<MovieList {...props} />);
    expect(wrapper).toContainReact(<ProgressBar />);
  });

  it('to show no result message if not loading', () => {
    const wrapper = shallow(<MovieList {...props} />);
    const selector = '.App-movieList-no-result';
    expect(wrapper.find(selector)).toContainReact(<b>No result.</b>);
  });
});

