import React from 'react';

import statusTextViewPropType from '../propTypes';
import { block } from '../../../utils';
import '../styles/status-text.scss';


const b = block('status-text');

function StatusTextView(props) {
  const { status, text } = props;

  return (
    <div className={b.is({ [status]: true })}>
      {text}
    </div>
  );
}

StatusTextView.propTypes = statusTextViewPropType.isRequired;

export default StatusTextView;
