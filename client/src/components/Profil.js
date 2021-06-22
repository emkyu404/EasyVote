import React from 'react'
import { useHistory } from 'react-router-dom'
import '../css/App.css'


const nom = 'dupont'
const prenom = 'robert'
const mail = 'robert.dupont@hotmail.fr'
const adresse = '20 rue des bois'
const codeP = '75001'

const Profil = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push("./Contact");
    }
    return (
        <div className='profil'>
            <h1>Profil</h1>
            <div className='profil-form'>
                <div className="information">
                    <h2>Mes informations</h2>
                </div>
                <div className="block-align">
                    <div className='left-block'>
                        <p>Nom : </p>
                        <p>Prénom : </p>
                        <p>Email : </p>
                        <p>Adresse : </p>
                        <p>Code postal : </p>
                    </div>
                    <div className="right-block">
                        <p>{nom}</p>
                        <p>{prenom}</p>
                        <p>{mail}</p>
                        <p>{adresse}</p>
                        <p>{codeP}</p>
                    </div>
                </div>
            </div>

            <h3>Changer mes informations</h3>
            <button onClick={handleClick} className="buttonProfil">Contactez nous</button>
        </div>


    )
}



export default Profil
