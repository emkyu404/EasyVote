import "./css/App.css";
import { useState } from "react";
import Axios from "axios";
import Header from './components/Header'
import Home from './components/Home'
import Elections from './components/Elections'
import Profil from './components/Profil'
import Login from './components/LoginUser'
import { Sling as Hamburger } from 'hamburger-react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [citizens, setCitizens] = useState([""])
  const [showMenu, setShowMenu] = useState(false)
  const [render, setRender] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const desactivateMenu = () => {
    if(showMenu){
      setShowMenu(false)
    }
  }

  const getCitizens = () => {
    console.log("aaa");
    Axios.get("http://localhost:3001/citizens").then((response) => {
      setCitizens(response.data);
    });
  };

  return (
    <div className="App">
      {/* Header */}
      <Header />

       {/* Tout ce qu'il y a sous la page */}
          <Router>
          <ClickAwayListener onClickAway={desactivateMenu}>
          <div className={"flex-row "+ (showMenu ? "shown" : "hidden")}>
           
            {/* Si le state showMenu vrai, affiche le menu */}
            <div className="menu-container ">
                        <Link to="/" style={{ textDecoration : "none" }}><div className="menu-item">Accueil</div></Link>
                        <Link to="/elections" style={{ textDecoration : "none" }}><div className="menu-item">Elections</div></Link>
                        <Link to="/profil" style={{ textDecoration : "none" }}><div className="menu-item">Profil</div></Link>
                        {/* <Link to="/login" style={{ textDecoration : "none" }}><div className="menu-item">Connexion</div></Link> */}
            </div>
            
          {/* Toujours visible, change le component afficher en fonction de l'adresse correspondante (par défaut '/' correspond au component Home) */}
              <div className="hamburger-column">
                <div className={"hamburger-container " + (showMenu ? "button-close-active" : "button-close-inactive")}>
                  <Hamburger label="Show Menu" size={20} color="#272729" onToggle={() => {
                    toggleMenu()
                  }}  />
                </div>
              </div>
            </div>
          <div className="main-container">
            <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route exact path="/elections">
                    <Elections />
                  </Route>
                  <Route exact path="/profil">
                    <Profil />
                  </Route>
                  {/* <Route exact path="/login">
                    <Login />
                  </Route> */}
            </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
