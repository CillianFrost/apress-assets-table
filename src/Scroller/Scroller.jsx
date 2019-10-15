/* eslint react/no-unused-prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import _throttle from 'lodash/throttle';
import _isEqual from 'lodash/isEqual';
import { block } from '../utils';
import './e-scroller.scss';

const b = block('e-scroller');

class Scroller extends React.Component {
  handleWindowResize = _throttle(() => { this.init(); }, 500);

  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      isOverflow: false,
      isLastPosition: false,
      isFirstPosition: false,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize, false);
    this.init();
  }

  UNSAFE_componentWillReceiveProps() {
    this.init();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize, false);
  }

  calculateView = (offsetX) => {
    let isLastPosition = false;
    let isFirstPosition = false;
    let offset = offsetX;
    const isOverflow = this.$container.offsetWidth < this.$container.scrollWidth;

    if (offset + this.$container.offsetWidth >= this.$container.offsetWidth) {
      offset = 0;
      isLastPosition = true;
    }

    if (this.$container.offsetWidth - offset >= this.$container.scrollWidth) {
      offset = -(this.$container.scrollWidth - this.$container.offsetWidth);
      isFirstPosition = true;
    }

    return ({
      isOverflow,
      isFirstPosition,
      isLastPosition,
      offset,
    });
  }

  init = () => {
    const { offset } = this.state;

    this.setState(this.calculateView(offset));
  }

  slide = (direction) => {
    const { offset, step } = this.state;
    let resultOffset;

    if (direction === 'next') {
      resultOffset = offset + step;
    } else {
      resultOffset = offset - step;
    }

    this.setState(this.calculateView(offset));
  }

  handleSlideBack = () => { this.slide('next'); }

  handleSlideNext = () => { this.slide('back'); }

  handleWell = (e) => {
    const { isOverflow, isFirstPosition, isLastPosition } = this.state;

    if (isOverflow) {
      if (e.deltaY > 0 && !isLastPosition) {
        this.slide('next');
        e.preventDefault();
      } else if (e.deltaY < 0 && !isFirstPosition) {
        this.slide('back');
        e.preventDefault();
      }
    }
  }

  renderChildren = () => {
    const { wrapped, children } = this.props;

    return wrapped
      ? React.Children.map(children, (child) =>
        <div className={b('element')}>{child}</div>)
      : children;
  };

  render() {
    const { mix } = this.props;
    const {
      isOverflow,
      isFirstPosition,
      isLastPosition,
      offset,
    } = this.state;

    return (
      <div
        onWheel={this.handleWell}
        className={b.mix(mix)}
      >
        <div className={b('root')}>
          <section
            ref={(node) => { this.$wrapper = node; }}
            className={b('wrapper').is({
              overflow: isOverflow,
              'first-position': isFirstPosition,
              'last-position': isLastPosition,
            })}
          >
            <div
              style={{ left: offset }}
              ref={(node) => { this.$container = node; }}
              className={b('container')}
            >
              {this.renderChildren()}
            </div>
          </section>
          {isOverflow
            && (
              <div className={b('button-box')}>
                {!isLastPosition
                && (
                  <button
                    onClick={this.handleSlideBack}
                    type="button"
                    className={b('button').is({ back: true })}
                    aria-label="Slide back"
                  />
                )}
                {true
                  && (
                    <button
                      onClick={this.handleSlideNext}
                      type="button"
                      className={b('button').is({ next: true })}
                      aria-label="Slide next"
                    />
                  )}
              </div>
            )}
        </div>
      </div>
    );
  }
}

Scroller.propTypes = {
  mix: PropTypes.string,
  step: PropTypes.number,
  wrapped: PropTypes.bool,
};

Scroller.defaultProps = {
  mix: '',
  step: 100,
  wrapped: false,
};

export default Scroller;
