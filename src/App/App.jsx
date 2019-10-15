import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../_app.mock';
import ButtonExample from '../Button/example';
import TogglerExample from '../Toggler/example';
import HeaderExample from '../Header/example';
import PaginationExample from '../Pagination/example';
import ComboSelectExample from '../ComboSelect/example';
import TableExample from '../Table/example';
import ScrollerExample from '../Scroller/example';
import ActionsPanelExample from '../ActionsPanel/example';
import TreeExample from '../Tree/ContainerTree';
import SaveControl from '../SaveControl/SaveControlContainer';
import FloatPanelExample from '../FloatPanel/example';
import CheckboxExample from '../Checkbox/example';
import ActionsExample from '../Actions/example';
import DropDownExample from '../DropDownMenu/example';
import DialogExample from '../Dialog/example';
import HelpExample from '../Help/example';
import ContainerDialog from '../dialogs/ContainerDialog';
import ErrorExample from '../Error/example';
import SwitchCategoryExample from '../SwitchCategory/example';
import OnlineStoreImportStatus from '../components/OnlineStoreImportStatus';
import * as actionsTable from '../Table/actions';
import * as actionsTree from '../Tree/actions';
import * as actionsSave from '../SaveControl/actions';
import { block } from '../utils';


import '../styles/global.scss';
import './style.scss';
import { PropTypes } from '../Tree/import';

const b = block('example-wrapper');

class App extends React.Component {
  UNSAFE_componentWillMount() {
    const { actionsTable, actionsTree } = this.props;

    actionsTable.load();
    actionsTree.load();
  }

  render() {
    const {
      history,
      table,
      save,
    } = this.props;

    const message = {
      success: 'Все изменения сохранены',
      progress: 'Изменения сохраняются',
      error: 'Ошибка сохранения',
    };

    return (
      <div>
        <div className={b()}>
          <DialogExample />
        </div>
        <div className={b()}>
          <ButtonExample />
        </div>
        <div className={b()}>
          <TogglerExample />
        </div>
        <CheckboxExample />
        <ActionsExample />
        <div className={b()}>
          <PaginationExample />
        </div>
        <div className={b()}>
          <ComboSelectExample />
        </div>
        <div>
          <ScrollerExample />
        </div>
        <ActionsPanelExample />
        <div className={b()}>
          <DropDownExample />
        </div>
        <div className={b()}>
          <SaveControl
            save={save}
            actions={actionsSave}
            message={message}
            rows={table.rows}
          />
          <OnlineStoreImportStatus />
        </div>
        <div className={b()}>
          <button
            type="button"
            onClick={() => actionsTable.historyPrev()}
            disabled={!history.prev.length}
          >
            Undo
          </button>
          <button
            type="button"
            onClick={() => actionsTable.historyNext()}
            disabled={!history.next.length}
          >
            Redo
          </button>
        </div>
        <div className={b()}>
          <HeaderExample />
        </div>
        <div style={{ marginLeft: 120 }}>
          <div className={b('table')}>
            <TableExample
              table={table}
              actions={actionsTable}
            />
          </div>
        </div>
        <div className={b('tree')}>
          <TreeExample />
        </div>
        <div className={b('float-panel')}>
          <FloatPanelExample />
        </div>
        <div className={b('help')}>
          <HelpExample />
        </div>
        <div>
          <ContainerDialog />
        </div>
        <div className={b()}>
          <ErrorExample />
        </div>
        <SwitchCategoryExample />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  table: {
    ...state.table,
    rows: state.table.history.current,
  },
  history: state.table.history,
  tree: state.tree,
  save: state.save,
});

const mapDispatchToProps = (dispatch) => ({
  actionsTable: bindActionCreators(actionsTable, dispatch),
  actionsTree: bindActionCreators(actionsTree, dispatch),
  actionsSave: bindActionCreators(actionsSave, dispatch),
});

App.propTypes = {
  history: PropTypes.shape,
  table: PropTypes.shape.isRequired,
  save: PropTypes.func.isRequired,
};

App.defaultProps = {
  history: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
