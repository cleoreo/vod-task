// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { createActions } from 'redux-actions';

import { VideoActionTypes } from 'constants/index';

export const {
  videoGetListRequest: getVideoList,
  videoSetPlayVideo: setPlayVideo,
  videoResetPlayVideo: resetPlayVideo,
} = createActions({
  [VideoActionTypes.VIDEO_GET_LIST_REQUEST]: () => ({}),
  [VideoActionTypes.VIDEO_SET_PLAY_VIDEO]: video => video,
  [VideoActionTypes.VIDEO_RESET_PLAY_VIDEO]: () => ({}),
});
