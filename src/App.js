import React, {useEffect} from "react"
import './App.scss';
import Drawer from "./components/Drawer";
import Home from "./containers/Home/Home"
import About from "./containers/About/About";
import Menu from "./containers/Menu/Menu";
import Contact from "./containers/Contact/Contact";
import Feedback from "./containers/Feedbacks/Feedback";
import Favorites from "./containers/Favorite/Favorite";
import Users from "./containers/Users/Users"
import { BrowserRouter, Route, Redirect,  Switch, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    textAlign: "center"
  }
});

const App = () => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    history?.push("/home")
  }, [])
  return (
    <BrowserRouter>
    <div className={`${classes.container}`}>
      <Drawer />
      <div className="myApp">
          <Switch>
            <Route exact path="/home" render={props => <Home {...props} />} />
            <Route exact path="/about" render={props => <About {...props} />} />
            <Route exact path="/menu" render={props => <Menu {...props} />} />
            <Route exact path="/contact" render={props => <Contact {...props} />} />
            <Route exact path="/favorites" render={props => <Favorites {...props} />} />
            <Route exact path="/users" render={props => <Users {...props} />} />
            <Route exact path="/feedback" render={props => <Feedback {...props} />} />
            <Redirect to="/home" />
          </Switch>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
