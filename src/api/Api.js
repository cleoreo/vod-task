import apisauce from 'apisauce';
import config from '../../config/config';

const Api = (baseURL = config.proxyUrl + config.API_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });

  // Movie
  const movieGetMovies = () => api.get('/movies.json');

  return {
    movieGetMovies,
  };
};

export default Api;
