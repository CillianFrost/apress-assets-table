import * as types from './actions';

const initialState = {
  isPaymentDeliveryVisible: false,
  data: [],
  groupId: null,
  name: null,
};

export default function paymentDelivery(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_PAYMENT_DELIVERY_POPUP:
      return {
        ...state,
        isPaymentDeliveryVisible: action.isVisible,
      };

    case types.SEND_DATA_TO_PAYMENT_DELIVERY_POPUP:
      return {
        ...state,
        data: action.payload.data,
        groupId: action.payload.groupId,
        name: action.payload.name,
      };

    default:
      return state;
  }
}
