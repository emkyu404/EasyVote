import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Elections from './Elections'
import Profil from './Profil'
import Contact from './Contact'
import Login from './LoginUser'
import LoginAdmin from './LoginAdmin'
import NotConnected from './NotConnected'
import Election from './Election'
import AddElection from "./AddElection"

const Pages = ({connected, idElection, addCandidat, addElection, getElections, getCurrentDate, filteredElections, filterElection, profile, currentUser, login, loginAdmin, getElection, election, getCandidats, candidats}) => {
    return(
        <div className="main-container">
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
            </Switch>
          </div>
    )
}

export default Pages;