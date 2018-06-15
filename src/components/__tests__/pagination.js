import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Pagination from '../pagination';

let movieListPagination = {
    previous: 0,
    list: [0],
    next: 0,
    current: 0,
    total: 1
};

let change = () => {};

beforeEach(() => {
    movieListPagination = {
        previous: 0,
        list: [0],
        next: 0,
        current: 0,
        total: 1
    };
})

it('shallow renders without crashing', () => {
  shallow(<Pagination {...movieListPagination} change={change} />);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Pagination {...movieListPagination} change={change} />, div);
  ReactDOM.unmountComponentAtNode(div);
});