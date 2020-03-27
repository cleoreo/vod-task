const baseUrl = process.env.NODE_ENV === 'production' ? '/vod-task' : '';

const path = {
  home: `${baseUrl}/`,
  video: `${baseUrl}/video/:id`,
  history: `${baseUrl}/history`,
};

export default path;
