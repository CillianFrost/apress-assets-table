import React from 'react';
import { connect } from 'react-redux';
import _isEqual from 'lodash/isEqual';
import { block } from '../utils';

const b = block('e-table');

class Exists extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  getExistenceLocale = (key) => {
    const locales = {
      available: 'в наличии',
      order: 'под заказ',
      not_available: 'нет в наличии',
      awaiting: 'ожидается поступление'
    };

    return locales[key];
  };

  render() {
    const { cell } = this.props;

    const existenceText =
      this.getExistenceLocale(cell.data.common.exists)
      || (<div className={b('cell-placeholder')}>{cell.placeholder}</div>);

    return (
      <div
        tabIndex={-1}
        ref={($td) => { $td && cell.isFocus && $td.focus(); }}
        className={b('cell').is({ focus: cell.isFocus, [cell.classMix]: true })}
      >
        {existenceText}
      </div>
    );
  }
}

export default connect()(Exists);
