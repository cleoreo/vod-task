const baseUrl = process.env.NODE_ENV === 'production' ? '/vod-task' : '';

const path = {
  home: `${baseUrl}/`,
  private: `${baseUrl}/private`,
  test: `${baseUrl}/test`,
};

export default path;
