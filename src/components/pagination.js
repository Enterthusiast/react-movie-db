import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Pagination = (props) => <div>
        <ul className="App-pagination pagination center-align">
            <li className="waves-effect"><a onClick={(e) => props.updateMovieList(1)}>first</a></li>
            <li className={`App-pagination-previous ${props.previous !== null ? "waves-effect" : "disabled"}`}><a onClick={props.previous !== null ? (e) => props.updateMovieList(props.previous) : null}><i className="material-icons">chevron_left</i></a></li>

            {props.list ? props.list.map(page => <li key={page} className={`App-pagination-page ${props.current === page ? "active" : "waves-effect"}`}><a onClick={(e) => props.updateMovieList(page)}>{page}</a></li>) : null}

            <li className={`App-pagination-next ${props.next !== null ? "waves-effect" : "disabled"}`}><a onClick={props.next !== null ? (e) => props.updateMovieList(props.next) : null}><i className="material-icons">chevron_right</i></a></li>
            <li className="waves-effect"><a onClick={(e) => props.updateMovieList(props.total)}>last</a></li>
        </ul>
    </div>;

export default Pagination;

Pagination.propTypes = {
    previous: PropTypes.number,
    list: PropTypes.array.isRequired,
    current: PropTypes.number.isRequired,
    next: PropTypes.number,
}