/**
 * @module Sagas/GitHub
 * @desc GitHub
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from 'constants/index';
import Api from '../api/Api';

/**
 * Get Repos
 *
 * @param {Object} action
 *
 */
export function* getRepos({ payload }) {
  const response = yield call(Api().movieGetMovies);
  console.log(response);
  if (response.ok) {
    yield put({
      type: ActionTypes.GITHUB_GET_REPOS_SUCCESS,
      payload: { data: response.data },
    });
  } else {
    yield put({
      type: ActionTypes.GITHUB_GET_REPOS_FAILURE,
      payload: response,
    });
  }
}

/**
 * GitHub Sagas
 */
export default function* root() {
  yield all([takeLatest(ActionTypes.GITHUB_GET_REPOS, getRepos)]);
}
