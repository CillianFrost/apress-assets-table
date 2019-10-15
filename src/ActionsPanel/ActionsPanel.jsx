/* eslint react/no-unused-prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  block,
  get,
  has,
} from '../utils';
import Scroller from '../Scroller/Scroller';
import './e-actions-panel.scss';

const b = block('e-actions-panel');

const filterTitle = {
  with: 'заполнено',
  without: 'не заполнено',
};

const ActionsPanel = (props) => {
  const {
    mix,
    children,
    backHistory,
    nextHistory,
    onRemoveFilter,
    onActionBack,
    onActionNext,
    filtersForColumns,
  } = props;

  const historyButton = has(props, 'backHistory') && has(props, 'nextHistory');
  const filterCol = get(props, 'columns').filter((col) => get(col, 'common.visible') && get(col, 'filter.value') && get(col, 'filter.value') !== 'all');

  const getFilterValue = (name, key) => {
    if (filtersForColumns) {
      const column = filtersForColumns.find((item) => item.name === name);
      return column.filter.options.find((option) => option.value === key).title;
    }

    return filterTitle[key];
  };

  const handleActionBack = (e) => {
    if (backHistory) onActionBack(e);
  };

  const handleActionNext = (e) => {
    if (nextHistory) onActionNext(e);
  };

  return (
    <div className={b.mix(mix)}>
      <div className={b('container')}>
        <section className={b('section-1')}>
          <div className={b('scroll-box')}>
            {children}
          </div>
        </section>
        <section className={b('section-2')}>
          {historyButton
            && (
              <div className={b('last-actions-box')}>
                <span className={b('last-actions-label')}>Последние действия:</span>
                <button
                  type="button"
                  title="Отменить"
                  onClick={(e) => { handleActionBack(e); }}
                  className={b('button').is({ back: true, active: backHistory })}
                  aria-label="Cancel"
                />
                <button
                  type="button"
                  title="Вернуть"
                  onClick={(e) => { handleActionNext(e); }}
                  className={b('button').is({ next: true, active: nextHistory })}
                  aria-label="Back"
                />
              </div>
            )}
          <div className={b('filter-box')}>
            {!!filterCol.length
              && <span className={b('filter-title')}>Установлены фильтры:</span>}
            <div className={b('scroll-box')}>
              <Scroller wrapped>
                {
                  filterCol.map((col) => (
                    <span
                      key={col.name}
                      className={b('filter-item')}
                      onClick={() => onRemoveFilter({ id: 'all', name: col.name })}
                      onKeyPress={() => onRemoveFilter({ id: 'all', name: col.name })}
                      title="Убрать"
                      role="button"
                      tabIndex="0"
                      aria-label="Action"
                    >
                      {`${col.title} - ${getFilterValue(col.name, col.filter.value)}`}
                    </span>
                  ))
                }
              </Scroller>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

ActionsPanel.propTypes = {
  mix: PropTypes.string,
  children: PropTypes.node,

  nextHistory: PropTypes.bool,
  backHistory: PropTypes.bool,

  onActionBack: PropTypes.func.isRequired,
  onActionNext: PropTypes.func.isRequired,
  onRemoveFilter: PropTypes.func.isRequired,

  filters: PropTypes.shape,
  columns: PropTypes.shape,
  filtersForColumns: PropTypes.shape,
};

ActionsPanel.defaultProps = {
  mix: '',
  children: null,

  nextHistory: null,
  backHistory: null,

  filters: [],
  columns: [],
  filtersForColumns: [],
};

export default ActionsPanel;
