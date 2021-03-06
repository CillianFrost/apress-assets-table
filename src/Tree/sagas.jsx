import {api, actions, actionsError, actionsTable, call, put, select} from './import';

const {TABLE_EDITOR_LOAD_START} = actionsTable;
const {ERROR_ADD, ERROR_REMOVE} = actionsError;
const {
  TREE_UPDATE_SUCCESS,
  TREE_LOAD_SUCCESS,
  TREE_LOAD_START,
} = actions;

const getRubricatorData = (filter, config) => {
  const sendData = {config};

  const sessionOrderColumn = sessionStorage.getItem('treeFilterOrderColumn');
  const sessionOrderDirection = sessionStorage.getItem('treeFilterOrderDirection');

  const isFilterFromSessionStorage = sessionOrderColumn && sessionOrderDirection;

  if (isFilterFromSessionStorage && !filter) {
    sendData.order_column = sessionOrderColumn;
    sendData.order_direction = sessionOrderDirection;
  }

  if (filter) {
    sendData.order_column = filter.order_column;
    sendData.order_direction = filter.order_direction;
  }

  return api.post(app.config.rubricatorUrl,
    sendData
  ).then(response => response.data);
};

const putRubricatorData = (payload, config) => {
  const {urlName, filter} = payload;

  const sendData = {config};

  if (filter.order_column) {
    sendData.order_column = filter.order_column;
    sendData.order_direction = filter.order_direction;
  }

  return api.put(`${app.config.rubricatorUrl}/${urlName}`,
    sendData
  ).then(response => response.data);
};


const updateRubricatorPosition = payload =>
  api.put(
    app.config.rubricatorUpdate.replace('_group_', payload.id),
    {product_group: payload.product_group}
  ).then(response => response.data);

const getConfig = props => props.config.config;

export function* loadRubricatorData(data) {
  try {
    yield put({type: ERROR_REMOVE, payload: {target: 'tree'}});
    const config = yield select(getConfig);
    const rubricatorData = yield call(getRubricatorData.bind({}, data.payload, config));
    yield put({type: TREE_LOAD_SUCCESS, payload: rubricatorData.tree_nodes});
  } catch (err) {
    yield put({
      type: ERROR_ADD,
      payload: {
        type: 'server',
        target: 'tree',
        title: 'Не удалось загрузить рубрикатор',
        action: TREE_LOAD_START
      }
    });
  }
}

export function* updateRubricatorData(data) {
  try {
    yield put({type: ERROR_REMOVE, payload: {target: 'tree'}});
    const config = yield select(getConfig);
    const rubricatorData = yield call(putRubricatorData.bind({}, data.payload, config));
    yield put({
      type: TREE_UPDATE_SUCCESS,
      payload: {
        id: data.payload.id,
        nodes: rubricatorData.tree_nodes
      }
    });
  } catch (err) {
    console.log(err);
  }
}

export function* setRubricatorPosition({payload}) {
  try {
    yield put({type: ERROR_REMOVE, payload: {target: 'tree'}});
    yield call(updateRubricatorPosition.bind({}, payload));
    yield put({type: TABLE_EDITOR_LOAD_START, payload: {}});
  } catch (err) {
    console.log(err);
  }
}
