import React from 'react';
import PropTypes from 'prop-types';

import { block } from '../utils';

import './e-actions.scss';

const b = block('e-actions');

const Actions = (props) => {
  const { mix, actions } = props;

  return (
    <div className={b.mix(mix)}>
      {actions.map((action) => (
        <div
          key={action.name}
          onClick={action.onClick}
          onKeyPress={action.onClick}
          title={action.title}
          className={b('action').is({ [action.name]: true })}
          role="button"
          tabIndex="0"
          aria-label="Action"
        />
      ))}
    </div>
  );
};

Actions.propTypes = {
  mix: PropTypes.string,
  actions: PropTypes.shape.isRequired,
};

Actions.defaultProps = {
  mix: '',
};

export default Actions;
