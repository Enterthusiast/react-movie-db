import React from 'react';
import PropTypes from 'prop-types';

import {Button, ProgressBar} from 'react-materialize';

import MovieListItem from "./movieListItem";

const MovieList = (props) =>
    (props.movieList && props.movieList.length) ? props.movieList.map(movieListItem => <MovieListItem key={movieListItem.id+movieListItem.original_title} movieListItem={movieListItem} />)
    :
    props.apiStatus.apiLoadingStatus ?
        <ProgressBar />
        :
        renderNoResult();

const renderNoResult = () =>
    <div className="card horizontal">
        <div className="card-content">
            <p className="App-movieList-no-result">
                <b>No result.</b>
            </p>
            <br />
            <Button onClick={(e) => window.location.reload()}>Retry</Button>
        </div>
    </div>;

MovieList.propTypes = {
    apiLoading: PropTypes.bool,
    movieList: PropTypes.array
}

export default MovieList;