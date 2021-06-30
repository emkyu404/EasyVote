import React from 'react';
import { Link }  from "react-router-dom";
import Radium from 'radium';

const ElectionCard = ({electionCard}) => {
    return (
        <div style={styles.divElection}>
                <h2>{electionCard.titreElection}</h2>
                Date de début : {electionCard.dateDebutElection} <br/>
                Date de fin : {electionCard.dateFinElection}<br/><br/>
                
                <p style={styles.text}>{electionCard.descriptionElection}</p>
                
                <Link to={`/election/${electionCard.idElection}`}><btn style={Object.assign({},styles.btn, styles.blue)}>Consulter l'élection </btn></Link>
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
        border: "1px solid #0B6BA8",
        padding: "30px 30px 80px 30px",
        marginBottom: "30px"
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
