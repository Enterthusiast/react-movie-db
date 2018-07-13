import React from 'react';
import PropTypes from 'prop-types';
import './pagination.css';

const Pagination = ({
  previous,
  list,
  current,
  next,
  total,
  updateMovieList,
}) => (
  <div>
    <ul className="App-pagination pagination center-align">
      <li className="waves-effect">
        <a /* eslint-disable-line  jsx-a11y/anchor-is-valid */
          role="button"
          tabIndex={0}
          onClick={() => updateMovieList(1)}
          onKeyUp={(e) => { if (e.which === 13) updateMovieList(1); }}
        >
          first
        </a>
      </li>
      <li className={`App-pagination-previous ${previous !== null ? 'waves-effect' : 'disabled'}`}>
        <a /* eslint-disable-line  jsx-a11y/anchor-is-valid */
          role="button"
          tabIndex={0}
          onClick={previous !== null ? () => updateMovieList(previous) : null}
          onKeyUp={(e) => { if (e.which === 13) updateMovieList(previous); }}
        >
          <i className="material-icons">
            chevron_left
          </i>
        </a>
      </li>

      {list ? list.map(page => (
        <li key={page} className={`App-pagination-page ${current === page ? 'active' : 'waves-effect'}`}>
          <a /* eslint-disable-line  jsx-a11y/anchor-is-valid */
            role="button"
            tabIndex={0}
            onClick={() => updateMovieList(page)}
            onKeyUp={(e) => { if (e.which === 13) updateMovieList(page); }}
          >
            {page}
          </a>
        </li>
      )) : null}

      <li className={`App-pagination-next ${next !== null ? 'waves-effect' : 'disabled'}`}>
        <a /* eslint-disable-line  jsx-a11y/anchor-is-valid */
          role="button"
          tabIndex={0}
          onClick={next !== null ? () => updateMovieList(next) : null}
          onKeyUp={(e) => { if (e.which === 13) updateMovieList(next); }}
        >
          <i className="material-icons">
            chevron_right
          </i>
        </a>
      </li>
      <li className="waves-effect">
        <a /* eslint-disable-line  jsx-a11y/anchor-is-valid */
          role="button"
          tabIndex={0}
          onClick={() => updateMovieList(total)}
          onKeyUp={(e) => { if (e.which === 13) updateMovieList(total); }}
        >
          last
        </a>
      </li>
    </ul>
  </div>
);

export default Pagination;

Pagination.propTypes = {
  previous: PropTypes.number,
  list: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  current: PropTypes.number.isRequired,
  next: PropTypes.number,
  total: PropTypes.number.isRequired,
  updateMovieList: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  previous: null,
  next: null,
};
