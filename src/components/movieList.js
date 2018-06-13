import React from 'react';
import PropTypes from 'prop-types';

import MovieListItem from "./movieListItem";

const MovieList = (props) =>
    props.movieList ? props.movieList.map(movieListItem => <MovieListItem key={movieListItem.id+movieListItem.original_title} movieListItem={movieListItem} />)
    :
    'No result';

MovieList.propTypes = {
    movieList: PropTypes.array.isRequired
}

export default MovieList;