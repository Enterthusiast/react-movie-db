import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends Component {
  render() {
    return <div>
            <ul className="pagination center-align">
                <li className="waves-effect"><a onClick={(e) => this.props.change(1)}>first</a></li>
                <li className={this.props.previous !== null ? "waves-effect" : "disabled"}><a onClick={this.props.previous !== null ? (e) => this.props.change(this.props.previous) : null}><i className="material-icons">chevron_left</i></a></li>

                {this.props.list ? this.props.list.map(page => <li key={page} className={this.props.current === page ? "active" : "waves-effect"}><a onClick={(e) => this.props.change(page)}>{page}</a></li>) : ''}

                <li className={this.props.next !== null ? "waves-effect" : "disabled"}><a onClick={this.props.next !== null ? (e) => this.props.change(this.props.next) : null}><i className="material-icons">chevron_right</i></a></li>
                <li className="waves-effect"><a onClick={(e) => this.props.change(this.props.total)}>last</a></li>
            </ul>
        </div>
  }
}

Pagination.propTypes = {
    change: PropTypes.func.isRequired,
    previous: PropTypes.number,
    list: PropTypes.array.isRequired,
    current: PropTypes.number.isRequired,
    next: PropTypes.number,
}