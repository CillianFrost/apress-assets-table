export const SHOW_PAYMENT_DELIVERY_POPUP = 'SHOW_PAYMENT_DELIVERY_POPUP';
export const SEND_DATA_TO_PAYMENT_DELIVERY_POPUP = 'SEND_DATA_TO_PAYMENT_DELIVERY_POPUP';
export const CHANGE_OPTION_DATA = 'CHANGE_OPTION_DATA';

export const showPaymentDeliveryPopup = isVisible => ({
  type: SHOW_PAYMENT_DELIVERY_POPUP,
  isVisible,
});

export const sendDataToPaymentDeliveryPopup = (groupId, data, name, groupName) => ({
  type: SEND_DATA_TO_PAYMENT_DELIVERY_POPUP,
  payload: {
    groupId,
    data,
    name,
    groupName,
  },
});
