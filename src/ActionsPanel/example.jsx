/* eslint no-console: 0 */
/* eslint no-alert: 0 */
import React from 'react';
import ActionsPanel from './ActionsPanel';
import Scroller from '../Scroller/Scroller';
import { block } from '../utils';

const b = block('e-actions-panel');
const example = block('example');

export default class ActionsPanelExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backHistory: true,
      nextHistory: false,
      filters: [
        { filter: { value: 'with' }, name: 1, title: 'test1' },
        { filter: { value: 'with' }, name: 2, title: 'test2' },
        { filter: { value: 'with' }, name: 3, title: 'test3' },
        { filter: { value: 'with' }, name: 4, title: 'test4' },
        { filter: { value: 'with' }, name: 5, title: 'test5' },
        { filter: { value: 'with' }, name: 6, title: 'test6' },
        { filter: { value: 'with' }, name: 7, title: 'test7' },
      ],
    };
  }

  historyBack = () => {
    console.log('historyBack');
    this.setState({ backHistory: false, nextHistory: true });
  }

  historyNext = () => {
    console.log('historyNext');
    this.setState({ backHistory: true, nextHistory: false });
  }

  removeFilter = (id) => {
    const { filters } = this.state;

    console.log('remove filter', id);
    const resultFilters = filters.filter((filter) => filter.name !== id.name);
    console.log(filters);
    this.setState({
      filters: resultFilters,
    });
  }

  render() {
    const { backHistory, nextHistory, filters } = this.state;

    return (
      <div style={{ margin: '20px 0 20px 370px' }} className={example()}>
        <h3>ActionsPanel:</h3>
        <ActionsPanel
          onActionBack={this.historyBack}
          onActionNext={this.historyNext}
          onRemoveFilter={this.removeFilter}
          backHistory={backHistory}
          nextHistory={nextHistory}
          columns={filters}
        >
          <Scroller>
            <button
              className={b('breadcrumb-item')}
              type="button"
            >
              Все группы
            </button>
            {[...new Array(10)].map((el, i) => (
              <button
                key={i}
                className={b('breadcrumb-item')}
                type="button"
              >
                Труба
              </button>
            ))}
            <span
              className={b('breadcrumb-item')}
            >
              Труба металлическая
            </span>
          </Scroller>
        </ActionsPanel>
      </div>
    );
  }
}
