const baseUrl = process.env.NODE_ENV === 'production' ? '/vod-task' : '';

const path = {
  home: `${baseUrl}/`,
  private: `${baseUrl}/private`,
  history: `${baseUrl}/history`,
};

export default path;
