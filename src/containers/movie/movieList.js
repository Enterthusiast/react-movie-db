import { connect } from 'react-redux';
import MovieList from '../../components/movie/movieList';

const mapStateToProps = state => ({
  movieList: state.movieList,
  apiStatus: state.apiStatus,
});

export default connect(
  mapStateToProps,
)(MovieList);
