import React from 'react';
import Dialog from './Dialog';
import Button from '../Button/Button';
import ExampleConfirmation from './exampleConfirmation';

export default class DialogExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      width: 600,
      destroyOnClose: false,
      center: false,
    };
  }

  onClick = (e) => {
    this.setState({
      mousePosition: {
        x: e.pageX,
        y: e.pageY,
      },
      visible: true,
    });
  }

  onClose = () => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }

  onDestroyOnCloseChange = (e) => {
    this.setState({
      destroyOnClose: e.target.checked,
    });
  }

  changeWidth = () => {
    const { width } = this.state;

    this.setState({
      width: width === 600 ? 800 : 600,
    });
  }

  center = (e) => {
    this.setState({
      center: e.target.checked,
    });
  }

  render() {
    const {
      visible,
      destroyOnClose,
      center,
      width,
      mousePosition,
    } = this.state;

    let dialog;

    if (visible || !destroyOnClose) {
      const style = { width };
      let wrapClassName = '';

      if (center) { wrapClassName = 'center'; }

      dialog = (
        <Dialog
          visible={visible}
          wrapClassName={wrapClassName}
          onClose={this.onClose}
          style={style}
          mousePosition={mousePosition}
          title={<div>Загрузка фотографий</div>}
          footer={(
            <div>
              <Button mix="is-good rc-dialog-button">
                Сохранить и продолжить
              </Button>
              <Button
                onClick={this.onClose}
                mix="rc-dialog-button"
              >
                Отмена
              </Button>
            </div>
          )}
        >
          <input />
          <p>basic modal</p>
          <p>
            Пожалуйста, откадрируйте изображение для корректного отображения на сайте.
            Выбранная область будет показываться в категориях товаров на главной странице
            вашего сайта.
          </p>
          <button onClick={this.changeWidth} type="button">
            change width
          </button>
          {[...new Array(10)].map(() => (
            <p>
              Пожалуйста, откадрируйте изображение для корректного отображения на сайте.
              Выбранная область будет показываться в категориях товаров на главной странице
              вашего сайта.
            </p>
          ))}
        </Dialog>
      );
    }
    return (
      <div>
        <h3>
          Dialog: based on
          <a href="https://github.com/react-component/dialog">rc-dialog</a>
        </h3>
        <p>
          <button
            onClick={this.onClick}
            type="button"
          >
            show dialog
          </button>
        </p>
        {dialog}
        <ExampleConfirmation />
      </div>
    );
  }
}
