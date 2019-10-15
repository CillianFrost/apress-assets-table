import React, { Component } from 'react';

import { PopupProportiesCellView } from '../views';
import { popupProportiesCellContainerPropType } from '../propTypes';


class PopupProportiesCellContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { isEdit: false };
  }

  setEditState = (isEdit) => {
    this.setState({ isEdit });
  }

  render() {
    const {
      cell: {
        isFocus,
        classMix,
        data,
        id,
      },
      handleSelect,
      activeOption,
    } = this.props;

    const { isEdit } = this.state;

    return (
      <PopupProportiesCellView
        isEdit={isEdit}
        isFocus={isFocus}
        classMix={classMix}
        activeOption={activeOption}
        data={data.common}
        id={id}
        handleSelect={handleSelect}
        setEditState={this.setEditState}
      />
    );
  }
}

PopupProportiesCellContainer.propTypes = popupProportiesCellContainerPropType.isRequired;

export default PopupProportiesCellContainer;
