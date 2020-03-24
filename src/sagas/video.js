/**
 * @module Sagas/GitHub
 * @desc GitHub
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';

import { VideoActionTypes } from 'constants/index';
import Api from '../api/Api';

/**
 * Get Video List
 *
 * @param {Object} action
 *
 */
export function* getVideoList() {
  const response = yield call(Api().movieGetMovies);

  if (response.ok) {
    yield put({
      type: VideoActionTypes.VIDEO_GET_LIST_SUCCESS,
      payload: response.data,
    });
  } else {
    yield put({
      type: VideoActionTypes.VIDEO_GET_LIST_FAILURE,
      payload: response,
    });
  }
}

/**
 * GitHub Sagas
 */
export default function* root() {
  yield all([takeLatest(VideoActionTypes.VIDEO_GET_LIST_REQUEST, getVideoList)]);
}
