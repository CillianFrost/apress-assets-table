import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import _isEmpty from 'lodash/isEmpty';
import {objectToKeyValueArray} from './utils';
import DEFAULT_OPTIONS from './defaultOptions';

import {block} from '../utils';
import './e-listing-style-popup.scss';

import ListingTypeToggler from './ListingTypeToggler';
import ButtonTitleToggler from './ButtonTitleToggler';

import {showListingStylePopup} from './actions';
import {editRowsData, setCheckAllReset} from '../Table/actions';

const b = block('e-listing-style-popup');

class ListingStylePopup extends React.Component {
  state = {
    changingDataToSend: _isEmpty(this.props.listingStyleData.currentOptions) ?
      DEFAULT_OPTIONS :
      this.props.listingStyleData.currentOptions,
  };

  componentWillUnmount() {
    document.querySelector('body').classList.remove('not-scrollable');
  }

  setPopupRef = (element) => {
    this.popupRef = element;
  };

  popupRef = null;

  handleListingTypeChange = (titleSlug) => {
    this.setState(state => ({
      changingDataToSend: {...state.changingDataToSend, listing_type: titleSlug},
    }));
  }

  handleButtonTitleChange = (typeSlug) => {
    this.setState(state => ({
      changingDataToSend: {...state.changingDataToSend, button_title: typeSlug},
    }));
  }

  handleSave = () => {
    const {groupIds, cellName} = this.props.listingStyleData;
    const {changingDataToSend} = this.state;

    this.props.editRowsData(groupIds, changingDataToSend, cellName);
    this.props.showListingStylePopup();
    this.props.setCheckAllReset();
  }

  handleOutsideClick = (event) => {
    if (!this.popupRef || this.popupRef.contains(event.target)) { return; }

    this.props.showListingStylePopup();
  }

  render() {
    const {
      listing_types: listingTypes,
      button_titles: buttonTitles,
    } = this.props.listingStyleData.columnOptions;

    const {
      listing_type: currentType,
      button_title: currentTitle,
    } = this.state.changingDataToSend;

    return (
      <div
        className={b}
        onClick={this.handleOutsideClick}
      >
        <div
          className={`${b('content')}`}
          ref={this.setPopupRef}
        >
          <div className={b('content-titles')}>
            <div className={b('content-titles-title')}>
              Выбрать вид товаров
            </div>
            <div className={b('content-titles-name')}>
              Вид отображения товаров и название кнопки конверсионного действия
            </div>
          </div>
          <div className={b('content-settings')}>
            <ListingTypeToggler
              types={objectToKeyValueArray(listingTypes)}
              current={currentType}
              handleChange={this.handleListingTypeChange}
            />

            <ButtonTitleToggler
              titles={objectToKeyValueArray(buttonTitles)}
              current={currentTitle}
              handleChange={this.handleButtonTitleChange}
            />
          </div>
          <div className={b('content-buttons')}>
            <button
              className={b('content-buttons-save')}
              onClick={this.handleSave}
            >
              Сохранить
            </button>
            <button
              className={b('content-buttons-cancel')}
              onClick={() => this.props.showListingStylePopup()}
            >
              Закрыть
            </button>
          </div>
          <button
            className={b('content-close')}
            onClick={() => this.props.showListingStylePopup()}
          />
        </div>
      </div>
    );
  }
}

ListingStylePopup.propTypes = {
  showListingStylePopup: PropTypes.func.isRequired,
  editRowsData: PropTypes.func.isRequired,
  setCheckAllReset: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  listingStyleData: state.listingStyle,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  showListingStylePopup,
  editRowsData,
  setCheckAllReset,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListingStylePopup);
