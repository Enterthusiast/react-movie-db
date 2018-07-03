import { connect } from 'react-redux'
import MovieList from '../../components/movie/movieList'

const mapStateToProps = state => ({
    movieList: state.movieList
})

export default connect(
    mapStateToProps
)(MovieList)