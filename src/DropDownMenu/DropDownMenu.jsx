/* eslint react/no-unused-prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import RcDropdown from 'rc-dropdown';
import _isEqual from 'lodash/isEqual';
import './e-dropdown-menu.scss';
import { block, noop } from '../utils';

const b = block('e-dropdown-menu');

export default class DropDownMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState);
  }

  close = () => { this.setState({ visible: false }); }

  handleSelect = (e, id) => {
    const { onSelect } = this.props;

    onSelect(id, e);
    this.close();
  }

  handleVisibleChange = (visible) => {
    const { onVisibleChange } = this.props;

    onVisibleChange(visible);
    this.setState({ visible });
  }

  render() {
    const {
      title,
      mix,
      items,
      disableItemClick,
      trigger,
      children,
    } = this.props;

    const { visible } = this.state;

    const menu = (
      <div title={title} className={b.mix(mix)}>
        <div>
          {title && <div className={b('title')}>{title}</div>}
          <div className={b('menu')}>
            {items.map((item) => (
              <div
                onClick={(e) => !disableItemClick && this.handleSelect(e, item.id)}
                className={b('menu-item').is({ selected: item.active })}
                role="presentation"
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    return (
      <RcDropdown
        visible={visible}
        trigger={trigger}
        overlay={menu}
        onVisibleChange={() => this.handleVisibleChange(visible)}
        closeOnSelect={false}
        animation="slide-up"
      >
        {children}
      </RcDropdown>
    );
  }
}

DropDownMenu.propTypes = {
  mix: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.arrayOf,
  trigger: PropTypes.arrayOf,
  onSelect: PropTypes.func,
  onVisibleChange: PropTypes.func,
  disableItemClick: PropTypes.bool,
  children: PropTypes.node,
};

DropDownMenu.defaultProps = {
  title: '',
  mix: '',
  items: [],
  trigger: ['click'],
  onSelect: noop,
  onVisibleChange: noop,
  disableItemClick: false,
  children: null,
};
