import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Radium from 'radium'

import Home from './Home'
import Elections from './Elections'
import Profil from './Profil'
import Contact from './Contact'
import Login from './LoginUser'
import LoginAdmin from './LoginAdmin'
import NotConnected from './NotConnected'
import Election from './Election'
import AddElection from "./AddElection"
import PageNotFound from './PageNotFound'

const Pages = ({connected, idElection, addCandidat, addElection, getElections, getCurrentDate, filteredElections, filterElection, profile, currentUser, login, loginAdmin, getElection, election, getCandidats, candidats, getVotes, votes, addVote, getParticiper, participer}) => {
    return(
        <div className="main-container default-margin" style={styles.mainContainer}>
            <Switch>
              <Route exact path="/">
                <Home pageTitle={'Accueil'}/>
              </Route>
              <Route exact path="/addElection">
                <AddElection idElection={idElection} addCandidat={addCandidat} onAddElection={addElection} pageTitle={'Ajout d\'une élection'}/>
                {/* {connected ? <AddElection idElection={idElection} addCandidat={addCandidat} onAddElection={addElection} pageTitle={'Ajout d\'une élection'}/> : <NotConnected />} */}
              </Route>
              <Route exact path="/elections">
                {connected ? <Elections getElections={getElections} getCurrentDate={getCurrentDate} filteredElections={filteredElections} filterElection={filterElection} pageTitle={'Elections'}/> : <NotConnected />}
              </Route>
              <Route exact path="/profil">
                {connected ? <Profil getProfile={profile} currentUser={currentUser} pageTitle={'Profil'} /> : <NotConnected />}
              </Route>
              <Route exact path="/contact">
                <Contact pageTitle={'Contactez nous'}/>
              </Route>
              <Route exact path="/login">
                {connected ? <Home pageTitle={'Accueil'}/> : <Login onLogin={login} pageTitle={'Connexion'}/>}
              </Route>
              <Route exact path="/loginAdmin">
                {connected ? <Home pageTitle={'Accueil'}/> : <LoginAdmin onLogin={loginAdmin} pageTitle={'Connexion administrateur'}/>}
              </Route>
              <Route path="/election/:idElection">
                {connected ?<Election getElection={getElection} election={election} getCandidats={getCandidats} candidats={candidats} getVotes={getVotes} votes={votes} addVote={addVote} getParticiper={getParticiper} participer={participer} pageTitle={'Election'}/> : <NotConnected />}
              </Route>
              
              <Route path="*" >
                <PageNotFound pageTitle={'404 - Not Found'}/>
              </Route>
            </Switch>
          </div>
    )
}

const styles = {
  mainContainer : {
    marginTop : '10vh',
    maxWidth : '1200px',
    width : '80%',
    backgroundColor : '#E9F1F7',
    padding : '25px',
    minHeight : 'calc(90vh - 50px)',
    height : 'fit-content',
    '@media (max-width :640px)':{
      width : '100%'
    }
  }
}

export default Radium(Pages);