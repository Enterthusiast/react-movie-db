import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Pagination from '../pagination';

let movieListPagination = {};

let change = (page) => {};

beforeEach(() => {
    movieListPagination = {
        previous: null,
        list: [],
        next: null,
        current: 1,
        total: 1
    };
    change = (page) => {};
});

describe('render', () => {
    it('shallow renders without crashing', () => {
        shallow(<Pagination {...movieListPagination} change={change} />);
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Pagination {...movieListPagination} change={change} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('previous button', () => {
    it('disabled with previous = null', () => {
        const wrapper = shallow(<Pagination {...movieListPagination} change={change} />);
        const selector = '.App-pagination-previous';
        expect(wrapper.find(selector)).toHaveClassName('disabled');
    });

    it('enabled with previous !== null', () => {
        movieListPagination.previous = 0;
        const wrapper = shallow(<Pagination {...movieListPagination} change={change} />);
        const selector = '.App-pagination-previous';
        expect(wrapper.find(selector)).not.toHaveClassName('disabled');
    });
    
    it('onClick to be null with previous = null', () => {
        const wrapper = shallow(<Pagination {...movieListPagination} change={change} />);
        const selector = '.App-pagination-previous > a';
        expect(wrapper.find(selector)).toHaveProp('onClick', null);
    });
    
    it('onClick to be a function with previous !== null', () => {
        movieListPagination.previous = 0;
        const wrapper = shallow(<Pagination {...movieListPagination} change={change} />);
        const selector = '.App-pagination-previous > a';
        expect(wrapper.find(selector).prop('onClick')).not.toBeNull();
    });
});

describe('next button', () => {
    it('to be disabled with next = null', () => {
        const wrapper = shallow(<Pagination {...movieListPagination} change={change} />);
        const selector = '.App-pagination-next';
        expect(wrapper.find(selector)).toHaveClassName('disabled');
    });
    
    it('to be disabled with next !== null', () => {
        movieListPagination.next = 0;
        const wrapper = shallow(<Pagination {...movieListPagination} change={change} />);
        const selector = '.App-pagination-next';
        expect(wrapper.find(selector)).not.toHaveClassName('disabled');
    });

    it('onClick to be null with next = null', () => {
        const wrapper = shallow(<Pagination {...movieListPagination} change={change} />);
        const selector = '.App-pagination-next > a';
        expect(wrapper.find(selector)).toHaveProp('onClick', null);
    });
    
    it('onClick to be a function with next !== null', () => {
        movieListPagination.next = 0;
        const wrapper = shallow(<Pagination {...movieListPagination} change={change} />);
        const selector = '.App-pagination-next > a';
        expect(wrapper.find(selector).prop('onClick')).not.toBeNull();
    });
});

describe('page list', () => {
    it('length to be 0 with list = []', () => {
        const wrapper = shallow(<Pagination {...movieListPagination} change={change} />);
        const selector = '.App-pagination-page';
        expect(wrapper.find(selector).length).toBe(0);
    });
    
    it('length to be 5 with list = [1,2,3,4,5]', () => {
        movieListPagination.list = [1,2,3,4,5];
        const wrapper = shallow(<Pagination {...movieListPagination} change={change} />);
        const selector = '.App-pagination-page';
        expect(wrapper.find(selector).length).toBe(5);
    });
    
    it('button 3 to be active with current = 3', () => {
        movieListPagination.list = [1,2,3,4,5];
        movieListPagination.current = 3;
        const wrapper = shallow(<Pagination {...movieListPagination} change={change} />);
        const selector = '.App-pagination-page .active';
        expect(wrapper.find(selector)).toHaveText('3');
    });
});