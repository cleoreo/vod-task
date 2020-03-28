const baseUrl = process.env.NODE_ENV === 'production' ? '/vod-task' : '';

const path = {
  home: `${baseUrl}/`,
  videoRoot: `${baseUrl}/video`,
  video: `${baseUrl}/video/:id`,
  history: `${baseUrl}/history`,
};

export function getPath(route, params) {
  Object.keys(params).forEach(key => {
    const string = `:${key}`;
    route = route.replace(string, params[key]);
  });
  return route;
}
export default path;
