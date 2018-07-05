import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import {ProgressBar, Button} from 'react-materialize';
import MovieList from '../containers/movie/movieList';
import Pagination from '../containers/pagination';

class AppWrapper extends Component {

    componentWillMount() {
        this.props.updateMovieList();
    }

    renderAPIError() {
        return <div className="card horizontal">
            <div className="card-content">
            <p>
                <b>API Error.</b>
            </p>
            <br />
            <p>
                Error dump:
                <br />
                {JSON.stringify(this.props.apiStatus.apiErrorDetails)}
            </p>
            <br />
            <Button onClick={(e) => window.location.reload()}>Retry</Button>
            </div>
        </div>;
    }

    renderAPIConfigurationError() { 
        return <div className="card horizontal">
            <div className="card-content">
            <p>
                <b>Couldn't reach the API to get the configuration.</b>
            </p>
            <br />
            <p>
                Error dump:
                <br />
                {JSON.stringify(this.props.apiStatus.apiErrorDetails)}
            </p>
            <br />
            <Button onClick={(e) => window.location.reload()}>Retry</Button>
            </div>
        </div>;
    }

    renderMovieList() {
        return <React.Fragment>
            <Pagination />
            <MovieList />
            <Pagination />
        </React.Fragment>;
    }

    render() {
        return <div className="container">
            {this.props.apiStatus.apiLoadingStatus ? 
            <ProgressBar />
            :
            <div className="App-ProgressBar-placeholder"></div>}
            
            <header>
            <h1 className="App-title" onClick={(e) => this.props.updateMovieList()}>
                Movies in theater
            </h1>
            </header>
            <div className="App-content">
            {this.props.apiStatus.apiErrorConfigStatus ?
                // Error pre API configuration
                this.props.apiStatus.apiErrorStatus ?
                    this.renderAPIConfigurationError()
                    :
                    null
                :
                // Error post API configuration
                this.props.apiStatus.apiErrorStatus ?
                    this.renderAPIError()
                    :
                    this.renderMovieList()}
            </div>
        </div>;
    }
}

export default AppWrapper;
