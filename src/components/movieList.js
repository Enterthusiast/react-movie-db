import React from 'react';

import MovieListItem from "./movieListItem";

export default (props) => {
    return props.movieList ? props.movieList.map(movieListItem => {
        return <MovieListItem key={movieListItem.id+movieListItem.original_title} movieListItem={movieListItem} />
    })
    :
    'No result'
}