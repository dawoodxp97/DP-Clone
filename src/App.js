// Static Imports
import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
// import { fetchMovie, fetchTv } from "./fetchData";
// import requests from "./components/Requests";
import ClipLoader from "react-spinners/ClipLoader";

//Dynamic Imports
const Login = lazy(() => import("./components/Login"));
const Home = lazy(() => import("./components/Home"));
const Signin = lazy(() => import("./components/Signin"));
const Register = lazy(() => import("./components/Register"));
const Header = lazy(() => import("./components/Header"));
const Details = lazy(() => import("./components/Details"));
const Footer = lazy(() => import("./components/Footer"));
const Watchlist = lazy(() => import("./components/Watchlist"));
const Search = lazy(() => import("./components/Search"));
const Profile = lazy(() => import("./components/Profile"));
const ViewContent = lazy(() => import("./components/ViewContent.js"));

function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     let isFetch = true;
  //     const addData = () => {
  //       if (isFetch === true) {
  //         fetchMovie("trendingMovies", requests.fetchTrendingMovie);
  //         fetchTv("trendingSeries", requests.fetchTrendingSeries);
  //         fetchTv("netflixOriginals", requests.fetchOriginals);
  //         fetchMovie("topRatedMovies", requests.fetchTopRated);
  //         fetchTv("topRatedSeries", requests.fetchTopRatedSeries);
  //         fetchMovie("mcuMovies", requests.fetchMcuMovies);
  //         fetchTv("mcuSeries", requests.fetchMcuSeries);
  //         fetchMovie("pixarMovies", requests.fetchPixarMovies);
  //         fetchMovie("starwarsMovies", requests.fetchStarwars);
  //         fetchTv("natGeo", requests.fetchNatgeo);
  //         fetchMovie("disneyMovies", requests.fetchDisneyMovies);
  //       }
  //       isFetch = false;
  //       return isFetch;
  //     };
  //     addData();
  //   }
  //   return () => {
  //     //Cleanup
  //   };
  // }, [user]);

  return (
    <div className="App">
      <Router>
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "90vh",
                width: "100%",
              }}
            >
              <ClipLoader color="white" loading={true} size={30} />
              <p>Loading</p>
            </div>
          }
        >
          <Switch>
            <Route path="/watchlist">
              <Header />
              <Watchlist />
            </Route>
            <Route path="/profile">
              <Header />
              <Profile />
            </Route>
            <Route path="/search">
              <Header />
              <Search />
            </Route>
            <Route path="/originals">
              <Header />
              <ViewContent
                collectionType="netflixOriginals"
                title="Originals"
              />
              <Footer />
            </Route>
            <Route path="/series">
              <Header />
              <ViewContent
                collectionType="topRatedSeries"
                title="Top Rated Series"
              />
              <Footer />
            </Route>
            <Route path="/movies">
              <Header />
              <ViewContent
                collectionType="topRatedMovies"
                title="Top Rated Movies"
              />
              <Footer />
            </Route>
            <Route path="/pixarMovies">
              <Header />
              <ViewContent collectionType="pixarMovies" title="Pixar Movies" />
              <Footer />
            </Route>
            <Route path="/mcu">
              <Header />
              <ViewContent
                collectionType="mcuMovies"
                title="Marvel Cinematic Movies"
              />
              <ViewContent
                collectionType="mcuSeries"
                title="Marvel Cinematic Series"
              />
              <Footer />
            </Route>
            <Route path="/starwarsMovies">
              <Header />
              <ViewContent
                collectionType="starwarsMovies"
                title="Starwars Movies"
              />
              <Footer />
            </Route>
            <Route path="/natGeo">
              <Header />
              <ViewContent
                collectionType="natGeo"
                title="National Geography Series"
              />
              <Footer />
            </Route>
            <Route path="/disneyMovies">
              <Header />
              <ViewContent
                collectionType="disneyMovies"
                title="Disney Movies"
              />
              <Footer />
            </Route>
            <Route path="/homepage">
              <Header />
              <Home />
              <ViewContent
                collectionType="trendingMovies"
                title="Trending Movies"
              />
              <ViewContent
                collectionType="trendingSeries"
                title="Trending Series"
              />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/signin">
              <Signin />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/detail/:type/:id/:media_type">
              <Header />
              <Details />
              <Footer />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
