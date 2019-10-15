import React from 'react';
import { connect } from 'react-redux';
import Dialog from '../Dialog/Dialog';
import ProgressCircle from '../ProgressCircle/ProgressCircle';
import Button from '../Button/Button';
import * as remove from '../remove/actions';
import { hideRemoveEmptyRowsConfirmation } from '../dialogs/actions';

class RemoveEmptyGroupsDialog extends React.Component {
  cancel = () => {
    const { removeInProgress, dispatch } = this.props;

    if (removeInProgress) { return; }

    dispatch(hideRemoveEmptyRowsConfirmation());
  }

  handleRemove = () => {
    const { dispatch } = this.props;

    dispatch(remove.removeEmptyGroups());
  }

  renderRemoveInProgress = () => {
    const { processStatus } = this.props;

    return (
      <div>
        <ProgressCircle percent={processStatus} />
        <div>
          <p>Процесс удаления групп начался - дождитесь его окончания.</p>
        </div>
      </div>
    );
  }

  render() {
    const { removeInProgress, removeEmptyRowConfirmOpen, error } = this.props;

    return (
      <Dialog
        closable={!removeInProgress}
        className="is-remove-confirmation"
        visible={removeEmptyRowConfirmOpen}
        onClose={this.cancel}
        title={!removeInProgress ? 'Удалить группы без товаров?' : 'Удаляем пустые группы...'}
      >
        {error && <p className="e-simple-error">{error}</p>}
        {!removeInProgress
          ? (
            <div className="rc-dialog-full-width">
              <section className="rc-dialog-button-container">
                <Button
                  onClick={this.handleRemove}
                  mix="rc-dialog-button is-good is-big-size"
                >
                  Да
                </Button>
                <Button
                  onClick={this.cancel}
                  mix="rc-dialog-button is-cancel is-big-size"
                >
                  Не удалять
                </Button>
              </section>
            </div>
          )
          : <div className="e-preloader" />}
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => ({
  removeRowsConfirmOpen: state.dialogs.removeRowsConfirmOpen,
  removeEmptyRowConfirmOpen: state.dialogs.removeEmptyRowConfirmOpen,
  selectedRow: state.dialogs.selectedIds,
  removeRowConfirmOpen: state.dialogs.removeRowConfirmOpen,
  removeInProgress: state.remove.removeInProgress,
  processStatus: state.remove.processStatus,
  error: state.remove.error,
});

export default connect(mapStateToProps)(RemoveEmptyGroupsDialog);
