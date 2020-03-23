import { parseError } from 'modules/client';
import { handleActions } from 'modules/helpers';

import { STATUS, VideoActionTypes } from 'constants/index';

export const videoState = {
  videoList: {
    data: null,
    success: false,
    error: false,
  },
  fetching: null,
};

export default {
  video: handleActions(
    {
      [VideoActionTypes.VIDEO_GET_LIST_REQUEST]: (draft, { payload }) => {
        draft.fetching = 'VIDEO_GET_LIST_REQUEST';
      },
      [VideoActionTypes.VIDEO_GET_LIST_SUCCESS]: (draft, { payload }) => {
        draft.videoList.data = payload;
        draft.videoList.success = true;
        draft.fetching = null;
      },
      [VideoActionTypes.VIDEO_GET_LIST_FAILURE]: (draft, { payload }) => {
        draft.videoList.data = null;
        draft.videoList.success = false;
        draft.videoList.error = payload;
        draft.fetching = null;
      },
    },
    videoState,
  ),
};
