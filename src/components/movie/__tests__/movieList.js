import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import MovieList from '../movieList';

it('shallow renders without crashing', () => {
  shallow(<MovieList movieList={[]} />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MovieList movieList={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});