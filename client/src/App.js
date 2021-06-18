import "./css/App.css";
import { useState, useEffect } from "react";
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
  const [currentUser, setCurrentUser] = useState({idCitoyen: "", nomCitoyen: "", prenomCitoyen: "", emailCitoyen: "a", idAdresse: "", idElecteur: ""})
  const [loginError, setLoginError] = useState("")

  const [showMenu, setShowMenu] = useState(false)
  const [render, setRender] = useState(false)

  useEffect(() => {
    login("j-f.tang@email.com", "tanga");
  }, [])

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const desactivateMenu = () => {
    if(showMenu){
      setShowMenu(false)
    }
  }

  const login = (email, password)=>{
    Axios.post("http://localhost:3001/login", {email : email, password : password}).then((response)=>{
      console.log("reponse");
      if (response.data.message){
        setLoginError(response.data.message);
      }else{
        console.log(response.data);
        setCurrentUser(response.data);
      }
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
                        <Link to="/login" style={{ textDecoration : "none" }}><div className="menu-item">Connexion</div></Link>
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
            </ClickAwayListener>
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
                  <Route exact path="/login">
                    <Login />
                  </Route>
            </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
