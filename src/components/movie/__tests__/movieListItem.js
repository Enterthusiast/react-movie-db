import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import MovieListItem from '../movieListItem';
jest.mock('../../../containers/movie/movieMoreInfoModal');

describe('render', () => {
  it('shallow renders without crashing', () => {
    shallow(<MovieListItem movieListItem={{ id: 1 }} />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MovieListItem movieListItem={{ id: 1 }} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('vote', () => {
  it('show a # percentage if vote_average and vote_count are falsy', () => {
    const wrapper = mount(<MovieListItem movieListItem={{ vote_average: 0, vote_count: 0, id: 1 }} />);
    const selector = '.App-movieListItem-vote';
    expect(wrapper.find(selector)).toHaveText('#');
  });
  it('show a percentage if vote_average and vote_count are truthy', () => {
    const wrapper = mount(<MovieListItem movieListItem={{ vote_average: 6.6, vote_count: 6, id: 1 }} />);
    const selector = '.App-movieListItem-vote';
    expect(wrapper.find(selector)).toHaveText('66%');
  });
});

describe('release_date', () => {
  it('show release date if truthy', () => {
    const wrapper = mount(<MovieListItem movieListItem={{ release_date: '1984-10-31', id: 1 }} />);
    const selector = '.App-movieListItem-release';
    expect(wrapper.find(selector)).toHaveText('1984-10-31');
  });
  it('show None if falsy', () => {
    const wrapper = mount(<MovieListItem movieListItem={{ id: 1 }} />);
    const selector = '.App-movieListItem-release';
    expect(wrapper.find(selector)).toHaveText('None');
  });
});

describe('overview', () => {
  it('truncate overview over 184 char to 184 char + "..."', () => {
    const overview = "A volcanic eruption threatens the remaining dinosaurs on the island of Isla Nublar, where the creatures have freely roamed for several years after the demise of an animal theme park known as Jurassic World. Claire Dearing, the former park manager, has now founded the Dinosaur Protection Group, an organization dedicated to protecting the dinosaurs. To help with her cause, Claire has recruited Owen Grady, a former dinosaur trainer who worked at the park, to prevent the extinction of the dinosaurs once again.";
    const wrapper = mount(<MovieListItem movieListItem={{ overview: overview, id: 1}} />);
    const selector = '.App-card-overview';
    const truncatedOverview = overview.substr(0,184) + "..."
    expect(wrapper.find(selector).text()).toBe(truncatedOverview);
  });
});

// TODO: make this test work
// Everything ok at runtime, the node is removed
// However the callback is called during the test too
// but the node is not removed :(
// describe('poster path', () => {
//   it('do not show an image with unreachable path', () => {
//     const wrapper = mount(<MovieListItem movieListItem={{ poster_path: 'bad_path' }} />);
//     const selector = 'img';
//     wrapper.find(selector).simulate('error');
//     console.log(wrapper.debug());
//     expect(wrapper.find(selector)).not.toExist();
//   })
// });