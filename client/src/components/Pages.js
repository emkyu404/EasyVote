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

const Pages = ({connected, idElection, addCandidat, addElection, getElections, getCurrentDate, filteredElections, filterElection, profile, currentUser, login, loginAdmin, getElection, election, getCandidats, candidats}) => {
    return(
        <div className="main-container" style={styles.mainContainer}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/addElection">
                <AddElection idElection={idElection} addCandidat={addCandidat} onAddElection={addElection}/>
                {/* {connected ? <AddElection idElection={idElection} addCandidat={addCandidat} onAddElection={addElection}/> : <NotConnected />} */}
              </Route>
              <Route exact path="/elections">
                {connected ? <Elections getElections={getElections} getCurrentDate={getCurrentDate} filteredElections={filteredElections} filterElection={filterElection}/> : <NotConnected />}
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
              <Route path="/election/:idElection">
                {connected ?<Election getElection={getElection} election={election} getCandidats={getCandidats} candidats={candidats}/> : <NotConnected />}
              </Route>

              <Route exact path="/addCandidat">
                {/* <AddCandidat onAddCandidat={addCandidat} idElectionChoisi={ idElection } /> */}
              </Route>

              <Route path="*" >
                <PageNotFound />
              </Route>
            </Switch>
          </div>
    )
}

const styles = {
  mainContainer : {
    margin : '0 auto',
    marginTop : '15vh',
    maxWidth : '1200px',
    width : '80%',
    backgroundColor : '#E9F1F7',
    padding : '25px',
    minHeight : 'calc(85vh - 50px)',
    height : 'fit-content',
    '@media (max-width :640px)':{
      width : '100%'
    }
  }
}

export default Radium(Pages);