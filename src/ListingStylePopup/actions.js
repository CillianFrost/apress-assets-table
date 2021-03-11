export const SHOW_LISTING_STYLE_POPUP = 'SHOW_LISTING_STYLE_POPUP';
export const SEND_DATA_TO_LISTING_STYLE_POPUP = 'SEND_DATA_TO_LISTING_STYLE_POPUP';

export const showListingStylePopup = isVisible => ({
  type: SHOW_LISTING_STYLE_POPUP,
  isVisible,
});

export const sendDataToListingStylePopup = (groupIds, currentOptions, cellName, columnOptions) => ({
  type: SEND_DATA_TO_LISTING_STYLE_POPUP,
  groupIds,
  currentOptions,
  cellName,
  columnOptions,
});
