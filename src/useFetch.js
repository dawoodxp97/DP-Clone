import { useEffect, useState } from "react";
import { db } from "./firebase";

const useFetchData = () => {
  //States
  const [loading, setLoading] = useState(null);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [netflixOriginals, setNetflixOriginals] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [animatedMovies, setAnimatedMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [fetchDocumentaries, setfetchDocumentaries] = useState([]);

  //Funtions to get data from database
  async function getData(type, store) {
    const data = [];
    const request = await db
      .collection(type)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        store(data);
      });
    return request;
  }

  //Fetch the data
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setLoading(true);
      getData("trendingMovies", setMovies);
      getData("trendingSeries", setSeries);
      getData("netflixOriginals", setNetflixOriginals);
      getData("topRatedMovies", setTopRatedMovies);
      getData("topRatedSeries", setTopRatedSeries);
      getData("popularSeries", setPopularSeries);
      getData("actionMovies", setActionMovies);
      getData("animatedMovies", setAnimatedMovies);
      getData("comedyMovies", setComedyMovies);
      getData("horrorMovies", setHorrorMovies);
      getData("romanceMovies", setRomanceMovies);
      getData("fetchDocumentaries", setfetchDocumentaries);
    }
    return () => {
      setLoading(false);
      isMounted = false;
    };
  }, []);

  return {
    loading,
    movies,
    series,
    netflixOriginals,
    topRatedMovies,
    topRatedSeries,
    popularSeries,
    actionMovies,
    animatedMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    fetchDocumentaries,
  };
};

export { useFetchData };
