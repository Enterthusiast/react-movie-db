import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import MovieMoreInfoModal from '../movieMoreInfoModal';

it('shallow renders without crashing', () => {
  shallow(<MovieMoreInfoModal movieId={0} />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MovieMoreInfoModal movieId={0} />, div);
  ReactDOM.unmountComponentAtNode(div);
});