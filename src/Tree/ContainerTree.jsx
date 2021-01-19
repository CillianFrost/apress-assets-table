import TreeDndContext from './TreeDndContext';
import {
  React,
  PropTypes,
  Component,
  connect,
  _isEqual,
  actions,
  configSetId,
  Search,
  actionsSaveControl,
  b
} from './import';
import {removeGroup} from '../remove/actions';

import DropDownMenu from '../DropDownMenu/DropDownMenu';

class ContainerTree extends Component {
  static propTypes = {
    tree: PropTypes.object,
  };

  state = {
    filter: ''
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState);
  }

  actionMoveNodeRequest = (...args) => this.props.dispatch(actions.moveNodeRequest(...args))

  actionMoveNode = (...args) => this.props.dispatch(actions.moveNode(...args))

  actionSetExpanded = (...args) => this.props.dispatch(actions.setExpanded(...args))

  actionUpdate = (...args) => this.props.dispatch(actions.update(...args))

  actionSetNode = (...args) => this.props.dispatch(actions.setNode(...args))

  actionShowRemoveConfirmation = (...args) => this.props.dispatch(removeGroup(...args))

  actionConfigSetId = (...args) => this.props.dispatch(configSetId(...args))

  actionSaveStart = (...args) => this.props.dispatch(actionsSaveControl.saveStart(...args))

  filterTree = (nodes, regexp) => {
    const filteredTreeData = [];

    nodes.forEach((node) => {
      if (regexp.test(node.name)) {
        if (node.tree_nodes && node.tree_nodes.length) {
          filteredTreeData.push({
            ...node,
            tree_nodes: this.filterTree(node.tree_nodes, regexp)
          });
        } else {
          filteredTreeData.push(node);
        }
      } else if (node.tree_nodes && node.tree_nodes.length) {
        const childNodes = this.filterTree(node.tree_nodes, regexp);

        if (childNodes.length) {
          filteredTreeData.push({
            ...node,
            tree_nodes: childNodes
          });
        }
      }
    });

    return filteredTreeData;
  }

  handleFilterSelect = (id) => {
    if (!id) {
      this.props.dispatch(actions.load(null));
      return;
    }

    this.props.dispatch(actions.load({
      order_name: 'name',
      order_direction: id === 'up' ? 'desc' : 'asc',
    }));
  }

  renderEmpty = (treeData) => {
    if (!treeData.length && this.state.filter) {
      return (
        <p className={b('empty')}>Ничего не найдено</p>
      );
    }

    return null;
  }

  render() {
    const treeData = this.state.filter ?
      this.filterTree(this.props.tree.data, new RegExp(this.state.filter, 'i')) :
      this.props.tree.data;

    const searchHtml = (
      <div className={b('search')}>
        <Search onChange={value => this.setState({filter: value})} />
        <DropDownMenu
          title='Сортировать'
          items={[
            {
              title: 'Все',
              id: '',
            },
            {
              title: 'А - Я',
              id: 'up',
            },
            {
              title: 'Я - А',
              id: 'down',
            },
          ]}
          onSelect={id => this.handleFilterSelect(id)}
        >
          <div
            title='от А до Я'
            className={b('sorter').is({
              sorted: this.props.tree.filter,
              'sorted-down': this.props.tree.filter && this.props.tree.filter.order_direction === 'asc'
            })}
          />
        </DropDownMenu>
      </div>
    );

    return (
      <div className={b('conteiner').is({spinner: !this.props.isLoaded})}>
        {!this.props.withoutSearch && searchHtml}

        <div className={b('wrapper')}>
          <TreeDndContext
            tree={treeData}
            moveNode={this.props.tree.moveNode}
            config={this.props.config}
            actionMoveNodeRequest={this.actionMoveNodeRequest}
            actionMoveNode={this.actionMoveNode}
            actionSetExpanded={this.actionSetExpanded}
            actionUpdate={this.actionUpdate}
            actionSetNode={this.actionSetNode}
            hasDragNode
            hasSettingsNode
            actionShowRemoveConfirmation={this.actionShowRemoveConfirmation}
            actionConfigSetId={this.actionConfigSetId}
            actionSaveStart={this.actionSaveStart}
            isProgress={this.props.save.isProgress}
          >
            {this.props.children}

            {this.renderEmpty(treeData)}
          </TreeDndContext>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tree: state.tree,
  isLoaded: state.tree.isLoaded,
  config: state.config,
  save: state.save,
});

export default connect(mapStateToProps)(ContainerTree);
