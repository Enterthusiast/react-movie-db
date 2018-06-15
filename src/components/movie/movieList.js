import React from 'react';
import PropTypes from 'prop-types';

import {Button} from 'react-materialize';

import MovieListItem from "./movieListItem";

const MovieList = (props) =>
    (props.movieList && props.movieList.length) ? props.movieList.map(movieListItem => <MovieListItem key={movieListItem.id+movieListItem.original_title} movieListItem={movieListItem} />)
    :
    renderNoResult();

const renderNoResult = () =>
    <div className="card horizontal">
        <div className="card-content">
            <p>
                <b>No result.</b>
            </p>
            <br />
            <Button onClick={(e) => window.location.reload()}>Retry</Button>
        </div>
    </div>;

MovieList.propTypes = {
    movieList: PropTypes.array.isRequired
}

export default MovieList;