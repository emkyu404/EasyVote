import "./css/App.css";
import { useState } from "react";
import Axios from "axios";
import Header from './components/Header'
import Home from './components/Home'
import Elections from './components/Elections'
import Profil from './components/Profil'
import { Sling as Hamburger } from 'hamburger-react'
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
          <div className="flex-row">
            {/* Si le state showMenu vrai, affiche le menu */}
            {showMenu? <div className="menu-container">
                        <Link to="/" style={{ textDecoration : "none" }}><div className="menu-item">Accueil</div></Link>
                        <Link to="/elections" style={{ textDecoration : "none" }}><div className="menu-item">Elections</div></Link>
                        <Link to="/profil" style={{ textDecoration : "none" }}><div className="menu-item">Profil</div></Link>
                    </div> : ''}
          {/* Toujours visible, change le component afficher en fonction de l'adresse correspondante (par défaut '/' correspond au component Home) */}
              <Hamburger color="#272729" onToggle={() => {
                toggleMenu()
              }}  />
            </div>
          <div className="page">
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
                </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
