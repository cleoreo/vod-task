/**
 * @module Sagas/GitHub
 * @desc GitHub
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';

import { VideoActionTypes } from 'constants/index';
import Api from '../api/Api';

/**
 * Get Repos
 *
 * @param {Object} action
 *
 */
export function* getVideoList({ payload }) {
  const response = yield call(Api().movieGetMovies);
  console.log(response);
  if (response.ok) {
    yield put({
      type: VideoActionTypes.VIDEO_GET_LIST_SUCCESS,
      payload: { data: response.data },
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
