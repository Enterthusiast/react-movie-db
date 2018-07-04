import { connect } from 'react-redux'
import MovieMoreInfoModal from '../../components/movie/movieMoreInfoModal'
import { updateMovieDetails, clearMovieDetails } from '../../actions/actions'
import movieServiceInitializer from '../../services/movieService';

const mapDispatchToProps = (dispatch, ownProps) => ({
    getMovieDetails: async (movieId) => {
        const movieService = await movieServiceInitializer();
        const movieDetails = await movieService.getMovieDetails(movieId);

        dispatch(updateMovieDetails(movieDetails));
    },
    clearMovieDetails: () => {
        dispatch(clearMovieDetails())
    }
})

export default connect(
    null,
    mapDispatchToProps
)(MovieMoreInfoModal)