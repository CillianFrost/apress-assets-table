/* eslint no-console: 0 */
/* eslint no-alert: 0 */
import React from 'react';
import Checkbox from './Checkbox';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { val: true };
  }

  changeVal = (val) => {
    console.log('checked', val);
    this.setState({
      val,
    });
  }

  render() {
    const { val } = this.state;

    return (
      <section className="example-wrapper">
        <h3>Checkbox:</h3>
        <Checkbox
          onChange={this.changeVal}
          checked={val}
        />
      </section>
    );
  }
}
