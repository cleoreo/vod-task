import { keyMirror } from 'modules/helpers';

/**
 * @namespace Constants
 * @desc App constants
 */

/**
 * @constant {Object} ActionTypes
 * @memberof Constants
 */
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
