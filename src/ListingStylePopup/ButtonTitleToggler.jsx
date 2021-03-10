import React from 'react';
import PropTypes from 'prop-types';
import {block} from '../utils';

const b = block('e-listing-style-popup');

const ButtonTitleToggler = props => (
  <div className={b('content-option-item')}>
    <div className={b('content-option-title')}>Название кнопки:</div>
    <select
      className={b('content-option-select')}
      onClick={(event) => { props.handleChange(event.target.value); }}
    >
      {props.titles.map(entry => (
        <option
          key={entry[0]}
          value={entry[0]}
          selected={entry[0] === props.current && 'selected'}
        >
          {entry[1]}
        </option>
      ))}
    </select>
  </div>
);

ButtonTitleToggler.propTypes = {
  current: PropTypes.string.isRequired,
  titles: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ButtonTitleToggler;
