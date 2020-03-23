import { all, fork } from 'redux-saga/effects';

import video from './video';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(video)]);
}
