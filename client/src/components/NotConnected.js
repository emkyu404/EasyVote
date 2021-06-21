import React from 'react'

const NotConnected = () => {
    return (
        <div>
            <h1> Vous n'êtes pas connecté, veuillez vous connecter pour pouvoir utiliser la plateforme EasyVote </h1>
            <a href="/login"><p> Se connecter </p></a>
        </div>
    )
}

export default NotConnected
