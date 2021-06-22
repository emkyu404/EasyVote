import "./css/App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Header from './components/Header'
import Home from './components/Home'
import Elections from './components/Elections'
import Profil from './components/Profil'
import Contact from './components/Contact'
import Login from './components/LoginUser'
import Footer from './components/Footer'
import NotConnected from './components/NotConnected'
import { Sling as Hamburger } from 'hamburger-react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'


function App() {
  const { addToast } = useToasts()
  const [currentUser, setCurrentUser] = useState({ idAdmin: "", emailAdmin: "", idCitoyen: "", nomCitoyen: "", prenomCitoyen: "", emailCitoyen: "", idAdresse: "", idElecteur: "" })
  const [loginError, setLoginError] = useState("");
  const [showMenu, setShowMenu] = useState(false)
  const [render, setRender] = useState(false)

  /* state appeler dans handleConnected, fonction elle-même appelé à la connexion et à la déconnexion */
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    //login("j-f.tang@email.com", "tang");
    //loginAdmin("admin@email.fr", "admin");
    //disconnect();
    handleConnected()
  }, [currentUser])

  useEffect(() => {
    console.log(connected)
  }, [connected])


  /**
   * Vérifie si l'idCitoyen est vide ou non, en conséquence modifie la state connected à true ou false
   */
  const handleConnected = () => {
    if (currentUser.idCitoyen === "" && currentUser.idAdmin === "") {
      console.log("User not connected")
      setConnected(false)
    } else {
      console.log("User connected : " + currentUser.idCitoyen)
      setConnected(true)
    }
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const desactivateMenu = () => {
    if (showMenu) {
      document.querySelector('div[class="hamburger-react"').click()
    }
  }

  const login = async (email, password) => {
    const response = await Axios.post("http://localhost:3001/login", { email: email, password: password })
    if (response.data.message) {
      setLoginError(response.data.message);
      console.log("hey")
      addToast("Erreur : " + response.data.message, {
        appearance: 'error',
        autoDismiss: true,
      })

    } else {
      setCurrentUser(response.data)
      addToast("Utilisateur connecté", {
        appearance: 'success',
        autoDismiss: true,
      })
    }
    //window.location.replace("/")
  };


  const loginAdmin = (email, password) => {
    Axios.post("http://localhost:3001/loginAdmin", { email: email, password: password }).then((response) => {
      if (response.data.message) {
        setLoginError(response.data.message);
      } else {
        setCurrentUser(response.data);
      }
    });
  };

  const disconnect = async () => {
    await Axios.post("http://localhost:3001/disconnect").then((response) => {
      if (response.data.message) {
        console.log(response.data.message);
        setCurrentUser({ idAdmin: "", emailAdmin: "", idCitoyen: "", nomCitoyen: "", prenomCitoyen: "", emailCitoyen: "", idAdresse: "", idElecteur: "" });
      } else {
        console.log("Vous n'avez pas réussi à vous deconnecter");
      }
    });
  };




  return (
    <div className="App">
      <Router>
        {/* Header */}
        <Header onDisconnection={disconnect} isConnected={connected} />
        {/* Tout ce qu'il y a sous la page */}
        <ClickAwayListener onClickAway={desactivateMenu}>
          <div className={"flex-row " + (showMenu ? "shown" : "hidden")}>

            {/* Si le state showMenu vrai, affiche le menu */}
            <div className="menu-container ">
              <Link to="/" style={{ textDecoration: "none" }}><div className="menu-item">Accueil</div></Link>
              <Link to="/elections" style={{ textDecoration: "none" }}><div className="menu-item">Elections</div></Link>
              <Link to="/profil" style={{ textDecoration: "none" }}><div className="menu-item">Profil</div></Link>
              <Link to="/contact" style={{ textDecoration: "none" }}><div className="menu-item">Contact</div></Link>
            </div>

            {/* Toujours visible, change le component afficher en fonction de l'adresse correspondante (par défaut '/' correspond au component Home) */}
            <div className="hamburger-column">
              <div className={"hamburger-container " + (showMenu ? "button-close-active" : "button-close-inactive")}>
                <Hamburger label="Show Menu" size={20} color="#272729" onToggle={() => {
                  toggleMenu()
                }} />
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
              {connected ? <Elections /> : <NotConnected />}
            </Route>
            <Route exact path="/profil">
              {connected ? <Profil /> : <NotConnected />}
            </Route>
            <Route exact path="/contact">
              <Contact />
            </Route>
            <Route exact path="/login">
              <Login onLogin={login} />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
