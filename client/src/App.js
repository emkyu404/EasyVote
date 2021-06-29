import "./css/App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Sling as Hamburger } from 'hamburger-react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'

import Header from './components/Header'
import Home from './components/Home'
import Elections from './components/Elections'
import Profil from './components/Profil'
import Contact from './components/Contact'
import Login from './components/LoginUser'
import LoginAdmin from './components/LoginAdmin'
import Footer from './components/Footer'
import NotConnected from './components/NotConnected'
import Election from './components/Election'
import Test from './components/Test'

// import AddCandidat from './components/AddCandidat'

// URL de base, à changer lorsque l'url change
const baseUrl = "http://localhost:3001"

function App() {
  Axios.defaults.withCredentials = true

  const {addToast} = useToasts()
  const [currentUser, setCurrentUser] = useState({idAdmin: "", idCitoyen: ""})
  const [currentDate, setCurrentDate] = useState(["No date"])
  const [elections, setElections] = useState([])
  const [election, setElection] = useState([])
  const [candidats, setCandidats] = useState([])
  const [showMenu, setShowMenu] = useState(false)
  const [render, setRender] = useState(false)
  const [currentFilter, setCurrentFilter] = useState("");
  const [filteredElections, setFilteredElections] = useState([])


  // const [idElection, setIdElection] = useState(0)

  /* state appeler dans handleConnected, fonction elle-même appelé à la connexion et à la déconnexion */
  const [connected, setConnected] = useState(false)

  //const {idElection} = useParams()

  useEffect(() => {
    token();
    // setIdElection(1)
  },[])

  useEffect(() => {
    handleConnected()
  }, [currentUser])

  useEffect(() => {
    var aFilteredelections
    switch (currentFilter){
      case "Ongoing" : 
        aFilteredelections = elections.filter(election => new Date(election.dateDebutElection) < currentDate && new Date(election.dateFinElection) > currentDate)
        break;
      case "Soon" : 
        aFilteredelections = elections.filter(election => new Date(election.dateDebutElection) > currentDate)
        break;
      case "Finished" : 
        aFilteredelections = elections.filter(election => new Date(election.dateFinElection) < currentDate)
        break;
      default : 
        aFilteredelections = elections.filter(election => new Date(election.dateDebutElection) < currentDate && new Date(election.dateFinElection) > currentDate)
        break;
    }
    
    setFilteredElections(aFilteredelections)
  }, [currentFilter])

  useEffect(() => {
    //console.log(filteredElections)
  },[filteredElections])
  /**
   * Vérifie si l'idCitoyen est vide ou non, en conséquence modifie la state connected à true ou false
   */
  const handleConnected = () => {
    if (currentUser.idCitoyen === "" && currentUser.idAdmin === "") {
      setConnected(false)
    } else {
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

  const filterElection = (filter) => {
    setCurrentFilter(filter)
  }

  const token = async () => {
    const response = await Axios.get(baseUrl+"/token")
    response.data.message ? setCurrentUser({idAdmin: "", idCitoyen: ""}) : setCurrentUser(response.data); 
  }

  const login = async (email, password) => {
    const response = await Axios.post(baseUrl+"/login", { email: email, password: password })
    if (response.data.message) {
      addToast("Erreur : " + response.data.message, {
        appearance: 'error',
        autoDismiss: true,
     })
    } 
    else {
      setCurrentUser(response.data)
      addToast("Bonjour " + currentUser.nomCitoyen, {
        appearance: 'success',
        autoDismiss: true,
      })
    }
    //window.location.replace("/")
  };

  const loginAdmin = async (email, password) => {
    const response = await Axios.post(baseUrl+"/loginAdmin", { email: email, password: password })
    if (response.data.message) {
      addToast("Erreur : " + response.data.message, {
        appearance: 'error',
        autoDismiss: true,
     })
    } 
    else {
      setCurrentUser(response.data)
      addToast("Bonjour " + currentUser.idAdmin, {
        appearance: 'success',
        autoDismiss: true,
      })
    }
  };

  const disconnect = async () => {
    const response = await Axios.get(baseUrl+"/disconnect")
    if (response.data.message) {
      setCurrentUser({ idAdmin: "", idCitoyen: "" });
      addToast("Utilisateur déconnecté", {
        appearance: 'success',
        autoDismiss: true,
      })

    } 
    else {
      addToast("Vous n'avez pas réussi à vous deconnecter", {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  };

  const profile = async () => {
    const response = await Axios.post(baseUrl+"/profile", {idCitoyen : currentUser.idCitoyen})
    if (response.data.message){
      addToast("Erreur : " + response.data.message, {
        appearance: 'error',
        autoDismiss: true,
      })
    }
    else{
      setCurrentUser(response.data);
    } 
  }            

  const addElection = (titreElection, dateDebut, dateFin, descriptionElection, electionType, nomRegion, codeDepartement, codePostal) => {
    const response = Axios.post(baseUrl+"/addElection", { titreElection: titreElection, dateDebut: dateDebut, dateFin: dateFin, descriptionElection: descriptionElection, electionType: electionType, nomRegion: nomRegion, codeDepartement: codeDepartement, codePostal: codePostal })
      if (response.data.message){
        console.log(response.data.message);
      } 
      else {
        console.log(response.data);
      }
  }

  const addCandidat = (titreCandidat, descriptionCandidat, urlImage, idElection) => {
    Axios.post(baseUrl+"/addCandidat", { titreCandidat: titreCandidat, descriptionCandidat: descriptionCandidat, urlImage: urlImage, idElection: idElection }).then((response)=>{
      if (response.data.message){
        console.log(response.data.message);
      } 
      else {
        console.log(response.data);
      }
    });
  }
  
  const getCurrentDate = async () => {
    const response = await Axios.get(baseUrl+"/currentDate")
    if (response.data.message){
      addToast("Impossible de récuperer la date du jour", {
        appearance: 'error',
        autoDismiss: true,
      })
    }
    else {
      setCurrentDate(new Date(response.data))
    }
  }

  const getElections = async () => {
    const response = await Axios.post(baseUrl+"/getElections", {idCitoyen : currentUser.idCitoyen})
    if (response.data.message){
      addToast("Erreur : " + response.data.message, {
        appearance: 'error',
        autoDismiss: true,
      })
    }
    else{
      setElections(response.data);
    }
  }

  const getElection = async () => {
    console.log("test")
    const response = await Axios.post(baseUrl+"/getElection", {idElection : 1})
    if (response.data.message){
      addToast("Erreur : " + response.data.message, {
        appearance: 'error',
        autoDismiss: true,
      })
    }
    else{
      setElection(response.data);
    }
  }

  const getCandidats = async () => {
    const response = await Axios.post(baseUrl+"/getCandidats", {idElection : election.idElection})
    if (response.data.message){
      addToast("Erreur : " + response.data.message, {
        appearance: 'error',
        autoDismiss: true,
      })
    }
    else{
      setCandidats(response.data);
    }
  }

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
                {connected ? <Elections onAddElection={addElection} getCurrentDate={getCurrentDate} getElections={getElections} filteredElections={filteredElections} filterElection={filterElection} /> : <NotConnected />}
              </Route>
              <Route exact path="/profil">
                {connected ? <Profil getProfile={profile} currentUser={currentUser} /> : <NotConnected />}
              </Route>
              <Route exact path="/contact">
                <Contact />
              </Route>
              <Route exact path="/login">
                {connected ? <Home/> : <Login onLogin={login} />}
              </Route>
              <Route exact path="/loginAdmin">
                {connected ? <Home/> : <LoginAdmin onLogin={loginAdmin} />}
              </Route>
              <Route exact path="/election:idElection">
                {connected ? <Election getElection={getElection} election={election} getCandidats={getCandidats} candidats={candidats} /> : <LoginAdmin onLogin={loginAdmin} />}
              </Route>

              <Route exact path="/addCandidat">
                {/* <AddCandidat onAddCandidat={addCandidat} idElectionChoisi={ idElection } /> */}
              </Route>
              <Route exact path="/test">
                <Test />
              </Route>
            </Switch>
          </div>
          <Footer />
        </Router>
    </div>
  );
}

export default App;
