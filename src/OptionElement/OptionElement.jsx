import React from 'react';
import PropTypes from 'prop-types';

import {block} from '../utils';
import CheckboxElement from './CheckboxElement';

const b = block('e-payment-delivery-popup');

class OptionElement extends React.Component {
  state = {
    isOptionActive: this.props.selected,
  };

  changeOptionState = () => {
    const newState = !this.state.isOptionActive;

    this.setState({
      isOptionActive: newState,
    });

    this.props.handleDataChange(newState, this.props.index);
  };

  render() {
    const {name, addresses, handleDataChange, index} = this.props;
    const {isOptionActive} = this.state;

    const isAddressesVisible = !!addresses.length && isOptionActive;

    return (
      <div className={b('content-options-line')}>
        <div className={b('content-options-line-control')}>
          <button
            className={`${b('content-options-line-control-button')} ${isOptionActive && 'is-option-button-active'}`}
            onClick={this.changeOptionState}
          />
          <div className={b('content-options-line-control-text')}>{name}</div>
        </div>
        {isAddressesVisible && <div className={b('content-options-line-addresses')}>
          {addresses.map((address, i) => (
            <CheckboxElement
              name={address.name}
              selected={address.selected}
              index={i}
              optionIndex={index}
              handleDataChange={handleDataChange}
              key={address.id}
            />
          ))}
        </div>}
      </div>
    );
  }
}

OptionElement.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  handleDataChange: PropTypes.func.isRequired,
  addresses: PropTypes.array.isRequired,
};

export default OptionElement;
