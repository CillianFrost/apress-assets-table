import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import '../styles/preloader.scss';

function PreloaderView({ mix }) {
  return <div className={classNames('preloader', mix)} />;
}

PreloaderView.propTypes = {
  mix: PropTypes.string,
};

PreloaderView.defaultProps = {
  mix: '',
};

export default PreloaderView;
