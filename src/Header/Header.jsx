import React from 'react';
import PropTypes from 'prop-types';

import { block } from '../utils';
import Toggler from '../Toggler/Toggler';

import './e-header.scss';

const b = block('e-header');

const Header = (props) => {
  const {
    toggler,
    onToggle,
    onCallProductsAndGroups,
    onDeleteSelectedGroup,
    selectedGroupsCount,
    onDeleteEmptyGroup,
    instructionHref,
  } = props;

  return (
    <header className={b()}>
      {!(toggler === undefined)
        && (
          <section className={b('box-1')}>
            <div className={b('swich-view')}>
              <div
                title="Редактор товарных групп"
                onClick={() => toggler && props.onToggle()}
                className={b('swich-view-to-rocket')}
                role="presentation"
              />
              <Toggler
                title="Перейти в Редактор товаров и услуг"
                on={toggler}
                onToggle={onToggle}
              />
              <div
                title="Редактор товаров и услуг"
                onClick={() => !toggler && props.onToggle()}
                className={b('swich-view-to-book')}
                role="presentation"
              />
            </div>
          </section>
        )}
      <section className={b('box-2')}>
        <div className={b('title')}>
          <b>Редактор</b>
          Товарных групп
        </div>
      </section>
      <section className={b('box-3')}>
        <nav className={b('nav')}>
          {false && onCallProductsAndGroups
          && (
            <div className={b('nav-box')}>
              <div className={b('nav-item')}>
                <div
                  onClick={(e) => { e.preventDefault(); onCallProductsAndGroups(); }}
                  className={b('nav-lnk')}
                  role="presentation"
                >
                  Товары и группы на Главной
                </div>
              </div>
            </div>
          )}
          {onDeleteSelectedGroup
          && (
            <div className={b('nav-box')}>
              <div className={b('nav-item')}>
                <div
                  onClick={(e) => { e.preventDefault(); onDeleteSelectedGroup(); }}
                  className={b('nav-lnk')}
                  role="presentation"
                >
                  Удалить выбранную группу
                  {' '}
                  {!!selectedGroupsCount && `(${selectedGroupsCount})`}
                </div>
              </div>
            </div>
          )}
          {onDeleteEmptyGroup
          && (
            <div className={b('nav-box')}>
              <div className={b('nav-item')}>
                <div
                  onClick={(e) => { e.preventDefault(); onDeleteEmptyGroup(); }}
                  className={b('nav-lnk').mix('is-danger')}
                  role="presentation"
                >
                  Удалить пустые группы
                </div>
              </div>
            </div>
          )}
        </nav>
      </section>
      <section className={b('box-4')}>
        <nav className={b('sub-nav')}>
          <a className={b('sub-nav-lnk')} href={instructionHref}>
            Инструкция
          </a>
        </nav>
      </section>
    </header>
  );
}

Header.propTypes = {
  toggler: PropTypes.bool.isRequired,
  selectedGroupsCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  instructionHref: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  onCallProductsAndGroups: PropTypes.func.isRequired,
  onDeleteEmptyGroup: PropTypes.func.isRequired,
  onDeleteSelectedGroup: PropTypes.func.isRequired,
};

export default Header;
