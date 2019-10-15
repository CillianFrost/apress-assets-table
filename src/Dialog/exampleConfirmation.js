import React from 'react';
import Dialog from './Dialog';
import Button from '../Button/Button';

export default class DialogExampleConfirmation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      inLoading: false,
    };
  }

  onClick = () => { this.setState({ visible: true }); }

  onClose = () => {
    this.setState({ visible: false, inLoading: false });
  }

  onDestroyOnCloseChange = (e) => {
    this.setState({ destroyOnClose: e.target.checked });
  }

  onSubmit = () => {
    this.setState({ inLoading: true });
  }

  renderButtons = () => {
    const { inLoading } = this.state;

    return (
      !inLoading
        ? <div>
          <Button
            onClick={this.onSubmit}
            mix="rc-dialog-button is-good is-big-size"
          >
            Да
          </Button>
          <Button
            onClick={this.onClose}
            mix="rc-dialog-button is-cancel is-big-size"
          >
            Не удалять
          </Button>
        </div>
        : <div className="e-preloader" />
    );
  }

  render() {
    const { visible } = this.state;

    return (
      <div>
        <h4>Dialog: confirm</h4>
        <p>
          <button onClick={this.onClick} type="button">
            show dialog
          </button>
        </p>
        <Dialog
          className="is-confirmation"
          visible={visible}
          onClose={this.onClose}
          title="Удалить группы без товаров?"
        >
          {this.renderButtons()}
        </Dialog>
      </div>
    );
  }
}
