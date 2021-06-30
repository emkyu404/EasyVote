import "./css/App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'

import Header from './components/Header'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Pages from './components/Pages'

// import AddCandidat from './components/AddCandidat'

// URL de base, à changer lorsque l'url change
const baseUrl = "http://localhost:3001";

function App() {
  Axios.defaults.withCredentials = true

  const {addToast} = useToasts()
  const [currentUser, setCurrentUser] = useState({idAdmin: "", idCitoyen: ""})
  const [currentDate, setCurrentDate] = useState(["No date"])
  const [elections, setElections] = useState([])
  const [election, setElection] = useState({idElection : 0})
  const [idElection, setIdElection] = useState({})
  const [candidats, setCandidats] = useState([])
  const [showMenu, setShowMenu] = useState(false)
  //const [render, setRender] = useState(false)
  const [currentFilter, setCurrentFilter] = useState(""); 
  const [filteredElections, setFilteredElections] = useState([])


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

  const addElection = async (titreElection, dateDebutElection, dateFinElection, descriptionElection, electionType, nomRegion, codeDepartement, codePostal) => {
      const response = await Axios.post(baseUrl+"/addElection", { titreElection: titreElection, dateDebutElection: dateDebutElection, dateFinElection: dateFinElection, descriptionElection: descriptionElection, electionType: electionType, nomRegion: nomRegion, codeDepartement: codeDepartement, codePostal: codePostal })
      if (response.data.message){
        addToast("Erreur : " + response.data.message, {
          appearance: 'error',
          autoDismiss: true,
        })
      } 
      else {
        setIdElection(response.data[1][0].idElection);
      }
    }

  const addCandidat = async (titreCandidat, descriptionCandidat, urlImage) => {
    console.log(election.idElection)
    const response = await Axios.post(baseUrl+"/addCandidat", { titreCandidat: titreCandidat, descriptionCandidat: descriptionCandidat, urlImage: urlImage, idElection: idElection })
    if (response.data.message){
      addToast("Erreur : " + response.data.message, {
        appearance: 'error',
        autoDismiss: true,
      })
    }
    else {
      console.log(response.data);
    }
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
          <Menu toggleMenu={toggleMenu} desactivateMenu={desactivateMenu} showMenu={showMenu} connectedAdmin={currentUser.idAdmin} />
          <Pages 
            connected={connected}
            //AddElection + AddCandidat
            addCandidat={addCandidat}
            addElection={addElection}
            idElection={idElection}
            
            //Elections
            getElections={getElections}
            getCurrentDate={getCurrentDate}
            filteredElections={filteredElections} 
            filterElection={filterElection}

            //Profile
            profile={profile}
            currentUser={currentUser}

            //Login
            login={login}

            //LoginAdmin
            loginAdmin={loginAdmin}

            //Election:idElection
            getElection={getElection} 
            election={election} 
            getCandidats={getCandidats} 
            candidats={candidats}
          />
          <Footer/>
        </Router>
    </div>
  );
}

export default App
