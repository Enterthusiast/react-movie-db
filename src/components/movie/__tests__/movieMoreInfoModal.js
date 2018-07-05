import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import MovieMoreInfoModal from '../movieMoreInfoModal';
jest.mock('../../../containers/movie/movieMoreInfo');

let props = {
  movieId: 1,
  getMovieDetails: () => {},
  clearMovieDetails: () => {}
}

describe('render', () => {
  it('shallow renders without crashing', () => {
    shallow(<MovieMoreInfoModal {...props} />);
  });
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MovieMoreInfoModal {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('id', () => {
  it('show card action with "more info" button if truthy', () => {
    const selector = '.App-more-button button';
    const wrapper = mount(<MovieMoreInfoModal {...props} />);
    expect(wrapper.find(selector)).toHaveText('More Info');
  });
  it('show empty card action if falsy', () => {
    props.movieId = 0;

    const wrapper = mount(<MovieMoreInfoModal {...props} />);
    expect(wrapper).toBeEmptyRender();
  });
});