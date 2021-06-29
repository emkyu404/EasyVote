import "./css/App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Sling as Hamburger } from 'hamburger-react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'

import Header from './components/Header'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Pages from './components/Pages'

// import AddCandidat from './components/AddCandidat'

// URL de base, à changer lorsque l'url change
const baseUrl = "http://localhost:3001"

function App() {
  Axios.defaults.withCredentials = true

  const {addToast} = useToasts()
  const [currentUser, setCurrentUser] = useState({idAdmin: "", idCitoyen: ""})
  const [elections, setElections] = useState([])
  const [showMenu, setShowMenu] = useState(false)
  const [render, setRender] = useState(false)
  const [idElection, setIdElection] = useState(0)


  /* state appeler dans handleConnected, fonction elle-même appelé à la connexion et à la déconnexion */
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    token();
    // setIdElection(1)
  },[])

  useEffect(() => {
    //login("j-f.tang@email.com", "tang");
    //loginAdmin("admin@email.fr", "admin");
    handleConnected()
  }, [currentUser])

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

  const disconnect = () => {
    Axios.post(baseUrl+"/disconnect").then((response) => {
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
    });
  };

  const profile = () => {
    Axios.post(baseUrl+"/profile", {idCitoyen : currentUser.idCitoyen}).then((response)=>{
      if (response.data.message){
        addToast("Erreur : " + response.data.message, {
          appearance: 'error',
          autoDismiss: true,
        })
      }
      else{
        setCurrentUser(response.data);
      } 
    });
  }   
  
  const getIdElection = (titreElection, dateDebutElection, dateFinElection) => {
    Axios.post(baseUrl+"/getIdElection", { titreElection: titreElection, dateDebutElection: dateDebutElection, dateFinElection: dateFinElection }).then((response)=>{
      if (response.data.message){
        console.log(response.data.message);
      } 
      else {
        console.log(response.data[0].idElection);
        setIdElection(response.data[0].idElection)
      }
    });
  }

  const addElection = (titreElection, dateDebutElection, dateFinElection, descriptionElection, electionType, nomRegion, codeDepartement, codePostal, titreCandidat, descriptionCandidat, urlImage, idElection) => {
      Axios.post(baseUrl+"/addElection", { titreElection: titreElection, dateDebutElection: dateDebutElection, dateFinElection: dateFinElection, descriptionElection: descriptionElection, electionType: electionType, nomRegion: nomRegion, codeDepartement: codeDepartement, codePostal: codePostal }).then((response)=>{
        if (response.data.message){
          console.log(response.data.message);
        } 
        else {
          console.log(response.data);
        }
      })
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
  
  const getElections= () => {
    Axios.post(baseUrl+"/getElections", {idCitoyen : currentUser.idCitoyen}).then((response)=>{
        if (response.data.message){
          addToast("Erreur : " + response.data.message, {
            appearance: 'error',
            autoDismiss: true,
          })
        }
        else{
          console.log(response.data);
          setElections(response.data);
        }
    })
  }
  return (
    <div className="App">
        <Router>
          {/* Header */}
          <Header onDisconnection={disconnect} isConnected={connected} />
          {/* Tout ce qu'il y a sous la page */}
          <Menu toggleMenu={toggleMenu} desactivateMenu={desactivateMenu} showMenu={showMenu}/>
          <Pages 
            connected={connected}
            idElection={idElection}
            getIdElection={getIdElection}
            addCandidat={addCandidat}
            addElection={addElection}
            getElections={getElections}
            elections={elections}
            profile={profile}
            currentUser={currentUser}
            login={login}
            loginAdmin={loginAdmin}
          />
          <Footer />
        </Router>
    </div>
  );
}

export default App;
