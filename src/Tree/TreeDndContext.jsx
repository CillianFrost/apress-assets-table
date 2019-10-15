import Tree from './Tree';
import TreeLayer from './TreeLayer';
import {
  React,
  Component,
  b,
  DndProvider,
  HTML5Backend,
  _isEqual,
} from './import';

class ContainerTree extends Component {
  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  render() {
    const { children } = this.props;

    return (
      <DndProvider backend={HTML5Backend}>
        <div className={b()}>
          <Tree
            {...this.props}
          >
            {children}
          </Tree>
          <TreeLayer />
        </div>
      </DndProvider>
    );
  }
}

export default ContainerTree;
