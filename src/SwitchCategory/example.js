import React from 'react';
import { connect } from 'react-redux';
import SwitchCategory from './SwitchCategory';
import FloatPanel from '../FloatPanel/FloatPanel';
import TreeExample from '../Tree/ContainerTree';
import { hideTooltip } from './actions';

function SwitchCategoryExample() {
  return (
    <div>
      <h3>SwitchCategory</h3>
      <div
        style={{
          width: 310,
          padding: 20,
          height: 300
        }}
      >
        <FloatPanel onSlide={() => this.props.dispatch(hideTooltip())}>
          <SwitchCategory />
          <TreeExample />
        </FloatPanel>
      </div>
    </div>
  );
}

export default connect()(SwitchCategoryExample);
