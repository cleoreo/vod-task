import apisauce from 'apisauce';
import config from '../config';


const Api = (baseURL = config.proxyUrl + config.API_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
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
