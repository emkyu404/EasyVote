import React from 'react'
import DialogComponent from './DialogComponent'

const NotConnected = () => {
    const handleClick = () => {
        window.location.replace('/login')
    }
    return (
        <div>
            <DialogComponent 
                dialogText={"Vous n'êtes pas connecté à la plateforme EasyVote, veuillez vous connecter pour pouvoir accéder à cette page"}
                dialogTitle={"Utilisateur non connecté"}
                openOnRender={true}
                handleClickBehavior = {handleClick}
                yesNo={false}
            />
        </div>
    )
}

export default NotConnected
