/* eslint react/no-unused-prop-types: 0 */
import React from 'react';
import { connect } from 'react-redux';
import _isEqual from 'lodash/isEqual';
import { setFocus } from './actions';
import Checkbox from '../Checkbox/Checkbox';
import { block } from '../utils';

const b = block('e-table');

class CheckRelatedProducts extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  handleCellClick = () => {
    const { dispatch, cell } = this.props;

    dispatch(setFocus({ name: cell.name, id: cell.id }));
  };

  handleChecked = (checked) => {
    const { relatedProducts, actions, cell } = this.props;

    if (checked) {
      relatedProducts.attendantProducts.length < 30
        && actions.add({
          relation: {
            position: relatedProducts.attendantProducts.length,
          },
          product: {
            id: cell.id,
            name: cell.data.common.title,
          }
      });
    } else {
      actions.remove(cell.id);
    }
  };

  handleKeyPress = (e) => {
    const { checked } = this.props;

    if (e.keyCode === 13) {
      setTimeout(() => { this.handleChecked(!checked); }, 100);
    }
  };

  render() {
    const { cell, binder, relatedProducts } = this.props;

    return (
      <div
        tabIndex={-1}
        ref={($td) => { $td && cell.isFocus && $td.focus(); }}
        className={b('cell').mix(`is-${cell.classMix}`).is({ focus: cell.isFocus })}
        onClick={binder && this.handleCellClick}
        onKeyDown={this.handleKeyPress}
        role="presentation"
      >
        <Checkbox
          onChange={this.handleChecked}
          mix="is-related-products-check"
          checked={!!relatedProducts.attendantProducts.find(
            (item) => item.product.id === cell.id
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  relatedProducts: state.relatedProducts,
});

export default connect(mapStateToProps)(CheckRelatedProducts);
