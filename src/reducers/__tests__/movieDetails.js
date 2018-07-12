import movieDetails from '../movieDetails';
import {
  UPDATE_MOVIE_DETAILS,
  CLEAR_MOVIE_DETAILS,
} from '../../actions/actions';

describe('movieDetails', () => {
  it('return initial state', () => {
    expect(movieDetails(undefined, {})).toEqual({});
  });

  it('handle UPDATE_MOVIE_DETAILS', () => {
    const details = {
      title: 'I am movie',
      details: 'wouh details here!',
    };

    expect(movieDetails(undefined, {
      type: UPDATE_MOVIE_DETAILS,
      movieDetails: details,
    })).toEqual({
      ...details,
    });
  });

  it('handle CLEAR_MOVIE_DETAILS', () => {
    expect(movieDetails(undefined, {
      type: CLEAR_MOVIE_DETAILS,
    })).toEqual({});
  });
});
