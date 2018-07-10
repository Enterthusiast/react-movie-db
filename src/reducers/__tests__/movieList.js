import movieList from '../movieList';
import { UPDATE_MOVIE_LIST } from '../../actions/actions';

describe('movieList', () => {
    it('return initial state', () => {
        expect(movieList(undefined, {})).toEqual([]);
    });

    it('handle UPDATE_MOVIE_LIST', () => {
        const list = [
            { title: 'I am movie 1' },
            { title: 'I am movie 2' }
        ];
        
        expect(movieList(undefined, { 
            type: UPDATE_MOVIE_LIST,
            movieList: list
        })).toEqual([
            ...list
        ]);
    });
});