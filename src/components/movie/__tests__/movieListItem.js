import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import MovieListItem from '../movieListItem';

it('shallow renders without crashing', () => {
  shallow(<MovieListItem movieListItem={{}} />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MovieListItem movieListItem={{}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});