import { combineReducers } from 'redux';
import movieList from './movieList';
import movieListPagination from './movieListPagination';
import movieDetails from './movieDetails';
import apiStatus from './apiStatus';

const moviedbApp = combineReducers({
    movieList,
    movieListPagination,
    movieDetails,
    apiStatus,
});

export default moviedbApp;