import React from 'react';
import PropTypes from 'prop-types';
import { Option } from 'rc-select';
import { block } from '../utils';
import Select from '../ComboSelect/ComboSelect';

import './e-pagination.scss';

const b = block('e-pagination');

const Pagination = (props) => {
  const {
    activePage,
    items,
    onSelect,
    mix,
  } = props;

  const nextIsDisabled = activePage >= items;
  const prevIsDisabled = activePage === 1;

  const handleDicrement = (e) => !prevIsDisabled && onSelect({ page: activePage - 1 }, e);
  const handleIncrement = (e) => !nextIsDisabled && onSelect({ page: activePage + 1 }, e);

  const options = [];

  for (let page = 1; page <= props.items; ++page) {
    options.push(<Option key={page} text={page}>{page}</Option>);
  }

  return (
    <div className={b.mix(mix)}>
      <span
        onClick={handleDicrement}
        className={b('prev').is({ disabled: prevIsDisabled })}
        role="presentation"
      >
        Назад
      </span>
      <span>Страница:</span>
      <div className={b('select-count')}>
        <Select
          value={`${activePage}`}
          showSearch={false}
          style={{ width: 52 }}
          onChange={(val) => { props.onSelect({ page: Number(val) }); }}
          dropdownAlign={{ points: ['tc', 'bc'] }}
        >
          {options}
        </Select>
      </div>
      <span className={b('total')}>
        из&nbsp;
        {items}
      </span>
      <span
        onClick={handleIncrement}
        className={b('next').is({ disabled: nextIsDisabled })}
        role="presentation"
      >
        Вперед
      </span>
    </div>
  );
};

Pagination.propTypes = {
  items: PropTypes.number.isRequired,
  activePage: PropTypes.number,
  mix: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  activePage: 1,
  mix: '',
};

export default Pagination;
