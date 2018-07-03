import { connect } from 'react-redux'
import MovieMoreInfoModal from '../../components/movie/movieMoreInfoModal'
import { clearMovieDetails } from '../../actions/actions'

const mapDispatchToProps = (dispatch, ownProps) => ({
    clearMovieDetails: () => {
        dispatch(clearMovieDetails())
    }
})

export default connect(
    null,
    mapDispatchToProps
)(MovieMoreInfoModal)