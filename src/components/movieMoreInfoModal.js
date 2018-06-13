import React from 'react';
import PropTypes from 'prop-types';

import {Button, Modal} from 'react-materialize';

import MovieDetailsContext from '../contexts/movieDetailsContext';
import MovieMoreInfo from './movieMoreInfo';

const MovieMoreInfoModal = (props) =>
    props.movieId ?
    <MovieDetailsContext.Consumer>
        {({movieDetails, getMovieDetails, deleteMovieDetails}) => 
            <Modal
                header=''
                fixedFooter
                trigger={<Button>More Info</Button>}
                modalOptions={{
                    ready: () => { getMovieDetails(props.movieId) },
                    complete: () => { deleteMovieDetails() }
                }}>
                <MovieMoreInfo movieDetails={movieDetails} />
            </Modal>
        }
    </MovieDetailsContext.Consumer>
    :
    '';

MovieMoreInfoModal.propTypes = {
    movieId: PropTypes.number.isRequired
}

export default MovieMoreInfoModal;