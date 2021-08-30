import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Register from "./components/Register";
import Header from "./components/Header";
import Details from "./components/Details";
import Footer from "./components/Footer";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import Movies from "./components/Movies";
import Series from "./components/Series";
import Originals from "./components/Originals";
import Watchlist from "./components/Watchlist";
function App() {
  const [, dispatch] = useStateValue();
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
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/watchlist">
            <Header />
            <Watchlist />
            <Footer />
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
          <Route path="/detail/:id/:media_type">
            <Header />
            <Details />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
