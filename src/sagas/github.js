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
  try {
    const response = yield Api().movieGetMovies();
    console.log(response);

    yield put({
      type: ActionTypes.GITHUB_GET_REPOS_SUCCESS,
      payload: { data: response.data.items },
    });
  } catch (err) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.GITHUB_GET_REPOS_FAILURE,
      payload: err,
    });
  }
}

/**
 * GitHub Sagas
 */
export default function* root() {
  yield all([takeLatest(ActionTypes.GITHUB_GET_REPOS, getRepos)]);
}
