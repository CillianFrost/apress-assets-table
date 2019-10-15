import TreeItem from './TreeItem';
import {
  React,
  PropTypes,
  Component,
  DropTarget,
  _throttle,
  _isEqual,
  b,
  constants,
} from './import';

class Tree extends Component {
  moveStep = _throttle((...args) => {
    const { isMove } = this.state;

    if (isMove) { this.setHoverNode(...args); }
  }, 50);

  constructor(props) {
    super(props);

    this.state = {
      isMove: false,
      hover: {
        id: null,
        index: null,
        target: null,
      },
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { actionMoveNodeRequest } = this.props;

    if (nextProps.moveNode) {
      actionMoveNodeRequest({ ...nextProps.moveNode });
    }

    return !_isEqual(this.props, nextProps) || !_isEqual(this.state, nextState);
  }

  setHoverNode = (id, index, target, parentId) => {
    this.setState({
      hover: {
        id,
        index,
        target,
        parentId,
      },
    });
  }

  moveStart = (isMove) => this.setState({ isMove });

  moveEnd = (node) => {
    const { hover } = this.state;
    const { actionMoveNode } = this.props;

    if (hover
      && hover.id
      && hover.id !== node.id
      && !this.hasChildrenById(node, hover.id)) {
      actionMoveNode({ id: node.id, hover });
    }

    this.moveStart(false);
    this.setHoverNode(null, null, null, null);
  }

  hasChildrenById = (parent, childId) => {
    let isChild = false;

    if (Array.isArray(parent.tree_nodes)) {
      parent.tree_nodes.forEach((node) => {
        if (node.id === childId) {
          isChild = true;
        }

        if (!isChild && Array.isArray(node.tree_nodes)) {
          isChild = this.hasChildrenById(node, childId);
        }
      });
    }

    return isChild;
  }

  createTree(tree = this.props.tree, parentId = null) {
    const {
      actionSetExpanded,
      actionUpdate,
      actionSetNode,
      actionShowRemoveConfirmation,
      actionConfigSetId,
      withoutSearch,
      config,
      hasDragNode,
      hasSettingsNode,
    } = this.props;
    const { hover } = this.state;

    return tree.map((node, index) => node.id
      && (
        <div key={node.id} className={b('item-wrapper')}>
          <TreeItem
            id={node.id}
            index={index}
            name={node.name}
            count={node['items_count']}
            expandable={node.expandable}
            expanded={node.expanded}
            selected={node.selected}
            urlName={node['url_name']}
            tree_nodes={node.tree_nodes}
            orderUrl={node['order_url']}

            actionSetExpanded={actionSetExpanded}
            actionUpdate={actionUpdate}
            actionSetNode={actionSetNode}
            actionShowRemoveConfirmation={actionShowRemoveConfirmation}
            actionConfigSetId={actionConfigSetId}

            moveStart={this.moveStart}
            moveStep={this.moveStep}
            moveEnd={this.moveEnd}

            withoutSearch={withoutSearch}

            config={config}
            hoverNode={hover}
            hasDragNode={hasDragNode}
            hasSettingsNode={hasSettingsNode}
            parentId={parentId}
          />
          {Array.isArray(node.tree_nodes)
            && (
              <div className={b('list')}>
                {this.createTree(node.tree_nodes, node.id)}
              </div>
            )}
        </div>
      ));
  }

  render() {
    const { connectDropTarget, children } = this.props;

    return connectDropTarget(
      <div className={b('list')}>
        {children}
        {this.createTree()}
      </div>,
    );
  }
}

DropTarget.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,

  actionMoveNode: PropTypes.func,
  actionSetExpanded: PropTypes.func.isRequired,
  actionUpdate: PropTypes.func.isRequired,
  actionSetNode: PropTypes.func.isRequired,
  actionShowRemoveConfirmation: PropTypes.func,
  actionConfigSetId: PropTypes.func,

  tree: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
  hasDragNode: PropTypes.bool.isRequired,
};

export default DropTarget(
  constants.TREE,
  { drop() {} },
  (connect) => ({ connectDropTarget: connect.dropTarget() }),
)(Tree);
