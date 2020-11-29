import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _isEqual from 'lodash/isEqual';

import {block} from '../utils';
import {
  showPaymentDeliveryPopup,
  sendDataToPaymentDeliveryPopup,
} from '../PaymentDeliveryPopup/actions';

const b = block('e-table');

class PaymentDeliveryCell extends Component {
  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  handleClick = () => {
    const {
      id,
      data: {common},
      name,
    } = this.props.cell;

    this.props.sendDataToPaymentDeliveryPopup(id, common, name);
    this.props.showPaymentDeliveryPopup(true);
  };

  render() {
    const {
      classMix,
      isFocus,
      data: {common},
      name,
    } = this.props.cell;

    const isPaymentText = name === 'payment_methods_unbinds';

    const titleDiffText = isPaymentText ? 'оплаты' : 'доставки';

    const selectedOptions = [...common].filter(item => item.selected);

    return (
      <div
        className={b('cell').mix(`is-${classMix}`)
        .is({focus: isFocus})}
      >
        <div>
          <span className='payment-cell-text'>
            {selectedOptions.map((item, index) => (
              item.selected ? `${item.name}${index === selectedOptions.length - 1 ? '' : ', '}` : ''
            ))}
          </span>
          <button
            onClick={this.handleClick}
            type='button'
            className='payment-cell-button'
          >
            Настроить условия {titleDiffText}
          </button>
        </div>
      </div>
    );
  }
}

PaymentDeliveryCell.propTypes = {
  cell: PropTypes.shape({
    classMix: PropTypes.string.isRequired,
    isFocus: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      common: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
  showPaymentDeliveryPopup: PropTypes.func.isRequired,
  sendDataToPaymentDeliveryPopup: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  showPaymentDeliveryPopup,
  sendDataToPaymentDeliveryPopup,
}, dispatch);

export default connect(null, mapDispatchToProps)(PaymentDeliveryCell);
