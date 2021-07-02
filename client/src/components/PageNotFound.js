import React from 'react'
import Radium from 'radium'
import { useEffect } from 'react'

const PageNotFound = ({pageTitle}) => {
    useEffect(() => {
        document.title = pageTitle
    }, [pageTitle])
    
    return (
        <div>
            <div>
            <h1 style={styles.title}>Oups !</h1>
            <img src="" alt="Not found"></img>
            </div>
            <p>La page que vous tenter d'afficher n'existe pas ou une erreur s'est produite.</p>
            <br></br>
            <a href="/"><p style={styles.returnMenu}>Revenir à la page d'accueil</p></a>
        </div>
    )

    
}

const styles = {
    title : {
        fontWeight:"bold",
        fontSize:"60px"
    },

    returnMenu : {
        fontSize:"10px"
    }
}

export default Radium(PageNotFound)
