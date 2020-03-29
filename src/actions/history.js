// @flow
/**
 * @module Actions/User
 * @desc History Actions
 */
import { createActions } from 'redux-actions';

import { HistoryActionTypes } from 'constants/index';

export const {
  historyAddToHistory: addToHistory,
  historyRemoveFromHistory: removeFromHistory,
} = createActions({
  [HistoryActionTypes.HISTORY_ADD_TO_HISTORY]: video => video,
  [HistoryActionTypes.HISTORY_REMOVE_FROM_HISTORY]: () => {},
});
