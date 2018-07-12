import { UPDATE_MOVIE_LIST } from '../actions/actions';

const initialState = [];

const movieList = function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_MOVIE_LIST:
      return [
        ...action.movieList,
      ];
    default:
      return state;
  }
};

export default movieList;
