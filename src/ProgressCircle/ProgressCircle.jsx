import React from 'react';
import PropTypes from 'prop-types';

import { Circle } from 'rc-progress';
import { block } from '../utils';
import './e-progress-circle.scss';

const b = block('e-progress-circle');

const ProgressCircle = (props) => {
  const { mix, percent } = props;

  return (
    <div className={b.mix(mix)}>
      <div className={b('box')}>
        <Circle
          percent={percent}
          strokeWidth="10"
          strokeLinecap="square"
          strokeColor="#e0e0e0"
        />
      </div>
      <div className={b('text')}>
        <b>{percent}</b>
        <span className={b('sumbol')}>%</span>
      </div>
    </div>
  );
};

ProgressCircle.propTypes = {
  mix: PropTypes.string,
  percent: PropTypes.number,
};

ProgressCircle.defaultProps = {
  mix: '',
  percent: null,
};

export default ProgressCircle;
