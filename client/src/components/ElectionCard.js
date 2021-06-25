import React from 'react';
import Radium from 'radium';

const ElectionCard = ({electionCard}) => {
    return (
        <div>
            <div style={styles.divElection}>
                <h2>{electionCard.idElection}</h2>
                <p style={styles.text}>{electionCard.titreElection}</p>
                Date début : {electionCard.dateDebutElection} Date fin : {electionCard.dateFinElection}<br></br><br></br>
                {electionCard.descriptionElection}
                <button style={Object.assign({},styles.btn, styles.blue)}>Répondre à l'élection</button>
            </div>
        </div>
    )
}

const styles = {
    text: {
        textAlign: "justify"
    },
    btn: {
        minWidth: "200px",
        padding: "15px",
        border: "none",
        color: "white",
        cursor: "pointer",        
        float: "right",
        marginTop: "15px"
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


export default ElectionCard
