import axios from "./Axios";
import { API_KEY } from "./components/Requests";
import { db } from "./firebase";

export function fetchMovie(collectionType, fetchType) {
  async function fetchMovies() {
    const request = await axios.get(fetchType);
    const totalData = request.data.results;
    totalData.map((item) => {
      db.collection(collectionType)
        .doc(item?.id.toString())
        .set({
          id: item?.id,
          background_img: `https://image.tmdb.org/t/p/original${item?.backdrop_path}`,
          media_type:
            item?.media_type === undefined ? "movie" : item?.media_type,
          original_title:
            item?.original_title === undefined ? "" : item?.original_title,
          overview: item?.overview === undefined ? "" : item?.overview,
          poster: `https://image.tmdb.org/t/p/original${item?.poster_path}`,
          release_date:
            item?.release_date === undefined ? "" : item?.release_date,
          vote_average:
            item?.vote_average === undefined ? "" : item?.vote_average,
          vote_count: item?.vote_count === undefined ? "" : item?.vote_count,
        })
        .then(() => {
          //Document successfully written!
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      async function getDetails() {
        const detailRequest = await axios.get(
          `/movie/${item?.id.toString()}?api_key=${API_KEY}&append_to_response=videos,images`
        );
        const data = detailRequest.data;
        db.collection(collectionType)
          .doc(item?.id.toString())
          .set(
            {
              tagline: data?.tagline,
              runtime: data?.runtime,
              revenue: data?.revenue,
              trailer:
                data?.videos?.results[0]?.key === undefined
                  ? ""
                  : data?.videos?.results[0]?.key,
              logo:
                data?.images?.logos.find((elem) => elem?.iso_639_1 === "en")
                  ?.file_path === undefined
                  ? ""
                  : `https://image.tmdb.org/t/p/original${
                      data?.images?.logos.find(
                        (elem) => elem?.iso_639_1 === "en"
                      ).file_path
                    }`,
            },
            { merge: true }
          )
          .then(() => {
            //Document successfully written!
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      }
      getDetails();
      async function getCast() {
        const castData = [];
        const cast = [];
        const castRequest = await axios.get(
          `/movie/${item?.id.toString()}/credits?api_key=${API_KEY}&language=en-US`
        );
        castData.push(castRequest.data.cast.slice(0, 10));
        cast.push(castData[0]);
        cast.forEach((castMem) => {
          db.collection(collectionType)
            .doc(item?.id.toString())
            .set(
              {
                castMem,
              },
              { merge: true }
            )
            .then(() => {
              //Document successfully written!
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        });
      }
      getCast();
      return item;
    });
    return request;
  }
  fetchMovies();
}
export function fetchTv(collectionType, fetchType) {
  async function fetchSeries() {
    const request = await axios.get(fetchType);
    const totalData = request.data.results;
    totalData.map((item) => {
      db.collection(collectionType)
        .doc(item?.id.toString())
        .set({
          id: item?.id,
          background_img: `https://image.tmdb.org/t/p/original${item?.backdrop_path}`,
          media_type: item?.media_type === undefined ? "tv" : item?.media_type,
          original_title:
            item?.original_name === undefined ? "" : item?.original_name,
          overview: item?.overview === undefined ? "" : item?.overview,
          poster: `https://image.tmdb.org/t/p/original${item?.poster_path}`,
          release_date:
            item?.first_air_date === undefined ? "" : item?.first_air_date,
          vote_average:
            item?.vote_average === undefined ? "" : item?.vote_average,
          vote_count: item?.vote_count === undefined ? "" : item?.vote_count,
        })
        .then(() => {
          //Document successfully written!
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      async function getDetails() {
        const detailRequest = await axios.get(
          `/tv/${item?.id.toString()}?api_key=${API_KEY}&append_to_response=videos,images`
        );
        const data = detailRequest.data;
        db.collection(collectionType)
          .doc(item?.id.toString())
          .set(
            {
              tagline: data?.tagline === undefined ? "" : data?.tagline,
              trailer:
                data?.videos?.results[0]?.key === undefined
                  ? ""
                  : data?.videos?.results[0]?.key,
              logo:
                data?.images?.logos.find((elem) => elem?.iso_639_1 === "en")
                  ?.file_path === undefined
                  ? ""
                  : `https://image.tmdb.org/t/p/original${
                      data?.images?.logos.find(
                        (elem) => elem?.iso_639_1 === "en"
                      ).file_path
                    }`,
            },
            { merge: true }
          )
          .then(() => {
            //Document successfully written!
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      }
      getDetails();
      async function getCast() {
        const castData = [];
        const cast = [];
        const castRequest = await axios.get(
          `/tv/${item?.id.toString()}/credits?api_key=${API_KEY}&language=en-US`
        );
        castData.push(castRequest.data.cast.slice(0, 10));
        cast.push(castData[0]);
        cast.forEach((castMem) => {
          db.collection(collectionType)
            .doc(item?.id.toString())
            .set(
              {
                castMem,
              },
              { merge: true }
            )
            .then(() => {
              //Document successfully written!
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        });
      }
      getCast();
      return item;
    });
    return request;
  }
  fetchSeries();
}
