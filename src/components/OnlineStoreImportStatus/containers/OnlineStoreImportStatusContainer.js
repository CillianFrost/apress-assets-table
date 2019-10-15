import React, { Component } from 'react';

import onlineStoreImportStatusContainerPropType from '../propTypes';
import statusTextStatuses from '../../../constants/StatusText';
import StatusText from '../../StatusText';


class OnlineStoreImportStatusContainer extends Component {
  componentDidMount() {
    const { pollingOnlineStoreImportStatus } = this.props;

    pollingOnlineStoreImportStatus();
  }

  render() {
    const { duringImportProcess } = this.props;

    if (!duringImportProcess) {
      return null;
    }

    return (
      <StatusText
        status={statusTextStatuses.progress}
        text={app.config.onlineStoreImportStatus.statusbar}
      />
    );
  }
}

OnlineStoreImportStatusContainer.propTypes = onlineStoreImportStatusContainerPropType.isRequired;

export default OnlineStoreImportStatusContainer;
