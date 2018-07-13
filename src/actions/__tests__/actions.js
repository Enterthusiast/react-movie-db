import {
  changePage,
  updateMovieList,
  updateMovieDetails,
  clearMovieDetails,
  updateApiLoadingStatus,
  updateApiErrorStatus,
  updateApiErrorConfigStatus,
  updateApiErrorDetails,
} from '../actions';

describe('actions', () => {
  describe('changePage', () => {
    it('create an action to change the current page', () => {
      const pagination = 1;

      expect(changePage(pagination)).toEqual({
        pagination,
        type: 'CHANGE_PAGE',
      });
    });
  });
  describe('updateMovieList', () => {
    it('create an action to update the movie list', () => {
      const movieList = [
        { title: 'I am movie 1' },
        { title: 'I am movie 2' },
      ];

      expect(updateMovieList(movieList)).toEqual({
        movieList,
        type: 'UPDATE_MOVIE_LIST',
      });
    });
  });
  describe('updateMovieDetails', () => {
    it('create an action to update the details of the currently selected movie', () => {
      const movieDetails = {
        title: 'I am movie selected',
        details: 'Here some interesting details',
      };

      expect(updateMovieDetails(movieDetails)).toEqual({
        movieDetails,
        type: 'UPDATE_MOVIE_DETAILS',
      });
    });
  });
  describe('clearMovieDetails', () => {
    it('create an action to clear the details of a previously selected movie', () => {
      expect(clearMovieDetails()).toEqual({
        type: 'CLEAR_MOVIE_DETAILS',
      });
    });
  });
  describe('updateApiLoadingStatus', () => {
    it('create an action to update the api loading status', () => {
      const apiLoadingStatus = true;

      expect(updateApiLoadingStatus(apiLoadingStatus)).toEqual({
        apiLoadingStatus,
        type: 'UPDATE_API_LOADING_STATUS',
      });
    });
  });
  describe('updateApiErrorStatus', () => {
    it('create an action to update the api error status', () => {
      const apiErrorStatus = true;

      expect(updateApiErrorStatus(apiErrorStatus)).toEqual({
        apiErrorStatus,
        type: 'UPDATE_API_ERROR_STATUS',
      });
    });
  });
  describe('updateApiErrorConfigStatus', () => {
    it('create an action to update the api error status getting the api config', () => {
      const apiErrorConfigStatus = true;

      expect(updateApiErrorConfigStatus(apiErrorConfigStatus)).toEqual({
        apiErrorConfigStatus,
        type: 'UPDATE_API_ERROR_CONFIG_STATUS',
      });
    });
  });
  describe('updateApiErrorDetails', () => {
    it('create an action to update the api error details', () => {
      const apiErrorDetails = true;

      expect(updateApiErrorDetails(apiErrorDetails)).toEqual({
        apiErrorDetails,
        type: 'UPDATE_API_ERROR_DETAILS',
      });
    });
  });
});
