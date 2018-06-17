import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import MovieMoreInfoModal from '../movieMoreInfoModal';

describe('render', () => {
  it('shallow renders without crashing', () => {
    shallow(<MovieMoreInfoModal movieId={1} />);
  });
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MovieMoreInfoModal movieId={1} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('id', () => {
  it('show empty card action if falsy', () => {
    const wrapper = mount(<MovieMoreInfoModal  movieId={0}/>);
    expect(wrapper).toBeEmptyRender();
  });
});