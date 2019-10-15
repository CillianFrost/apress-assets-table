import React from 'react';
import { connect } from 'react-redux';
import Dialog from '../Dialog/Dialog';
import ProgressCircle from '../ProgressCircle/ProgressCircle';
import Checkbox from '../Checkbox/Checkbox';
import Button from '../Button/Button';
import { hideRemoveConfirmation } from '../dialogs/actions';
import TreeDndContext from '../Tree/TreeDndContext';
import * as actions from '../Tree/actions';
import * as remove from '../remove/actions';

const moveToWithoutGroup = 'moveToWithoutGroup';
const moveToListGroup = 'moveToListGroup';

class RemoveConfirmationDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAction: moveToListGroup,
      error: false,
    };
  }

  changeAction = (name) => {
    this.setState({
      selectedAction: name,
    });
  }

  cancel = () => {
    const { removeInProgress, dispatch } = this.props;

    if (removeInProgress) {
      return;
    }

    dispatch(hideRemoveConfirmation());
  }

  handleRemoveRow = () => {
    const {
      childrenGroups,
      childrenProducts,
      selectedNodeId,
      selectedAction,
      selectedRowId,
      dispatch,
    } = this.props;
    // destroy: {
    //   move_children_to: 0, # id группы в которую надо перенести подгруппы
    //   move_products_to: 0 # id группы в которую надо перенести товары
    // }
    const destroy = {};

    if (childrenGroups || childrenProducts) {
      if (selectedAction === moveToListGroup) {
        if (!selectedNodeId) {
          this.setState({
            error: 'Необходимо выбрать группу.',
          });
          return;
        }

        if (childrenGroups) {
          destroy.move_children_to = selectedNodeId;
        } else {
          destroy.move_products_to = selectedNodeId;
        }
      }
    }

    dispatch(remove.deleteGroup({ id: selectedRowId, destroy }));
  }

  actionSetExpanded = (...args) => {
    const { dispatch } = this.props;

    dispatch(actions.setExpanded(...args));
  }

  actionUpdate = (...args) => {
    const { dispatch } = this.props;

    dispatch(actions.update(...args));
  }

  actionSetNode = (args) => {
    const { dispatch } = this.props;

    dispatch(remove.selectNode({ id: args.id }));
  }

  renderSelectActions() {
    const {
      rowName,
      childrenGroups,
      isLoaded,
      tree,
      config,
    } = this.props;
    const { selectedAction } = this.state;

    return (
      <section className="e-products-actions">
        <div className="rc-dialog-attention">
          Внимание! В группе “{rowName}” есть {' '}
          {childrenGroups ? 'подгруппы.' : 'товары.' }
        </div>
        <div className="e-products-actions-radio-title">
          Действия с&nbsp;
          {childrenGroups ? 'группами' : 'товарами'}
          :
        </div>
        <div>
          <div className="e-products-actions-radio-set">
            <Checkbox
              mix="is-radio e-products-actions-radio"
              onChange={() => this.changeAction(moveToWithoutGroup)}
              checked={selectedAction === moveToWithoutGroup}
            />
            <label
              className="e-label"
              htmlFor
              onClick={() => this.changeAction(moveToWithoutGroup)}
            >
              {childrenGroups
                ? 'Удалить подгруппы и переместить товары в группу “Товары без группы”'
                : 'Переместить товары в группу “Товары без группы”:'}
            </label>
          </div>
          <div className="e-products-actions-radio-set">
            <Checkbox
              mix="is-radio e-products-actions-radio"
              onChange={() => this.changeAction(moveToListGroup)}
              checked={selectedAction === moveToListGroup}
            />
            <label
              className="e-label"
              htmlFor
              onClick={() => this.changeAction(moveToListGroup)}
            >
              Переместить
              {childrenGroups ? 'группы' : 'товары'}
              в группу из списка:
            </label>
          </div>
          {this.state.error && <p className="e-simple-error">{this.state.error}</p>}
          {this.props.error && <p className="e-simple-error">{this.props.error}</p>}
          <div className="e-products-actions-tree-box">
            {isLoaded && selectedAction === moveToListGroup
            && (
              <TreeDndContext
                tree={tree}
                config={config}
                actionSetExpanded={this.actionSetExpanded}
                actionUpdate={this.actionUpdate}
                actionSetNode={this.actionSetNode}
                hasDragNode={false}
                hasSettingsNode={false}
                actionShowRemoveConfirmation={() => {}}
              />
            )}
          </div>
        </div>
      </section>
    );
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
    const {
      isFetching,
      save,
      childrenProducts,
      childrenGroups,
    } = this.props;

    return (
      <div>
        {(isFetching || save.isProgress || save.waitingState.length)
          ? (
            <div>
              <div className="e-preloader" />
            </div>
          )
          : (
            <div className="rc-dialog-full-width">
              {(!!childrenGroups || !!childrenProducts)
              && this.renderSelectActions()}
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
          )}
      </div>
    );
  }

  render() {
    const { removeInProgress, removeRowConfirmOpen } = this.props;

    return (
      <Dialog
        className="is-remove-confirmation"
        closable={!removeInProgress}
        visible={removeRowConfirmOpen}
        onClose={this.cancel}
        title={!removeInProgress
          ? 'Удалить выбранную группу ?'
          : 'Удаляем группу, пожалуйста ожидайте ...'}
      >
        {removeInProgress ? this.renderRemoveInProgress() : this.renderConfirmation() }
      </Dialog>
    );
  }
}

const mapTree = (tree, id, removeId) => {
  const newTree = tree.filter((node) => removeId !== node.id).map((node) => {
    let treeNodes = {};
    if (node.tree_nodes) {
      treeNodes = { tree_nodes: mapTree(node.tree_nodes, id, removeId) };
    }
    return { ...node, selected: node.id === id, ...treeNodes };
  });

  return newTree;
};

const mapStateToProps = (state) => ({
  removeRowConfirmOpen: state.dialogs.removeRowConfirmOpen,
  selectedRowId: state.remove.groupId,
  tree: mapTree(state.tree.data, state.remove.selectedNodeId, state.remove.groupId),
  rowName: state.remove.groupName,
  childrenGroups: state.remove.childrenGroups,
  childrenProducts: state.remove.childrenProducts,
  isLoaded: state.tree.isLoaded,
  config: state.config,
  isFetching: state.remove.isFetching,
  removeInProgress: state.remove.removeInProgress,
  processStatus: state.remove.processStatus,
  selectedNodeId: state.remove.selectedNodeId,
  save: state.save,
  error: state.remove.error,
});

export default connect(mapStateToProps)(RemoveConfirmationDialog);
