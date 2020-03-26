const Api = () => {
  const movieGetMovies = () => require('./movies.json');
  return {
    movieGetMovies,
  };
};

export default Api;
