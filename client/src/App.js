import "./css/App.css";
import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { useToasts } from 'react-toast-notifications'

import Header from './components/Header'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Pages from './components/Pages'

// URL de base, à changer lorsque l'url change
const baseUrl = "http://localhost:3001";


function App() {
  Axios.defaults.withCredentials = true
  // const bcrypt = require('bcryptjs');

  const {addToast} = useToasts()
  const [currentUser, setCurrentUser] = useState({idAdmin: 0, idCitoyen: 0, nomCitoyen : "", idElecteur : 0, premiereConnexion: 0})
  const [currentDate, setCurrentDate] = useState(["No date"])
  const [elections, setElections] = useState([])
  const [election, setElection] = useState({idElection : 0})
  const [idElection, setIdElection] = useState({})
  const [candidats, setCandidats] = useState([])
  const [votes, setVotes] = useState([])
  const [participer, setParticiper] = useState([])

  const [showMenu, setShowMenu] = useState(false)
  const [currentFilter, setCurrentFilter] = useState(""); 
  const [filteredElections, setFilteredElections] = useState([])

  /* state appeler dans handleConnected, fonction elle-même appelé à la connexion et à la déconnexion */
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    token();
  },[])

  useEffect(() => {
    handleConnected()
  }, [currentUser.idAdmin, currentUser.idCitoyen])

  useEffect(() => {
    var aFilteredelections
    switch (currentFilter){
      case "Ongoing" : 
        aFilteredelections = elections.filter(election => election.start < currentDate && election.end > currentDate)
        break;
      case "Soon" : 
        aFilteredelections = elections.filter(election => election.start > currentDate)
        break;
      case "Finished" : 
        aFilteredelections = elections.filter(election => election.end < currentDate)
        break;
      default : 
        aFilteredelections = elections.filter(election => election.start < currentDate && election.end > currentDate)
        break;
    }
    setFilteredElections(aFilteredelections)
  }, [currentFilter])

  /**
   * Vérifie si l'idCitoyen est vide ou non, en conséquence modifie la state connected à true ou false
   */
  const handleConnected = useCallback(() => {
    if (currentUser.idCitoyen === 0 && currentUser.idAdmin === 0) {
      setConnected(false)
      
    } else {
      setConnected(true)
      let connectedText="";
      if (currentUser.idAdmin){
        connectedText = "administrateur " + currentUser.idAdmin
      }
      else{
        connectedText = currentUser.nomCitoyen;
      }
    }
  })

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
    response.data.message ? setCurrentUser({idAdmin: 0, idCitoyen: 0, nomCitoyen : "", idElecteur : 0}) : setCurrentUser(response.data); 
  }

  const login = async (email, password) => {
    // password = await hashPassword(password, 10)
    const response = await Axios.post(baseUrl+"/login", { email: email, password: password })
    if (response.data.message) {
      addToast("Erreur : " + response.data.message, {
        appearance: 'error',
        autoDismiss: true,
      })
    } 
    else {
      setCurrentUser(response.data)
      let connectedText=response.data.nomCitoyen;
      addToast("Bonjour " + connectedText, {
        appearance: 'success',
        autoDismiss: true,
      })
      if(response.data.premiereConnexion === 1){
        window.location.replace('/bienvenue')
      }else{
        window.location.replace('/')
      }
    }
  };

  // async function hashPassword (myPlaintextPassword, saltRounds){
  //   return await bcrypt.hash(myPlaintextPassword, saltRounds)
  // } 

  const changePassword = async(password, newPassword) => {
    //vérification du mot de passe
    console.log(password, currentUser.idCitoyen)
    const response = await Axios.post(baseUrl+"/verifyPassword", { password: password, userId: currentUser.idCitoyen })
      if(response.data.success === false){
        addToast("Erreur : " + response.data.message, {
          appearance: 'error',
          autoDismiss: true,
        })
      }else{
        // Si aucune erreur, changement du mot de passe
        const response2 = await Axios.post(baseUrl+"/changePassword", { newPassword: newPassword, userId: currentUser.idCitoyen })
        if(response2.data.success === false){
          addToast("Erreur : " + response2.data.message, {
            appearance: 'error',
            autoDismiss: true,
          })
        }else{
          addToast("Mot de passe modifié avec succès", {
            appearance : 'success',
            autoDismiss: true,
          })
          window.location.replace("/profile")
        }
      }   
  }

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
      let connectedText="";
      connectedText = "administrateur " + response.data.idAdmin
      addToast("Bonjour " + connectedText, {
        appearance: 'success',
        autoDismiss: true,
      })
    }
  };

  const disconnect = async () => {
    const response = await Axios.get(baseUrl+"/disconnect")
    if (response.data.message) {
      setCurrentUser({ idAdmin: 0, idCitoyen: 0, nomCitoyen : "", idElecteur : 0 });
      addToast("Déconnexion réussi, au revoir !", {
        appearance: 'success',
        autoDismiss: true,
      })
    } 
    else {
      addToast("La déconnexion à échouer", {
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
        addToast("Élection : " + response.data[1][0].titreElection +" ajoutée", {
          appearance: 'success',
          autoDismiss: true,
        })
      }
    }

  const addCandidat = async (titreCandidat, descriptionCandidat, urlImage) => {
    const response = await Axios.post(baseUrl+"/addCandidat", { titreCandidat: titreCandidat, descriptionCandidat: descriptionCandidat, urlImage: urlImage, idElection: idElection })
    if (response.data.message){
      addToast("Erreur : " + response.data.message, {
        appearance: 'error',
        autoDismiss: true,
      })
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
      setCurrentDate(response.data)
    }
  }

  const getElections = async () => {
    let response=""
    if (currentUser.idAdmin!==0){
      response = await Axios.post(baseUrl+"/getElections", {idAdmin : currentUser.idAdmin})
    }
    else{
      response = await Axios.post(baseUrl+"/getElections", {idCitoyen : currentUser.idCitoyen})
    }
    
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

  const getElection = async (URLIdElection) => {
    const response = await Axios.post(baseUrl+"/getElection", {idElection : URLIdElection})
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

  const getCandidats = async (URLIdElection) => {
    const response = await Axios.post(baseUrl+"/getCandidats", {idElection : URLIdElection})
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

  const getVotes = async (URLIdElection) => {
    const response = await Axios.post(baseUrl+"/getVotes", {idElection : URLIdElection})
    if (response.data.message){
      addToast("Erreur : " + response.data.message, {
        appearance: 'error',
        autoDismiss: true,
      })
    }
    else{
      var result = Object.keys(response.data).map((key) => [response.data[key].titreCandidat+"("+response.data[key].votes+")", response.data[key].votes]);
      result.unshift(['titreElection', 'votes'])
      setVotes(result);
    }
  }

  const addVote = async (URLIdElection, idCandidat) => {
    const response = await Axios.post(baseUrl+"/addVote", {idAdmin : currentUser.idAdmin, idCitoyen : currentUser.idCitoyen, idElection : URLIdElection, idCandidat : idCandidat, idElecteur : currentUser.idElecteur})
    if (response.data.message){
      addToast("Erreur : " + response.data.message, {
        appearance: 'error',
        autoDismiss: true,
      })
    }
    else if (response.data.success){
      addToast(response.data.success, {
        appearance: 'success',
        autoDismiss: true,
      })
    }
  }

  const getParticiper = async (URLIdElection) => {
    const response = await Axios.post(baseUrl+"/getParticiper", {idElection : URLIdElection, idElecteur : currentUser.idElecteur})
    if (response.data.message){
      addToast("Erreur : " + response.data.message, {
        appearance: 'error',
        autoDismiss: true,
      })
    }
    else{
      setParticiper(response.data);
    }
  }

  const updateElection = async (idElection, titreElection, dateDebutElection, dateFinElection, descriptionElection) => {
    const response = await Axios.put(baseUrl+"/election/"+idElection, {titreElection: titreElection, dateDebutElection: dateDebutElection, dateFinElection: dateFinElection, descriptionElection: descriptionElection})
    if (response.data.success === true){
      addToast(response.data.message, {
        appearance: 'success',
        autoDismiss: true,
      })
    }
    else {
      addToast("Erreur : La modification a échouée" , {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  const deleteElection = async (idElection) => {
    const response = await Axios.delete(baseUrl+"/election/"+idElection)
    if (response.data.message){
      addToast("Erreur : " + response.data.message, {
        appearance: 'error',
        autoDismiss: true,
      })
    }
    else{
      const newElections = elections.filter((election) => election.idElection !== idElection);
      const newFilteredElections = filteredElections.filter((filteredElection) => filteredElection.idElection !== idElection);
      setElections(newElections)
      setFilteredElections(newFilteredElections)
    }
  }

  const updateFirstConnexion = async (idElecteur) => {
    const response = await Axios.post(baseUrl+"/updateFirstConnexion", {idElecteur : idElecteur})
    if(response.data.success === false){
      addToast("Erreur : " + response.data.message, {
        appearance: 'error',
        autoDismiss: true,
      })
    }else{
      console.log("Première connexion prise en compte")
    }
  }

  const updatePasswordFirstConnexion = async (idElecteur, newPassword) => {
    const response = await Axios.post(baseUrl+"/changePassword", {userId: idElecteur, newPassword: newPassword})
    if(response.data.success === false){
      addToast("Erreur : " + response.data.message, {
        appearance: 'error',
        autoDismiss: true,
      })
    }else{
      addToast("Mot de passe modifié avec succès", {
        appearance : 'success',
        autoDismiss: true,
      })
      window.location.replace('/')
    }
  }

  return (
    <div className="App">
        <Router>
          {/* Header */}
          <Header onDisconnection={disconnect} isConnected={connected} />
          {/* Tout ce qu'il y a sous la page */}
          <Menu toggleMenu={toggleMenu} desactivateMenu={desactivateMenu} showMenu={showMenu} currentUser={currentUser} />
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
            currentUser={currentUser}

            //Profile
            profile={profile}
            currentUser={currentUser}
            changePassword={changePassword}

            //Login
            login={login}

            //LoginAdmin
            loginAdmin={loginAdmin}

            //Election:idElection
            getElection={getElection} 
            election={election} 
            getCandidats={getCandidats} 
            candidats={candidats}
            getVotes={getVotes}
            votes={votes}
            deleteElection={deleteElection}
            addVote={addVote}
            getParticiper={getParticiper}
            participer={participer}
            updateElection={updateElection}

            //FirstConnexion
            updateFirstConnexion={updateFirstConnexion}
            updatePasswordFirstConnexion={updatePasswordFirstConnexion}
          />
          <Footer/>
        </Router>
    </div>
  );
}

export default App
