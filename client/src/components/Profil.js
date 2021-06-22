import React from 'react'
import { useHistory } from 'react-router-dom'
import '../css/App.css'


const nom = 'Dupont'
const prenom = 'Robert'
const mail = 'robert.dupont@hotmail.fr'
const adresse = '20 rue des bois'
const codeP = '75001'

const Profil = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push("./Contact");
    }
    return (
        <div>
            <h1>Profil</h1>
            <div className='profil-form'>
                <div className="information">
                    <h2>Mes informations</h2>
                </div>
                <div className="block-align">
                    <div className='left-block'>
                        <p className="br">Nom : </p>
                        <p className="br">Prénom : </p>
                        <p className="br"> Email : </p>
                        <p className="br">Adresse : </p>
                        <p className="br">Code postal : </p>
                    </div>
                    <div className="right-block">
                        <p className="br1">{nom}</p>
                        <p className="br1">{prenom}</p>
                        <p className="br1">{mail}</p>
                        <p className="br1">{adresse}</p>
                        <p className="br1">{codeP}</p>
                    </div>
                </div>
            </div>

            <h3 className="h3">Changer mes informations</h3>
            <button onClick={handleClick} className="buttonProfil">Contactez nous</button>
        </div>


    )
}



export default Profil
