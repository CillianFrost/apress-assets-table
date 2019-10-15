import React from 'react';

export default ({ onSave, onClose }) => (
  <div className="e-table-cell-text-controllers-box">
    <div
      className="e-table-cell-text-save"
      onClick={onSave}
      onKeyPress={onSave}
      role="presentation"
    />
    <div
      className="e-table-cell-text-close"
      onClick={onClose}
      onKeyPress={onClose}
      role="presentation"
    />
  </div>
);
