import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEqual from 'lodash/isEqual';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import Checkbox from '../Checkbox/Checkbox';
import { block } from '../utils';

const b = block('e-table');

export default class Header extends Component {
  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  mapFilterOptionsToMenu = (options) => options.map((option) => ({
    title: option.title,
    id: option.value,
  }));

  createCell = (cell, index, selectFilter, selectSort) => {
    const { countRow, table } = this.props;

    const renderFilterTitle = () => (
      <DropDownMenu
        title={cell.common.title}
        items={this.mapFilterOptionsToMenu(cell.filter.options)}
        onSelect={(id) => selectFilter({ id, name: cell.name })}
      >
        <div className={b('header-title').is({ filter: true })}>{cell.common.title}</div>
      </DropDownMenu>
    );

    const renderSorting = () => (
      <DropDownMenu
        title="Сортировать"
        items={[
          {
            title: 'Все',
            id: '',
          },
          {
            title: 'А - Я',
            id: 'up',
          },
          {
            title: 'Я - А',
            id: 'down',
          },
        ]}
        onSelect={(id) => selectSort({ id, name: cell.name })}
      >
        <div
          title={cell.sorter.direction === 'down' ? 'от А до Я' : 'от Я до А'}
          className={b('sorter').is({
            sorted: cell.sorter.direction,
            'sorted-down': cell.sorter.direction === 'down',
          })}
        />
      </DropDownMenu>
    );

    const renderSimpleTitle = () => (
      !cell.common.blank && <div className={b('header-title')}>{cell.common.title}</div>
    );

    return (
      <div key={index} className={b('header-cell').mix(`is-${cell.name.replace(/_/g, '-')}`)}>
        {cell.name === 'check'
        && (
          <Checkbox
            title="Выбрать все на странице"
            checked={countRow === table.checked.length}
            onChange={this.ckeckedAll}
          />
        )}
        {cell.filter ? renderFilterTitle() : renderSimpleTitle()}
        {cell.sorter && renderSorting()}
      </div>
    );
  };

  ckeckedAll = (checked) => {
    const { setCheckAll, table } = this.props;

    setCheckAll({ checked, id: table.rows.map((row) => row.check.common.id) });
  }

  render() {
    const { table, selectFilter, selectSort } = this.props;

    return (
      <div className={b('tr')}>
        {table.columns.map((cell, index) =>
          this.createCell(cell, index,
            selectFilter,
            selectSort,
          ))}
      </div>
    );
  }
}

Header.propTypes = {
  table: PropTypes.object,
};
