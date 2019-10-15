import React from 'react';
import { connect } from 'react-redux';
import Dialog from '../Dialog/Dialog';
import ProgressCircle from '../ProgressCircle/ProgressCircle';
import Button from '../Button/Button';
import { hideMassRemoveConfirmation } from '../dialogs/actions';
import * as remove from '../remove/actions';

class RemoveMassConfirmDialog extends React.Component {
  cancel = () => {
    const { removeInProgress, dispatch } = this.props;

    if (removeInProgress) { return; }

    dispatch(hideMassRemoveConfirmation());
  }

  handleRemoveRow = () => {
    const { dispatch, selectedRowId } = this.props;

    dispatch(remove.deleteGroup({
      id: selectedRowId,
      destroy: {},
      massRemove: true,
    }));
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

  renderConfirmation = () => {
    const { error, isFetching } = this.props;

    return (
      <div>
        {error && <p className="e-simple-error">{error}</p>}
        {!isFetching
          ? (
            <div className="rc-dialog-full-width">
              <section className="rc-dialog-button-container">
                <Button
                  onClick={this.handleRemoveRow}
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
          : (
            <div>
              <div className="e-preloader" />
            </div>
          )}
      </div>
    );
  }

  render() {
    const { removeInProgress, open } = this.props;

    return (
      <Dialog
        className="is-remove-confirmation"
        closable={!removeInProgress}
        visible={open}
        onClose={this.cancel}
        title={!removeInProgress
          ? 'Удалить выбранные группы ?'
          : 'Удаляем группы, пожалуйста ожидайте ...'}
      >
        {removeInProgress ? this.renderRemoveInProgress() : this.renderConfirmation() }
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => ({
  open: state.dialogs.removeRowsConfirmOpen,
  selectedRowsId: state.table.checked,
  isFetching: state.remove.isFetching,
  removeInProgress: state.remove.removeInProgress,
  processStatus: state.remove.processStatus,
  error: state.remove.error,
});

export default connect(mapStateToProps)(RemoveMassConfirmDialog);
