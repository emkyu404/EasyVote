import React from 'react'
import { Link } from 'react-router-dom'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { Sling as Hamburger } from 'hamburger-react'

const Menu = ({desactivateMenu, toggleMenu, showMenu, connectedAdmin}) => {
    return(
    <ClickAwayListener onClickAway={desactivateMenu}>
            <div className={"flex-row " + (showMenu ? "shown" : "hidden")}>

              {/* Si le state showMenu vrai, affiche le menu */}
              <div className="menu-container ">
                <Link to="/" style={{ textDecoration: "none" }}><div className="menu-item">Accueil</div></Link>
                { (connectedAdmin !== "") &&
                  <Link to="/addElection" style={{ textDecoration: "none" }}><div className="menu-item">Ajouter une élection</div></Link>
                } 
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
    )
}

export default Menu;