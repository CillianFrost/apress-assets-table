import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _isEqual from 'lodash/isEqual';
import _isEmpty from 'lodash/isEmpty';

import {block} from '../utils';
import {
  showListingStylePopup,
  sendDataToListingStylePopup,
} from '../ListingStylePopup/actions';

const b = block('e-table');

class listingStyleCell extends Component {
  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  handleClick = () => {
    const {
      id: groupId,
      data: {common: currentOptions},
      name: cellName,
    } = this.props.cell;

    this.props.sendDataToListingStylePopup(
      [groupId],
      currentOptions,
      cellName,
      this.props.columnOptions
    );

    this.props.showListingStylePopup(true);

    document.querySelector('body').classList.add('not-scrollable');
  };

  render() {
    const {
      classMix,
      isFocus,
      data: {common: currentOptions},
    } = this.props.cell;

    const {
      listing_types: listingTypes,
      button_titles: buttonTitles,
    } = this.props.columnOptions;

    return (
      <div
        className={b('cell').mix(`is-${classMix}`)
        .is({focus: isFocus})}
      >
        <button
          onClick={this.handleClick}
          type='button'
          className={b('listing-style-cell')}
        >
          {_isEmpty(currentOptions)
            ? 'Настроить вид товаров'
            : (
              <span>
                <div className={b('listing-style-cell-item')}>
                  <span className={b('listing-style-cell-title')}>Вид:</span>
                  <span className={b('listing-style-cell-content')}>
                    {listingTypes[currentOptions.listing_type]}
                  </span>
                </div>
                <div className={b('listing-style-cell-item')}>
                  <span className={b('listing-style-cell-title')}>Действие:</span>
                  <span className={b('listing-style-cell-content')}>
                    «{buttonTitles[currentOptions.button_title]}»
                  </span>
                </div>
              </span>
            )
          }
        </button>
      </div>
    );
  }
}

listingStyleCell.propTypes = {
  cell: PropTypes.shape({
    classMix: PropTypes.string.isRequired,
    isFocus: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      common: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
  showListingStylePopup: PropTypes.func.isRequired,
  sendDataToListingStylePopup: PropTypes.func.isRequired,
  columnOptions: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  showListingStylePopup,
  sendDataToListingStylePopup,
}, dispatch);

export default connect(null, mapDispatchToProps)(listingStyleCell);