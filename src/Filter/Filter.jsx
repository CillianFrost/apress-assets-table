import {
  connect,
  Component,
  actionsTable,
  actionsCable,
  actionsFilter,
} from './import';

class Filter extends Component {
  componentDidUpdate() {
    const query = {};
    const { config, dispatch } = this.props;

    if (config.isChange) {
      Object.keys(config.params)
        .forEach((key) => { query[key] = JSON.stringify(config.params[key]); });

      dispatch(actionsTable.load());

      if (config.cableEnabled) {
        actionsCable.setQuery(query);
      }

      dispatch(actionsFilter.noChange());
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  config: state.config,
});

export default connect(mapStateToProps)(Filter);
