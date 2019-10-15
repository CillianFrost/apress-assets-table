import React, { Component } from 'react';

import { textCellEditorPropType } from '../../../propTypes';
import { block, getCallback } from '../../../utils';
import EditControlPanel from '../views/EditControlPanel';


const b = block('e-table');

class TextCellEditor extends Component {
  constructor(props) {
    super();

    this.state = {
      value: this.getValidValue(props.text),
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { text, isEdit } = this.props;

    if (text !== nextProps.text || isEdit !== nextProps.isEdit) {
      this.setState({
        value: this.getValidValue(nextProps.text),
      });
    }
  }

  getCharactersCountLeft = () => {
    const { maxLen, isEdit } = this.props;
    const { value } = this.state;

    return isEdit ? maxLen - value.length : '';
  };

  getEventHandlers = () => {
    const { isEdit, isTouchDevice } = this.props;

    return {
      onKeyDown: getCallback((e) => this.handleKeyDown(e), isEdit),
      onInput: getCallback((e) => this.handleInput(e), isEdit),
      onBlur: getCallback(() => this.save(), isEdit && !isTouchDevice),
    };
  };

  getValidValue = (value) => (
    value.replace(/\n/g, ' ').replace(/<.*?>/g, '')
  );

  save = () => {
    const { handlerEdit, handlerSave } = this.props;
    const { value } = this.state;

    handlerEdit(false);
    handlerSave(value);
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.save();
    }
  };

  handleInput = (e) => {
    this.setState({ value: e.currentTarget.value });
  };

  render() {
    const {
      isEdit,
      maxLen,
      handlerEdit,
      isTouchDevice,
    } = this.props;

    const { value } = this.state;

    const { onKeyDown, onInput, onBlur } = this.getEventHandlers();

    return (
      <div
        data-charactersleft={this.getCharactersCountLeft()}
        className={b('cell-text').is({ edit: isEdit })}
      >
        { isEdit
          ? (
            <textarea
              ref={(elem) => elem && isEdit && elem.focus()}
              maxLength={maxLen}
              readOnly={!isEdit}
              defaultValue={value}
              onKeyDown={onKeyDown}
              onInput={onInput}
              onBlur={onBlur}
            />
          )
          : <div className={b('cell-text-output')}>{value}</div> }
        {isEdit && isTouchDevice && (
          <EditControlPanel
            onSave={this.save}
            onClose={() => { handlerEdit(false); }}
          />
        )}
      </div>
    );
  }
}

TextCellEditor.propTypes = textCellEditorPropType.isRequired;

TextCellEditor.defaultProps = {
  text: '',
};

export default TextCellEditor;
