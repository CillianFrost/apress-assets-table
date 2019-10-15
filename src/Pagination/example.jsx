/* eslint no-console: 0 */
import React from 'react';
import Pagination from './Pagination';

export default class PaginationExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { activePage: 3 };
  }

  handleSelect = ({ page }) => {
    console.log(`change page - ${page}`);
    this.setState({
      activePage: page,
    });
  }

  render() {
    const { activePage } = this.state;

    return (
      <div>
        <h3>Pagination:</h3>
        <div>
          <Pagination
            items={5}
            onSelect={this.handleSelect}
            activePage={activePage}
          />
        </div>
        <br />
        <Pagination
          mix="mixed-class other-class"
          items={145}
          onSelect={this.handleSelect}
          activePage={activePage}
        />
      </div>
    );
  }
}
