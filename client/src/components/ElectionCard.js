import React from 'react';
import {useState} from 'react'
import { Link }  from "react-router-dom";
import Radium from 'radium';
import DialogComponent from './DialogComponent';

const ElectionCard = ({electionCard, deleteElection, currentUser}) => {

    const [numberOfCalls, setNumberOfCalls] = useState(0)

    const handleDeleteConfirmed = () => {
        deleteElection(electionCard.idElection)
    }

    const handleDelete =  () => {
       setNumberOfCalls(numberOfCalls+1)
    }

    return (
        <div style={styles.divElection}>
            <h2>{electionCard.titreElection}</h2>
            Date de début : {electionCard.dateDebutElection} <br/>
            Date de fin : {electionCard.dateFinElection}<br/><br/>
            
            <p style={styles.text}>{electionCard.descriptionElection}</p>

            { (currentUser.idAdmin !== undefined && currentUser.idAdmin !== 0) &&
                <div>
                    <Link to={{ pathname: `/election/${electionCard.idElection}`, state: { URLIdElection: electionCard.idElection }}}>
                        <button  key={"Modifier"} style={Object.assign({},styles.btn, styles.blue)}>Modifier l'élection </button>
                    </Link>
                    <button key="Supprimer" onClick={() => {handleDelete(electionCard.idElection)}} style={Object.assign({},styles.btn, styles.blue)}>Supprimer l'élection </button>
                </div>
            }

            { (currentUser.idElecteur !== undefined && currentUser.idElecteur !== 0) &&
                <Link to={{ pathname: `/election/${electionCard.idElection}`, state: { URLIdElection: electionCard.idElection }}} >
                    <button key={"Consulter"} style={Object.assign({},styles.btn, styles.blue)}>Consulter l'élection </button>
                </Link>
            }   
            <DialogComponent
                dialogText={"Souhaitez-vous supprimer l'élection '"+electionCard.titreElection+ "' de la base de données ? Cette action est irréversible."}
                dialogTitle={"Suppression d'une élection de la base de données"}
                openOnRender={false}
                handleClickYes={handleDeleteConfirmed}
                handleClickNo={() => {}}
                handleClickBehavior={() => {}}
                yesNo={true}
                numberOfCall={numberOfCalls}
            />         
        </div>
    )
}

const styles = {
    text: {
        textAlign: "justify"
    },
    btn: {
        font: "400 13.3333px Arial",
        textAlign: "center",
        textDecoration: "none",
        minWidth: "200px",
        padding: "15px",
        border: "none",
        color: "white",
        cursor: "pointer",        
        float: "right",
        marginTop: "15px",
        ':hover':{
            backgroundColor: "#074E7B",
            transition: "0.2s"
        }
    },
    divElection: {
        padding: "30px 30px 80px 30px",
        marginBottom: "30px",
        backgroundColor: "white",
        boxShadow: "0 0 10px #555"
    },
    blue : {
        backgroundColor: "#0B6BA8"
    },
    green : {
        backgroundColor: "#009F79"
    },
    red : {
        backgroundColor: "#A63950"
    }
}


export default Radium(ElectionCard)
