import React from 'react';

const MovieDetailsContext = React.createContext({
    movieDetails: {},
    getMovieDetails: () => {},
    deleteMovieDetails: () => {}
});

export default MovieDetailsContext;