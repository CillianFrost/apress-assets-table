import React from 'react';
import PropTypes from 'prop-types';
import { block } from '../utils';
import './e-checkbox.scss';

const b = block('e-checkbox');

const Checkbox = (props) => {
  const { checked, mix, title } = props;

  return (
    <div
      onClick={() => props.onChange(!checked)}
      className={b.is({ checked }).mix(mix)}
      title={title}
      onKeyPress={() => props.onChange(!checked)}
      role="button"
      tabIndex="0"
      aria-label="Action"
    />
  );
};


Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  mix: PropTypes.string,
  title: PropTypes.string,
};

Checkbox.defaultProps = {
  mix: '',
  title: '',
};

export default Checkbox;
