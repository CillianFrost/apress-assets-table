import React from 'react';
import Toggler from './Toggler';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { togglerActive: false };
  }

  switchToggler = () => {
    const { togglerActive } = this.state;

    this.setState({
      togglerActive: !togglerActive,
    });
  }

  render() {
    const { togglerActive } = this.state;

    return (
      <div>
        <h3>Toggler:</h3>
        <Toggler on={togglerActive} onToggle={this.switchToggler} />
      </div>
    );
  }
}
