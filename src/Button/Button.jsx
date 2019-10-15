import React from 'react';
import PropTypes from 'prop-types';
import { block } from '../utils';
import './e-button.scss';

const b = block('e-button');

const Button = (props) => {
  const { disabled, children, mix } = props;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={(e) => { e.preventDefault(); props.onClick(); }}
      className={b.mix(mix)}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  mix: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
  mix: '',
  children: null,
};

export default Button;
