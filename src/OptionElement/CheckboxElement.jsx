import React from 'react';
import PropTypes from 'prop-types';
import {block} from '../utils';

const b = block('e-payment-delivery-popup');

class CheckboxElement extends React.Component {
  state = {
    isCheckboxActive: this.props.selected,
  };

  changeCheckboxState = () => {
    const newState = !this.state.isCheckboxActive;

    const {
      handleDataChange,
      optionIndex,
      index,
    } = this.props;

    this.setState({
      isCheckboxActive: newState,
    });

    handleDataChange(newState, optionIndex, index);
  };

  render() {
    const {name} = this.props;
    const {isCheckboxActive} = this.state;

    const checkedClass = isCheckboxActive && 'is-address-checked';

    return (
      <div className={b('content-options-line-addresses-block')}>
        <div
          className={`e-checkbox ${b('content-options-line-addresses-block-checkbox')} ${checkedClass}`}
          onClick={this.changeCheckboxState}
        />
        <div>{name || 'Новый адрес'}</div>
      </div>
    );
  }
}

CheckboxElement.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  handleDataChange: PropTypes.func.isRequired,
};

export default CheckboxElement;
