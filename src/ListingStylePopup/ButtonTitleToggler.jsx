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
      {props.titles.map(({key, value}) => (
        <option
          key={key}
          value={key}
          selected={key === props.current && 'selected'}
        >
          {value}
        </option>
      ))}
    </select>
  </div>
);

ButtonTitleToggler.propTypes = {
  current: PropTypes.string.isRequired,
  titles: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ButtonTitleToggler;
