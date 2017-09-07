import {
  connect,
  Component,
  browserHistory,
  actionsTable,
  actionsCable,
  actionsFilter,
} from './import';

class Filter extends Component {
  componentDidUpdate() {
    const query = {};

    if (this.props.config.isChange) {
      Object.keys(this.props.config.params)
        .forEach((key) => { query[key] = JSON.stringify(this.props.config.params[key]); });

      this.props.dispatch(actionsTable.load());

      if (this.props.config.cableEnabled) {
        actionsCable.setQuery(query);
      } else {
        browserHistory.push({
          pathname: browserHistory.getCurrentLocation().pathname,
          query
        });
      }

      this.props.dispatch(actionsFilter.noChange());
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  config: state.config
});

export default connect(mapStateToProps)(Filter);
