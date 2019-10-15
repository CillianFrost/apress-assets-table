import React, { Component } from 'react';
import SheetClip from 'sheetclip/sheetclip';

import { getDisplayName } from '../../utils';


const sheetClip = new SheetClip();

export default function withPaste(WrappedComponent) {
  class ComponentWithPaste extends Component {
    constructor(props) {
      super(props);

      this.state = { pastedData: '' };
    }

    componentDidMount() {
      document.addEventListener('paste', this.handlePaste);
    }

    componentDidUpdate() {
      this.clearPastedData();
    }

    componentWillUnmount() {
      document.removeEventListener('paste', this.handlePaste);
    }

    getPastedData = (clipboardData) => (
      window.clipboardData ? window.clipboardData.getData('Text') : clipboardData.getData('text/plain')
    )

    setNode = (rootNode) => {
      if (!rootNode) {
        return;
      }

      this.$node = rootNode.$node || (rootNode.getWrappedInstance && rootNode.getWrappedInstance().$node);
    }

    clearPastedData = () => {
      const { pastedData } = this.state;

      if (pastedData.length) {
        this.setState({ pastedData: '' });
      }
    }

    handlePaste = (event) => {
      if (this.$node && this.$node.contains(document.activeElement)) {
        const pastedData = this.getPastedData(event.clipboardData);

        this.setState({ pastedData: sheetClip.parse(pastedData.replace(/\r/g, '')) });
      }
    }

    render() {
      const { pastedData } = this.state;

      return (
        <WrappedComponent
          ref={this.setNode}
          pastedData={pastedData}
          {...this.props}
        />
      );
    }
  }

  ComponentWithPaste.displayName = `withPaste(${getDisplayName(WrappedComponent)})`;
  return ComponentWithPaste;
}
