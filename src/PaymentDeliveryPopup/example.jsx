import React from 'react';
import {connect} from 'react-redux';
import PaymentDeliveryPopup from './PaymentDeliveryPopup';

class PaymentDeliveryPopupExample extends React.Component {
  render() {
    return (
      <div>
        <PaymentDeliveryPopup />
      </div>
    );
  }
}


export default connect()(PaymentDeliveryPopupExample);
