import { handleActions } from 'modules/helpers';
import produce from 'immer';

import { HistoryActionTypes } from 'constants/index';

function uniqByKeepFirst(a, key) {
  const seen = new Set();
  return a.filter(item => {
    const k = key(item);
    return seen.has(k) ? false : seen.add(k);
  });
}

export const historyState = {
  history: [],
};

const historyReducer = (state = historyState, action) =>
  produce(state, draft => {
    // eslint-disable-next-line default-case
    const { history } = state;
    const historyList = history.map(x => x);

    switch (action.type) {
      case HistoryActionTypes.HISTORY_ADD_TO_HISTORY:
        historyList.unshift(action.payload);
        draft.history = uniqByKeepFirst(historyList, JSON.stringify);
        break;
      case HistoryActionTypes.HISTORY_REMOVE_FROM_HISTORY:
        historyList.splice(action.payload, 1);
        draft.history = historyList;
        break;
    }
  });

export default {
  history: historyReducer,
};
