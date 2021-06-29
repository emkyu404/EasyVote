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
import Test from './Test'
import AddElection from "./AddElection"

const Pages = ({connected, idElection, getIdElection,addCandidat,addElection,getElections,elections,profile,currentUser,login, loginAdmin}) => {
    return(
        <div className="main-container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/addElection">
                {connected ? <AddElection idElection={idElection} getIdElection={getIdElection} onAddCandidat={addCandidat} onAddElection={addElection} /> : <NotConnected />}
              </Route>
              <Route exact path="/elections">
                {connected ? <Elections getElections={getElections} elections={elections}/> : <NotConnected />}
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
              <Route exact path="/election">
                <Election></Election>
              </Route>

              <Route exact path="/addCandidat">
                {/* <AddCandidat onAddCandidat={addCandidat} idElectionChoisi={ idElection } /> */}
              </Route>
              <Route exact path="/test">
                <Test />
              </Route>
            </Switch>
          </div>
    )
}

export default Pages;