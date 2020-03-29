import { keyMirror } from 'modules/helpers';

export const ActionTypes = keyMirror({
  EXCEPTION: undefined,
  SHOW_ALERT: undefined,
  HIDE_ALERT: undefined,
});

export const VideoActionTypes = keyMirror({
  VIDEO_GET_LIST_REQUEST: undefined,
  VIDEO_GET_LIST_SUCCESS: undefined,
  VIDEO_GET_LIST_FAILURE: undefined,
  VIDEO_SET_PLAY_VIDEO: undefined,
  VIDEO_RESET_PLAY_VIDEO: undefined,
});

export const HistoryActionTypes = keyMirror({
  HISTORY_ADD_TO_HISTORY: undefined,
  HISTORY_REMOVE_FROM_HISTORY: undefined,
});
