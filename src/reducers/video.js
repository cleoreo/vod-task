import { handleActions } from 'modules/helpers';

import { VideoActionTypes } from 'constants/index';

export const videoState = {
  videoList: {
    data: null,
    success: false,
    error: false,
  },
  videoPlaying: null,
  fetching: null,
};

export default {
  video: handleActions(
    {
      [VideoActionTypes.VIDEO_GET_LIST_REQUEST]: draft => {
        draft.fetching = 'VIDEO_GET_LIST_REQUEST';
      },
      [VideoActionTypes.VIDEO_GET_LIST_SUCCESS]: (draft, { payload }) => {
        draft.videoList.data = payload;
        draft.videoList.success = true;
        draft.videoList.error = false;
        draft.fetching = null;
      },
      [VideoActionTypes.VIDEO_GET_LIST_FAILURE]: (draft, { payload }) => {
        draft.videoList.data = null;
        draft.videoList.success = false;
        draft.videoList.error = payload;
        draft.fetching = null;
      },
      [VideoActionTypes.VIDEO_SET_PLAY_VIDEO]: (draft, { payload }) => {
        draft.videoPlaying = payload;
      },
      [VideoActionTypes.VIDEO_RESET_PLAY_VIDEO]: draft => {
        draft.videoPlaying = null;
      },
    },
    videoState,
  ),
};
