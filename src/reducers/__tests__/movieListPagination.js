import movieListPagination from '../movieListPagination';
import { CHANGE_PAGE } from '../../actions/actions';

describe('movieListPagination', () => {
    it('return initial state', () => {
        expect(movieListPagination(undefined, {})).toEqual({
            previous: null,
            list: [],
            next: null,
            current: 1,
            total: 1
        });
    });

    it('handle CHANGE_PAGE', () => {
        const pagination = {
            current: 5,
            list: [3,4,5,6,7],
            next: 6,
            previous: 4,
            total: 10
        };
        
        expect(movieListPagination(undefined, { 
            type: CHANGE_PAGE,
            pagination
        })).toEqual({
            ...pagination
        });
    });
});