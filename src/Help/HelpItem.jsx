import React from 'react';
import _isEqual from 'lodash/isEqual';
import { block } from '../utils';

const b = block('e-help');

export default class HelpItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState);
  }

  handlerClick = () => {
    const { open } = this.state;

    this.setState({
      open: !open,
    });
  }

  render() {
    const { title, content } = this.props;
    const { open } = this.state;

    return (
      <div className={b('container')}>
        <div
          className={b('title')}
          onClick={this.handlerClick}
          role="presentation"
        >
          {title}
        </div>
        <div
          className={b('text').is({ open })}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    );
  }
}
