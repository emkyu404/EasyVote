import React from 'react'
import { Link } from 'react-router-dom'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { Sling as Hamburger } from 'hamburger-react'
import Radium from 'radium'

const Menu = ({desactivateMenu, toggleMenu, showMenu, currentUser}) => {
    return(
    <ClickAwayListener onClickAway={desactivateMenu}>
            <div className={"flex-row " + (showMenu ? "shown" : "hidden")}>

              {/* Si le state showMenu vrai, affiche le menu */}
              <div id="menu-container" style = {styles.menuContainer}>
                <Link to="/" style={{ textDecoration: "none" }}><div className="menu-item" key='menu-item-1' style={styles.menuItem}>Accueil</div></Link>
                { ( (currentUser.idElecteur !== undefined && currentUser.idElecteur !== "") || (currentUser.idAdmin !== undefined && currentUser.idAdmin !== "") ) &&
                <div>
                  { (currentUser.idAdmin !== undefined && currentUser.idAdmin !== "")  &&
                    <Link to="/addElection" style={{ textDecoration: "none" }}><div className="menu-item" key='menu-item-2' style={styles.menuItem}>Ajouter une élection</div></Link>
                  }
                  <Link to="/elections" style={{ textDecoration: "none" }}><div className="menu-item" key='menu-item-3' style={styles.menuItem}>Elections</div></Link>
                  <Link to="/profil" style={{ textDecoration: "none" }}><div className="menu-item" key='menu-item-4' style={styles.menuItem}>Profil</div></Link>
                </div>
                } 
                <Link to="/contact" style={{ textDecoration: "none" }}><div className="menu-item" key='menu-item-5' style={styles.menuItem}>Contact</div></Link>
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

const styles = {
  menuContainer : {
    backgroundColor : '#DEDEDE',
    display : 'flex',
    width : '250px',
    flexDirection : 'column',
    height : '100vh'
  },

  menuItem : {
    borderRight : '3px solid',
    borderColor : '#DEDEDE',
    padding : '10px',
    ':hover' : {
      backgroundColor : '#CECECE',
      transition : '0.25s',
      borderColor : '#0b6ba8',
      cursor : 'pointer'
    },
  }

}

export default Radium(Menu);