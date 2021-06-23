import React from 'react'
import {Link} from "react-router-dom";

const NotConnected = () => {
    return (
        <div>
            <h1> Vous n'êtes pas connecté, veuillez vous connecter pour pouvoir utiliser la plateforme EasyVote </h1>
            <Link to="/login"><p> Se connecter </p></Link>
        </div>
    )
}

export default NotConnected
