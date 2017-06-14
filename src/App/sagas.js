import {takeLatest, takeEvery} from 'redux-saga/effects';
import * as imageEditorSagas from '../ImageEditor/sagas';
import loadTableData from '../Table/sagas';
import loadHelp from '../Help/sagas';
import {loadRubricatorData, setRubricatorPosition} from '../Tree/sagas';
import {saveCreateDiff, save} from '../SaveControl/sagas';
import * as remove from '../remove/sagas';
import * as removeAction from '../remove/actions';


export default function* subscribeForLoadTableData() {
  yield takeLatest('TABLE_EDITOR_LOAD_START', loadTableData);
  yield takeLatest('TREE_LOAD_START', loadRubricatorData);
  yield takeEvery('TREE_MOVE_NODE_REQUEST', setRubricatorPosition);
  yield takeLatest('HELP_LOAD_START', loadHelp);
  yield takeLatest('SAVE_CREATE_DIFF', saveCreateDiff);
  yield takeLatest('SAVE_START', save);
  yield takeLatest('IMAGE_EDITOR_UPDATE_IMAGES', imageEditorSagas.updateImages);
  yield takeLatest(removeAction.REMOVE_GROUP, remove.removeGroup);
  yield takeLatest(removeAction.DELETE_GROUP, remove.deleteGroup);
  yield takeLatest(removeAction.REMOVE_EMPTY_GROUPS, remove.deleteEmptyGroups);
  yield takeLatest(removeAction.REMOVE_GROUPS, remove.removeGroups);
}
