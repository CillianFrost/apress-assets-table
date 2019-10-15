import React from 'react';
import PropTypes from 'prop-types';
import _throttle from 'lodash/throttle';
import _isEqual from 'lodash/isEqual';
import { block } from '../utils';
import './e-search.scss';

const b = block('e-search');

export default class Search extends React.Component {
  handlerKeyUp = _throttle((value) => this.props.onChange(value), 500);

  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  render() {
    return (
      <input
        className={b()}
        onKeyUp={(e) => this.handlerKeyUp(e.target.value)}
      />
    );
  }
}

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
};
