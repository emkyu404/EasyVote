import React from 'react';
import Radium from "radium";

function ElectionWait({election}) {

  const elections = () => {
    window.location.replace('/elections')
  }

  return (
    <div>
      <h1 style={styles.mainTitle}>En cours de préparation</h1>
      <div style={styles.divElections}>
        <h2>{election.titreElection}</h2>
        <p style={styles.text}>{election.descriptionElection}</p><br></br>
        <p>L'élection que vous avez séléctionné n'a pas encore débuté vous pourrez y participer à partir du <strong>{election.dateDebutElection}</strong> jusqu'au <strong>{election.dateFinElection}</strong></p> 
        <button style={styles.btn} onClick={elections}>Retour</button>
      </div>  
    </div>
  )
}

const styles = {
  mainTitle: {
      color: "#0B6BA8",
      height: "fit-content",
      width: "100%",
      paddingBottom: "15px",
      textAlign: "center"
  },
  divElections: {
    backgroundColor: "white",
    padding: "40px 40px 30px 40px",
    boxShadow: "0 0 10px #999"
  }
}
export default Radium(ElectionWait)
