import React, { Component } from 'react';
import RcDropdown from 'rc-dropdown';
import { connect } from 'react-redux';
import { block } from '../utils';
import SetItem from './SetItem';
import { init, switchCategoryUpdate, hideTooltip } from './actions';
import './e-switch-category.scss';
import './e-switch-cat-menu.scss';
import './e-switch-tooltip.scss';

const b = block('e-switch-category');
const bm = block('e-switch-cat-menu');
const bt = block('e-switch-tooltip');

const SG_TEXT = app.config.switchGroupsView;

class SwitchCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(init());
  }

  close = () => { this.setState({ visible: false }); }

  hideTooltip = () => {
    const { dispatch } = this.props;

    dispatch(hideTooltip());
  }

  render() {
    const {
      title,
      showProductGroups,
      dispatch,
      inited,
      tooltipOpen,
    } = this.props;

    const { visible } = this.state;

    const menu = (
      <div title={title} className={bm()}>
        <div className={bm('title')}>Выберите вид рубрикатора:</div>
        <SetItem
          onSelect={() => {
            showProductGroups
              && dispatch(switchCategoryUpdate({ showProductGroups: false }));
            this.close();
          }}
          title={SG_TEXT.rubrics_title}
          checked={!showProductGroups}
        >
          {SG_TEXT.rubrics_description}
        </SetItem>
        <SetItem
          onSelect={() => {
            !showProductGroups
              && dispatch(switchCategoryUpdate({ showProductGroups: true }));
            this.close();
          }}
          title={SG_TEXT.groups_title}
          checked={showProductGroups}
        >
          {SG_TEXT.groups_description}
        </SetItem>
      </div>
    );

    const tooltip = (
      <div className={bt()}>
        {SG_TEXT.rubrics_tooltip}
        <div
          title="Закрыть"
          className={bt('close')}
          onClick={this.hideTooltip}
          role="presentation"
        />
      </div>
    );

    if (!inited) {
      return (<div className={b()} />);
    }

    return (
      <div className={b()}>
        <div className={b('container')}>
          <div>
            <b className={b('selected')}>
              Режим:
              {' '}
              {showProductGroups ? SG_TEXT.groups_short_title : SG_TEXT.rubrics_short_title }
            </b>
          </div>
          <div>
            <RcDropdown
              visible={visible}
              trigger={['click']}
              overlay={menu}
              closeOnSelect
              onVisibleChange={(visibleParam) => { this.setState({ visible: visibleParam }); }}
              animation="slide-up"
            >
              <span
                onClick={this.hideTooltip}
                className={b('change')}
                role="presentation"
              >
                Сменить
              </span>
            </RcDropdown>
          </div>
        </div>
        <RcDropdown
          visible={tooltipOpen}
          trigger={['click']}
          overlay={tooltip}
          onVisibleChange={(visibleParam) => { this.setState({ visible: visibleParam }); }}
          closeOnSelect={false}
          animation="slide-up"
        >
          <div className={b('tooltip-caller')} />
        </RcDropdown>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.switchCategoryView.isFetching,
  tooltipOpen: state.switchCategoryView.tooltipOpen,
  showProductGroups: state.switchCategoryView.showProductGroups,
  inited: state.switchCategoryView.inited,
});

export default connect(mapStateToProps)(SwitchCategory);
