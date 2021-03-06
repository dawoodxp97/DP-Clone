export const img_url = "https://image.tmdb.org/t/p/original";
export const API_KEY = process.env.REACT_APP_API_KEY;
const requests = {
  fetchTrendingMovie: `/trending/movie/day?api_key=${API_KEY}`,
  fetchTrendingSeries: `/trending/tv/day?api_key=${API_KEY}`,
  fetchOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchTopRatedSeries: `/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
  fetchPopularSeries: `/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchAnimateMovies: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchMcuMovies: `/list/8106428?api_key=${API_KEY}&language=en-US`,
  fetchMcuSeries: `/list/8106698?api_key=${API_KEY}&language=en-US`,
  fetchDisneyMovies: `/list/8106429?api_key=${API_KEY}&language=en-US`,
  fetchPixarMovies: `/list/9095?api_key=${API_KEY}&language=en-US`,
  fetchStarwars: `/list/8136?api_key=${API_KEY}&language=en-US`,
  fetchNatgeo: `/list/8106699?api_key=${API_KEY}&language=en-US`,
};

export default requests;
