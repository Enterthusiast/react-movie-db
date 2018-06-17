import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import {ProgressBar} from 'react-materialize';

import MovieList from '../movieList';

describe('render', () => {
  it('shallow renders without crashing', () => {
    shallow(<MovieList movieList={[]} />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MovieList movieList={[]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('movie list', () => {
  it('to show a list of movieListItem if the list is populated', () => {
    const movieList = [{fake_title: 'movie 1', fake_id: 1}, {fake_title: 'movie 2', fake_id: 2}, {fake_title: 'movie 3', fake_id: 3}];
    const wrapper = mount(<MovieList movieList={movieList} />);
    const selector = 'MovieListItem';
    expect(wrapper.find(selector).length).toBe(3);
  });
});

describe('api loading and movie list empty', () => {
  it('to show a progress bar if loading', () => {
    const wrapper = shallow(<MovieList movieList={[]} apiLoading={true} />);
    expect(wrapper).toContainReact(<ProgressBar />);
  });

  it('to show no result message if not loading', () => {
    const wrapper = shallow(<MovieList movieList={[]} apiLoading={false} />);
    const selector = '.App-movieList-no-result';
    expect(wrapper.find(selector)).toContainReact(<b>No result.</b>);
  });
});

