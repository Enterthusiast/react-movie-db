import { connect } from 'react-redux'
import MovieMoreInfo from '../../components/movie/movieMoreInfo'

const mapStateToProps = state => ({
    movieDetails: state.movieDetails
})

export default connect(
    mapStateToProps
)(MovieMoreInfo)