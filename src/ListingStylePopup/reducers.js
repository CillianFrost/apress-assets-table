import * as types from './actions';

const initialState = {
  isListingStyleVisible: false,
  currentOptions: {},
  groupIds: [],
  cellName: null,
  columnOptions: {},
};

export default function listingStyle(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_LISTING_STYLE_POPUP:
      return {
        ...state,
        isListingStyleVisible: action.isVisible,
      };

    case types.SEND_DATA_TO_LISTING_STYLE_POPUP:
      return {
        ...state,
        currentOptions: action.currentOptions,
        groupIds: action.groupIds,
        cellName: action.cellName,
        columnOptions: action.columnOptions,
      };

    default:
      return state;
  }
}
