/* eslint react/no-unused-prop-types: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEqual from 'lodash/isEqual';
import { block } from '../utils';
import './e-float-panel.scss';

const b = block('e-float-panel');

export default class FloatPanel extends Component {
  constructor(props) {
    super(props);

    this.state = { togglerVisible: true };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState);
  }

  switchToggler = () => {
    const { onSlide } = this.props;
    const { togglerVisible } = this.state;

    this.setState({ togglerVisible: !togglerVisible });
    onSlide(togglerVisible);
  }

  render() {
    const { mix, children } = this.props;
    const { togglerVisible } = this.state;

    return (
      <div
        className={b.mix(mix).is({ hide: !togglerVisible })}
      >
        <div
          title={togglerVisible ? 'Свернуть' : 'Развернуть'}
          className={b('toggler')}
          onClick={() => this.switchToggler()}
          role="presentation"
        />
        <div className={b('wrapper')}>{children}</div>
      </div>
    );
  }
}

FloatPanel.propTypes = {
  onSlide: PropTypes.func.isRequired,
};
