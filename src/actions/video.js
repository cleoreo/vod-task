// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { createActions } from 'redux-actions';

import { VideoActionTypes } from 'constants/index';

export const { videoGetListRequest: getVideoList } = createActions({
  [VideoActionTypes.VIDEO_GET_LIST_REQUEST]: () => ({}),
});
