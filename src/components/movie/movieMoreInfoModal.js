import React from 'react';
import PropTypes from 'prop-types';

import {Button, Modal} from 'react-materialize';

import MovieDetailsContext from '../../contexts/movieDetailsContext';
import MovieMoreInfo from '../../containers/movie/movieMoreInfo';

const MovieMoreInfoModal = (props) =>
    props.movieId ?
        <MovieDetailsContext.Consumer>
            {({ getMovieDetails }) => 
                <Modal
                    header=""
                    fixedFooter
                    trigger={<Button waves="light" className="App-more-button">More Info</Button>}
                    modalOptions={{
                        ready: () => { getMovieDetails(props.movieId) },
                        complete: () => { props.clearMovieDetails() }
                    }}>
                    <MovieMoreInfo />
                </Modal>
            }
        </MovieDetailsContext.Consumer>
        :
        null;
        
MovieMoreInfoModal.propTypes = {
    movieId: PropTypes.number.isRequired,
    clearMovieDetails: PropTypes.func.isRequired
}

export default MovieMoreInfoModal;