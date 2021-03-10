import React from 'react';
import PropTypes from 'prop-types';
import {block} from '../utils';

const b = block('e-listing-style-popup');

const ListingTypeToggler = props => (
  <div className={b('content-option-item')}>
    <div className={b('content-option-title')}>Вид отображения:</div>
    {props.types.map(entry => (
      <button
        key={entry[0]}
        onClick={() => { props.handleChange(entry[0]); }}
        className={`
          ${b('content-option-type-button')}
          ${entry[0]}
          ${props.current === entry[0] ? 'active' : ''}
        `}
      >
        {entry[1]}
      </button>
    ))}
  </div>
);

ListingTypeToggler.propTypes = {
  current: PropTypes.string.isRequired,
  types: PropTypes.array.isRequired,
};

export default ListingTypeToggler;
