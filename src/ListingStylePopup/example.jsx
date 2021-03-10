import React from 'react';
import {connect} from 'react-redux';
import ListingStylePopup from './ListingStylePopup';

class ListingStylePopupExample extends React.Component {
  render() {
    return (
      <div>
        <ListingStylePopup />
      </div>
    );
  }
}

export default connect()(ListingStylePopupExample);
