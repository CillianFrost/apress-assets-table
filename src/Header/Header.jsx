import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {block} from '../utils';
import Toggler from '../Toggler/Toggler';
import './e-header.scss';
import {getColumnByName} from './utils';

import {
  showListingStylePopup,
  sendDataToListingStylePopup,
} from '../ListingStylePopup/actions';

const b = block('e-header');

const Header = (props) => {
  const handleChangeListingStyleClick = () => {
    props.sendDataToListingStylePopup(
      props.table.checked,
      {},
      'listing_style',
      getColumnByName(props.table, 'listing_style').common,
    );

    props.showListingStylePopup(true);
  };

  return (
    <header className={b}>
      {!(props.toggler === undefined) &&
        <section className={b('box-1')}>
          <div className={b('swich-view')}>
            <div
              title='Редактор товарных групп'
              onClick={() => { props.toggler && props.onToggle(); }}
              className={b('swich-view-to-rocket')}
            />
            <Toggler
              title='Перейти в Редактор товаров и услуг'
              on={props.toggler} onToggle={props.onToggle}
            />
            <div
              title='Редактор товаров и услуг'
              onClick={() => { !props.toggler && props.onToggle(); }}
              className={b('swich-view-to-book')}
            />
          </div>
        </section>
      }
      <section className={b('box-2')}>
        <div className={b('title')}><b>Редактор</b> Товарных групп</div>
      </section>
      <section className={b('box-3')}>
        <nav className={b('nav')}>
          {false && props.onCallProductsAndGroups &&
            <div className={b('nav-box')}>
              <div className={b('nav-item')}>
                <a
                  onClick={(e) => { e.preventDefault(); props.onCallProductsAndGroups(); }}
                  className={b('nav-lnk')} href=''
                >
                  Товары и группы на Главной
                </a>
              </div>
            </div>
          }
          {props.onDeleteSelectedGroup &&
            <div className={b('nav-box')}>
              <div className={b('nav-item')}>
                <a
                  onClick={(e) => { e.preventDefault(); props.onDeleteSelectedGroup(); }}
                  className={b('nav-lnk')} href=''
                >
                  Удалить выбранные группы{' '}
                  {!!props.selectedGroupsCount && `(${props.selectedGroupsCount})`}
                </a>
              </div>
            </div>
          }
          {props.onDeleteEmptyGroup &&
            <div className={b('nav-box')}>
              <div className={b('nav-item')}>
                <a
                  onClick={(e) => { e.preventDefault(); props.onDeleteEmptyGroup(); }}
                  className={b('nav-lnk').mix('is-danger')} href=''
                >
                  Удалить пустые группы
                </a>
              </div>
            </div>
          }
          {getColumnByName(props.table, 'listing_style') &&
            <div className={b('nav-box')}>
              <div className={b('nav-item')}>
                <div
                  onClick={props.selectedGroupsCount && handleChangeListingStyleClick}
                  className={b('nav-lnk').mix(!props.selectedGroupsCount && 'disabled')}
                >
                  Выбрать вид товаров
                </div>
              </div>
            </div>
          }
        </nav>
      </section>
      <section className={b('box-4')}>
        <nav className={b('sub-nav')}>
          <a className={b('sub-nav-lnk')} href={props.instructionHref}>Инструкция</a>
        </nav>
      </section>
    </header>
  );
};

Header.propTypes = {
  toggler: PropTypes.bool,
  selectedGroupsCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  instructionHref: PropTypes.string,
  onToggle: PropTypes.func,
  onCallProductsAndGroups: PropTypes.func,
  onDeleteEmptyGroup: PropTypes.func,
  onDeleteSelectedGroup: PropTypes.func,
  showListingStylePopup: PropTypes.func.isRequired,
  sendDataToListingStylePopup: PropTypes.func.isRequired,
  table: PropTypes.object.isRequired,
};

Header.defaultProps = {
  disabled: false,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  showListingStylePopup,
  sendDataToListingStylePopup,
}, dispatch);

export default connect(null, mapDispatchToProps)(Header);
