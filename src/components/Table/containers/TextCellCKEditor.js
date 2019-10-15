import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { textCellCKEditorPropType } from '../../../propTypes';
import { block } from '../../../utils';
import * as errorActions from '../../../Error/actions';


const b = block('e-table');

class TextCellCKEditor extends Component {
  componentDidMount() {
    const { name } = this.props;

    if (!CKEDITOR.instances[name]) {
      this.initEditorInstance();

      CKEDITOR.replace(name, {
        on: {
          instanceReady: (event) => {
            const { editor } = event;
            const range = editor.createRange();

            range.moveToElementEditablePosition(range.root, true);
            editor.focus();
            editor.getSelection().selectRanges([range]);

            this.setCharactersCountLeft(editor);
          },
        },
      });
    }
  }

  getCharectersCountLeft = (editor) => {
    const { maxLen } = this.props;

    return maxLen - editor.getData().length;
  }

  setCharactersCountLeft = (editor) => editor.container.setAttribute('data-charactersleft', this.getCharectersCountLeft(editor));

  initEditorInstance = () => {
    CKEDITOR.once('instanceCreated', (event) => {
      const { editor } = event;

      editor.on('configLoaded', () => {
        editor.config.toolbar = app.config.ckeditor.toolbarTiger;
        editor.config.resize_enabled = false;
      });

      editor.on('blur', (e) => this.handleBlur(e));
      editor.on('change', (e) => this.setCharactersCountLeft(e.editor));
      editor.on('mode', (e) => e.editor.focus());
    });
  };

  closeEditorInstance = (editor) => {
    const { handlerEdit, handlerSave } = this.props;

    handlerEdit(false);
    handlerSave(editor.getData());
    editor.destroy();
  };

  handleBlur = (e) => {
    const { addError, removeError, maxLen } = this.props;

    if (this.getCharectersCountLeft(e.editor) < 0) {
      addError({
        target: 'table',
        title: `Превышен лимит по количеству символов в колонке "Подробное описание".
          Допустимый лимит с учетом специальных символов ${maxLen}. Уменьшите количество символов и сохраните заново`,
      });

      return;
    }

    removeError({ target: 'table' });
    this.closeEditorInstance(e.editor);
  };

  render() {
    const { name, text } = this.props;

    return (
      <textarea
        ref={(elem) => elem && elem.focus()}
        className={b('cell-text').is({ edit: true })}
        name={name}
        id={name}
        value={text}
      />
    );
  }
}

TextCellCKEditor.propTypes = textCellCKEditorPropType.isRequired;

TextCellCKEditor.defaultProps = {
  text: '',
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addError: errorActions.add,
  removeError: errorActions.remove,
}, dispatch);

export { TextCellCKEditor };
export default connect(null, mapDispatchToProps)(TextCellCKEditor);
