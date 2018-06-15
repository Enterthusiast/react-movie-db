import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import MovieMoreInfo from '../movieMoreInfo';

it('shallow renders without crashing', () => {
  shallow(<MovieMoreInfo movieDetails={{}} />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MovieMoreInfo movieDetails={{}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});