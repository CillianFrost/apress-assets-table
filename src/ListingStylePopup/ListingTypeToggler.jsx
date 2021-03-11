import React from 'react';
import PropTypes from 'prop-types';
import {block} from '../utils';

const b = block('e-listing-style-popup');

const ListingTypeToggler = props => (
  <div className={b('content-option-item')}>
    <div className={b('content-option-title')}>Вид отображения:</div>
    {props.types.map(({key, value}) => (
      <button
        key={key}
        onClick={() => { props.handleChange(key); }}
        className={`
          ${b('content-option-type-button')}
          ${key}
          ${props.current === key ? 'active' : ''}
        `}
      >
        {value}
      </button>
    ))}
  </div>
);

ListingTypeToggler.propTypes = {
  current: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
};

export default ListingTypeToggler;
