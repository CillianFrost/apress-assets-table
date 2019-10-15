import React from 'react';
import PropTypes from 'prop-types';
import './e-toggler.scss';

const Toggler = (props) => {
  const { onToggle, title } = props;

  return (
    <div
      onClick={onToggle}
      className="e-toggler"
      title={title}
      role="presentation"
    />
  );
};

Toggler.propTypes = {
  onToggle: PropTypes.func.isRequired,
  title: PropTypes.string,
};

Toggler.defaultProps = {
  disabled: false,
  onClick: () => {},
};

export default Toggler;
