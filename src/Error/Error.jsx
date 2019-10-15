import React from 'react';
import { connect } from 'react-redux';
import _isEqual from 'lodash/isEqual';
import { remove } from './actions';
import { block } from '../utils';

import './e-error.scss';

const b = block('e-error');

class ComponentError extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  createServerError = (error) => {
    const { dispatch } = this.props;

    return (
      <div className={b}>
        <p className={b('title')}>
          {error.title}
        </p>
        <div
          className={b('repeat')}
          onClick={() => {
            dispatch({ type: error.action });
            dispatch(remove({ id: error.id }));
          }}
          role="presentation"
        >
          Повторить
        </div>
        <div
          className={b('close')}
          onClick={() => dispatch(remove({ id: error.id }))}
          role="presentation"
        />
      </div>
    );
  };

  createDefaultError = (error) => {
    const { dispatch } = this.props;

    return (
      <div className={b} key={error.id}>
        <div className={b('title')}>{error.title}</div>
        <div
          className={b('close')}
          onClick={() => dispatch(remove({ id: error.id }))}
          role="presentation"
        />
      </div>
    );
  }

  createError = (error) => {
    switch (error.type) {
      case 'server':
        return this.createServerError(error);

      default:
        return this.createDefaultError(error);
    }
  }


  render() {
    const { errors } = this.props;

    return (
      <div className={b('wrapper')}>
        {errors.slice(0, 3).map(this.createError)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.error,
});

export default connect(mapStateToProps)(ComponentError);
