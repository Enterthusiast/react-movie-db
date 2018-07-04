import { connect } from 'react-redux'
import MovieMoreInfoModal from '../../components/movie/movieMoreInfoModal'
import { clearMovieDetails } from '../../actions/actions'
import getMovieDetailsLogic from '../logic/getMovieDetailsLogic'

const mapDispatchToProps = (dispatch, ownProps) => ({
    getMovieDetails: async (movieId) => {
        getMovieDetailsLogic(dispatch, movieId)
    },
    clearMovieDetails: () => {
        dispatch(clearMovieDetails())
    }
})

export default connect(
    null,
    mapDispatchToProps
)(MovieMoreInfoModal)