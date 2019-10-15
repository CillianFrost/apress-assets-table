import React, { Component } from 'react';

function getDisplayName(Cell) {
  return Cell.displayName || Cell.name || 'Cell';
}

export default function withDragging(Cell) {
  class WithDragging extends Component {
    handleStartSelection = () => {
      const { cell, startSelection } = this.props;

      startSelection({ row: cell.row, column: cell.column });
    };

    handleSelection = (e) => {
      const { selected, continueSelection, cell } = this.props;

      e.preventDefault();
      if (selected.isSelecting || selected.isDragging) {
        continueSelection({ row: cell.row, column: cell.column });
      }
    };

    handleResetSelection = () => {
      const { resetSelection, cell } = this.props;

      resetSelection({ row: cell.row, column: cell.column });
    };

    handleEndSelection = () => {
      const { endSelection } = this.props;

      endSelection();
    };

    handleDrag = (e) => {
      const { startDrag, cell } = this.props;

      e.stopPropagation();
      e.preventDefault();
      startDrag({ row: cell.row, column: cell.column });
    };

    handleCellClick = () => {
      const { setFocus, cell } = this.props;

      setFocus({ name: cell.name, id: cell.id });
    };

    render() {
      return (
        <Cell
          {...this.props}
          handleStartSelection={this.handleStartSelection}
          handleSelection={this.handleSelection}
          handleResetSelection={this.handleResetSelection}
          handleEndSelection={this.handleEndSelection}
          handleDrag={this.handleDrag}
          handleCellClick={this.handleCellClick}
        />
      );
    }
  }

  WithDragging.displayName = `WithDragging(${getDisplayName(Cell)})`;
  return WithDragging;
}
