import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Trigger from 'rc-trigger';
import _isEqual from 'lodash/isEqual';
import 'rc-trigger/assets/index.css';
import Price from './Price';
import Exists from './Exists';
import CheckRelatedProducts from './CheckRelatedProducts';
import {
  block,
  inRange,
  swap
} from '../utils';
import Actions from '../Actions/Actions';
import * as remove from '../remove/actions';
import {
  CheckWithDragging,
  ImageWithDragging,
  PathWithDragging,
  TextWithDragging
} from './cellsWithDragging';

const b = block('e-table');

class Body extends Component {

  static propTypes= {
    actions: PropTypes.objectOf(PropTypes.func),
    config: PropTypes.objectOf(PropTypes.object),
    dispatch: PropTypes.func,
    placeholder: PropTypes.object,
    readonly: PropTypes.bool,
    scrollLeft: PropTypes.number,
    table: PropTypes.shape({
      checked: PropTypes.arrayOf(PropTypes.number),
      focus: PropTypes.shape({
        activeCell: PropTypes.string,
        activeRow: PropTypes.number,
        edit: PropTypes.bool,
        rows: PropTypes.array
      }),
      new_row: PropTypes.objectOf(PropTypes.object),
      rows: PropTypes.arrayOf(PropTypes.object),
      selected: PropTypes.shape({
        cellDragged: PropTypes.object,
        cellFrom: PropTypes.object,
        cellTo: PropTypes.object,
        isDragging: PropTypes.bool,
        isSelecting: PropTypes.bool
      })
    })
  };

  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  isCurrentCellLastInSelection = (rowIndex, columnIndex) => {
    const {isDragging, cellDragged, cellTo, cellFrom} = this.props.table.selected;
    const cells = [cellFrom, cellTo];
    if (isDragging) { cells.push(cellDragged); }
    const lastInSelection = cells.reduce((cell1, cell2) => (cell1.row > cell2.row ? cell1 : cell2));

    return lastInSelection.row === rowIndex && lastInSelection.column === columnIndex;
  };

  isCurrentCellDragged = (rowIndex, columnIndex) => {
    const {isDragging, cellDragged, cellTo, cellFrom} = this.props.table.selected;
    const [lowerCell, upperCell] = swap(cellFrom, cellTo, cellFrom.row < cellTo.row);
    let num;
    if (cellDragged.row > lowerCell.row) {
      num = lowerCell.row + 1;
    } else {
      if (cellDragged.row < upperCell.row) {
        num = upperCell.row - 1;
      } else {
        return false;
      }
    }

    return isDragging && cellTo.column === columnIndex && inRange(num, cellDragged.row, rowIndex);
  };

  isRowChecked = rowId => this.props.table.checked.includes(rowId);

  renderCell = (row, rowId, cell, columnIndex, rowIndex) => {
    const {placeholder, config, actions, table, readonly} = this.props;
    const {focus, selected} = table;
    const dataRow = {
      id: rowId,
      data: row[cell],
      name: cell,
      classMix: cell.replace(/_/g, '-'),
      placeholder: placeholder[cell],
      config: config[cell],
      isFocus: rowId === focus.activeRow && cell === focus.activeCell,
      isSelected: !readonly && selected.cellFrom.column === columnIndex &&
        inRange(selected.cellFrom.row, selected.cellTo.row, rowIndex),
      isLast: !readonly && this.isCurrentCellLastInSelection(rowIndex, columnIndex),
      isDragged: !readonly && this.isCurrentCellDragged(rowIndex, columnIndex),
      column: columnIndex,
      row: rowIndex,
      readonly
    };
    const tableWidth = Object.keys(row).length;
    const key = (rowIndex * tableWidth) + columnIndex;
    const componentsCell = {
      text: <TextWithDragging
        key={key}
        cell={dataRow}
        setData={actions.setText}
      />,
      check: <CheckWithDragging
        key={key}
        cell={dataRow}
        setCheck={actions.setCheck}
        checked={this.isRowChecked(rowId)}
      />,
      img: <ImageWithDragging
        key={key}
        cell={dataRow}
      />,
      path: <PathWithDragging
        key={key}
        cell={dataRow}
      />,
      price: <Price
        key={key}
        cell={dataRow}
      />,
      exists: <Exists
        key={key}
        cell={dataRow}
      />,
      check_related_products: <CheckRelatedProducts
        key={key}
        cell={dataRow}
        actions={actions.relatedProducts}
      />
    };

    return componentsCell[config[cell].type];
  };

  renderRow = (row, rowIndex) => {
    const {table, readonly, actions, dispatch, scrollLeft} = this.props;
    const rowId = row.check ? row.check.common.id : row.check_related_products.common.id;
    const rowHtml = (
      <div
        key={rowId}
        className={b('body-tr').is({
          checked: this.isRowChecked(rowId),
          new: String(rowId).includes('-')
        })}
      >
        {Object.keys(row).map((cell, index) => this.renderCell(row, rowId, cell, index, rowIndex))}
      </div>
    );

    return readonly ? (rowHtml) : (
      <Trigger
        key={rowId}
        action={['hover']}
        popup={<Actions
          mix={b('actions')()}
          actions={[
            {
              name: 'add',
              title: 'Добавить группу',
              onClick: () => actions.addNewRow({
                target: row,
                parent: row,
                new_row: table.new_row
              })
            },
            {
              name: 'delete',
              title: 'Удалить группу',
              onClick: () => {
                dispatch(remove.removeGroup({
                  id: rowId,
                  name: row.name.common.text,
                }));
              }
            },
          ]}
        />}
        popupAlign={{
          points: ['cl', 'cl'],
          destroyPopupOnHide: true,
          offset: [-12 + scrollLeft, 0],
          overflow: {
            adjustX: false,
            adjustY: false,
          },
        }}
      >
        {rowHtml}
      </Trigger>
    );
  };

  render() {
    return (
      <div className={b('body')}>
        {this.props.table.rows.map(this.renderRow)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cell: state.cell
});

export default connect(mapStateToProps)(Body);
