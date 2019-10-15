/* eslint no-console: 0 */
import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import {
  showRemoveEmptyRowsConfirmation,
} from '../dialogs/actions';
import * as remove from '../remove/actions';

class HeaderExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { togglerActive: false };
  }

  switchToggler = () => {
    const { togglerActive } = this.state;

    this.setState({
      togglerActive: !togglerActive,
    });

    window.location.href = app.config.productsEditorUrl;
  }

  render() {
    const { togglerActive } = this.state;
    const { dispatch } = this.props;

    return (
      <div>
        <Header
          instructionHref="/about/questions/editor"
          toSiteHref="/catalog"
          toggler={togglerActive}
          onToggle={this.switchToggler}
          selectedGroupsCount={33}
          onCallProductsAndGroups={() => { console.log('вызов модальника'); }}
          onDeleteSelectedGroup={() => {
            dispatch(remove.removeGroups());
          }}
          onDeleteEmptyGroup={() => {
            dispatch(showRemoveEmptyRowsConfirmation());
          }}
        />
        <Header
          instructionHref="/about/questions/editor"
          toSiteHref="/catalog"
          onCallProductsAndGroups={() => { console.log('вызов модальника'); }}
        />
      </div>
    );
  }
}

export default connect()(HeaderExample);
