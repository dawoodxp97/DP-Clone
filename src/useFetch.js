import { useEffect, useState } from "react";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";

const useFetchData = () => {
  const [{ user }] = useStateValue();
  //States
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [netflixOriginals, setNetflixOriginals] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [disneyMovies, setDisneyMovies] = useState([]);
  const [mcuMovies, setMcuMovies] = useState([]);
  const [mcuSeries, setMcuSeries] = useState([]);
  const [pixarMovies, setPixarMovies] = useState([]);
  const [starwarsMovies, setStarwarsMovies] = useState([]);
  const [natGeo, setNatGeo] = useState([]);

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
      getData("trendingMovies", setMovies);
      getData("trendingSeries", setSeries);
      getData("netflixOriginals", setNetflixOriginals);
      getData("topRatedMovies", setTopRatedMovies);
      getData("topRatedSeries", setTopRatedSeries);
      getData("pixarMovies", setPixarMovies);
      getData("mcuMovies", setMcuMovies);
      getData("mcuSeries", setMcuSeries);
      getData("starwarsMovies", setStarwarsMovies);
      getData("natGeo", setNatGeo);
      getData("disneyMovies", setDisneyMovies);
    }
    return () => {
      setLoading(false);
      isMounted = false;
    };
  }, [user]);

  return {
    loading,
    movies,
    series,
    netflixOriginals,
    topRatedMovies,
    topRatedSeries,
    disneyMovies,
    mcuMovies,
    mcuSeries,
    pixarMovies,
    natGeo,
    starwarsMovies,
  };
};

export { useFetchData };
