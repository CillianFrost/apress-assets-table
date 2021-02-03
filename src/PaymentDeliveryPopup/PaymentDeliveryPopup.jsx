import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import {block} from '../utils';
import './e-payment-delivery-popup.scss';

import OptionElement from '../OptionElement/OptionElement';

import {showPaymentDeliveryPopup} from './actions';
import {editPaymentDeliveryData} from '../Table/actions';

const b = block('e-payment-delivery-popup');

class PaymentDeliveryPopup extends React.Component {
  state = {
    changingDataToSend: [...this.props.paymentDeliveryData.data],
  };

  componentWillUnmount() {
    document.querySelector('body').classList.remove('not-scrollable');
  }

  setPopupRef = (element) => {
    this.popupRef = element;
  };

  popupRef = null;

  handleDataChange = (newValue, optionIndex, addressIndex = null) => {
    this.setState({
      changingDataToSend: this.returnChangedData(this.state.changingDataToSend, newValue, optionIndex, addressIndex),
    });
  }

  returnChangedData = (data, newValue, optionIndex, addressIndex) => {
    const changedData = [...data];
    const changedOption = Object.assign({}, changedData.splice(optionIndex, 1)[0]);

    if (addressIndex === null) {
      changedOption.selected = newValue;
      changedData.splice(optionIndex, 0, changedOption);
      return changedData;
    }

    const changedAddresses = [...changedOption.addresses];
    const changedAddress = Object.assign({}, changedAddresses.splice(addressIndex, 1)[0]);

    changedAddress.selected = newValue;
    changedAddresses.splice(addressIndex, 0, changedAddress);

    changedOption.addresses = changedAddresses;
    changedData.splice(optionIndex, 0, changedOption);

    return changedData;
  }

  handleSave = () => {
    const {groupId, name} = this.props.paymentDeliveryData;
    const {changingDataToSend} = this.state;

    this.props.editPaymentDeliveryData(groupId, changingDataToSend, name);
    this.props.showPaymentDeliveryPopup();
  }

  handleOutsideClick = (e) => {
    if (!this.popupRef || this.popupRef.contains(e.target)) { return; }

    this.props.showPaymentDeliveryPopup();
  }

  render() {
    const isPaymentText = this.props.paymentDeliveryData.name === 'payment_methods_unbinds';

    const mainDiffText = isPaymentText ? 'оплаты' : 'доставки';
    const hintDiffText = isPaymentText
                         ? 'Отключите способ оплаты, если он не должен примениться для товарной группы'
                         : 'Отключите способ доставки или пункт самовывоза, если он не должен примениться для товарной группы';

    const isEmptyData = !this.state.changingDataToSend.length;

    return (
      <div
        className={b}
        onClick={e => this.handleOutsideClick(e)}
      >
        <div className={b('content')} ref={this.setPopupRef}>
          <div className={b('content-titles')}>
            <div className={b('content-titles-title')}>
              Настроить условия {mainDiffText}
            </div>
            <div className={b('content-titles-name')}>
              Название товарной группы
            </div>
          </div>
          <div className={b('content-hint')}>
            <span>
              {hintDiffText}
            </span>
          </div>
          <div className={b('content-options')}>
            {isEmptyData && <h3>Условий {mainDiffText} нет</h3>}
            {this.state.changingDataToSend.map(({name, id, selected, addresses = []}, index) => (
              <OptionElement
                name={name}
                selected={selected}
                index={index}
                handleDataChange={this.handleDataChange}
                addresses={addresses}
                key={id}
              />
            ))}
          </div>
          <div className={b('content-extra-link')}>
            <a
              href={app.config.paymentDeliveryUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              Добавить или изменить способы {mainDiffText}
            </a>
          </div>
          <div className={b('content-buttons')}>
            {!isEmptyData && <button
              className={b('content-buttons-save')}
              onClick={this.handleSave}
            >
              Сохранить
            </button>}
            <button
              className={b('content-buttons-cancel')}
              onClick={() => this.props.showPaymentDeliveryPopup()}
            >
              {isEmptyData ? 'Закрыть' : 'Отменить'}
            </button>
          </div>
          <button
            className={b('content-close')}
            onClick={() => this.props.showPaymentDeliveryPopup()}
          />
        </div>
      </div>
    );
  }
}

PaymentDeliveryPopup.propTypes = {
  showPaymentDeliveryPopup: PropTypes.func.isRequired,
  editPaymentDeliveryData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  paymentDeliveryData: state.paymentDelivery,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  showPaymentDeliveryPopup,
  editPaymentDeliveryData,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDeliveryPopup);
