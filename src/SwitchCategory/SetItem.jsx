import React from 'react';
import PropTypes from 'prop-types';
import { block } from '../utils';
import Checkbox from '../Checkbox/Checkbox';

const bm = block('e-switch-cat-menu');

const SetItem = (props) => {
  const {
    onSelect,
    mix,
    checked,
    title,
    children,
  } = props;

  return (
    <div
      onClick={onSelect}
      className={bm('type').mix(mix)()}
      role="presentation"
    >
      <div className={bm('radio-set')()}>
        <Checkbox
          mix={bm('radio').mix('is-radio')()}
          checked={checked}
          onChange={() => {}}
        />
        <div>{title}</div>
      </div>
      <label
        className="e-label"
        htmlFor
      >
        <div className={bm('description')()}>
          {children}
        </div>
      </label>
    </div>
  );
};

SetItem.propTypes = {
  onSelect: PropTypes.func,
  mix: PropTypes.string,
  checked: PropTypes.bool,
  title: PropTypes.node,
};

export default SetItem;
