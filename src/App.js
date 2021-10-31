// Static Imports
import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { fetchMovie, fetchTv } from "./fetchData";
import requests from "./components/Requests";

//Dynamic Imports
const Login = lazy(() => import("./components/Login"));
const Home = lazy(() => import("./components/Home"));
const Signin = lazy(() => import("./components/Signin"));
const Register = lazy(() => import("./components/Register"));
const Header = lazy(() => import("./components/Header"));
const Details = lazy(() => import("./components/Details"));
const Footer = lazy(() => import("./components/Footer"));
const Movies = lazy(() => import("./components/Movies"));
const Series = lazy(() => import("./components/Series"));
const Originals = lazy(() => import("./components/Originals"));
const Watchlist = lazy(() => import("./components/Watchlist"));
const Search = lazy(() => import("./components/Search"));
const Profile = lazy(() => import("./components/Profile"));

function App() {
  const [, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        fetchMovie("trendingMovies", requests.fetchTrendingMovie);
        fetchTv("trendingSeries", requests.fetchTrendingSeries);
        fetchTv("netflixOriginals", requests.fetchOriginals);
        fetchMovie("topRatedMovies", requests.fetchTopRated);
        fetchTv("topRatedSeries", requests.fetchTopRatedSeries);
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
              }}
            >
              Page is Loading...
            </div>
          }
        >
          <Switch>
            <Route path="/watchlist">
              <Header />
              <Watchlist />
              <Footer />
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
              <Originals />
              <Footer />
            </Route>
            <Route path="/series">
              <Header />
              <Series />
              <Footer />
            </Route>
            <Route path="/movies">
              <Header />
              <Movies />
              <Footer />
            </Route>
            <Route path="/homepage">
              <Header />
              <Home />
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
