import "./css/App.css";
import { useState } from "react";
import Axios from "axios";
import Header from './components/Header'
import Home from './components/Home'
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
      <div className="flex-row">
          <Router>
            {/* Si le state showMenu vrai, affiche le menu */}
          {showMenu? <div className="menu-container">
              <div className="menu-item">
                <Link to="/" style={{ textDecoration : "none" }}>Home</Link>
              </div>
             </div> : ''}
          {/* Toujours visible, change le component afficher en fonction de l'adresse correspondante (par défaut '/' correspond au component Home) */}
            <div className="page">
              <Hamburger onToggle={() => {
                toggleMenu()
              }}  />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
        </Router>
       
      </div>
    </div>
  );
}

export default App;
