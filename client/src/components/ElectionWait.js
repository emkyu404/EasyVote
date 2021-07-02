import React from 'react';
import { useState } from 'react';
import Radium from "radium";

const ElectionWait = ({election, currentUser, updateElection}) => {

  const dateHeureDebut = election.start.split(' ');
  const dateHeureFin = election.end.split(' ');

  const [titreElection, setElectionTitle] = useState(election.titreElection)

  const [dateDebutElection, setDateDebutElection] = useState(dateHeureDebut[0])
  const [dateFinElection, setDateFinElection] = useState(dateHeureFin[0])

  const [descriptionElection, setDescriptionElection] = useState(election.descriptionElection)

  const [heureDebut, setHeureDebut] = useState(dateHeureDebut[1])
  const [heureFin, setHeureFin] = useState(dateHeureFin[1])

  const handleTitreOnChange = (e) => {
      setElectionTitle(e.target.value)
  }
  const handleDateDebutOnChange = (e) => {
      setDateDebutElection(e.target.value)
  }
  const handleDateFinOnChange = (e) => {
      setDateFinElection(e.target.value)
  }
  const handleHeureDebutOnChange = (e) => {
      setHeureDebut(e.target.value)
  }
  const handleHeureFinOnChange = (e) => {
      setHeureFin(e.target.value)
  }
  const handleDescriptionOnChange = (e) => {
      setDescriptionElection(e.target.value)
  }

  const handleModification = async (e) => {
      e.preventDefault()
      await updateElection(election.idElection, titreElection, (dateDebutElection + " " + heureDebut), (dateFinElection + " " + heureFin), descriptionElection)
  }

  const elections = () => {
    window.location.replace('/elections')
  }

  return (
    <div>
      { (currentUser.idElecteur !== undefined && currentUser.idElecteur !== "") &&
        <div>
          <h1 style={styles.mainTitle}>En cours de préparation</h1>
          <div style={styles.divElections}>
            <h2>{election.titreElection}</h2>
            <p style={styles.text}>{election.descriptionElection}</p><br></br>
            <p>L'élection que vous avez séléctionné n'a pas encore débuté vous pourrez y participer à partir du <strong>{election.dateDebutElection}</strong> jusqu'au <strong>{election.dateFinElection}</strong></p> 
            <button style={styles.btn} onClick={elections}>Retour</button>
          </div>  
        </div>  
      }

      { (currentUser.idAdmin !== undefined && currentUser.idAdmin !== "") &&
        <div>
            <form onSubmit={handleModification}>
                <label className="update-election-label" style={styles.label}>Titre de l'élection : </label>
                <input type="text" className="update-election-input" value={titreElection} onChange={handleTitreOnChange} required />

                <label className="update-election-label" style={styles.label}>Description de l'élection : </label>
                <input type="text" className="update-election-input" value={descriptionElection} onChange={handleDescriptionOnChange} required />

                <label className="update-election-label" style={styles.label}>Date de début : </label>
                <input type="date" max="9999-12-31" className="update-election-input" value={dateDebutElection} onChange={handleDateDebutOnChange} required />

                <label className="add-election-label" style={styles.label}>Heure de début : </label>
                <input type="time" className="update-election-input" value={heureDebut} onChange={handleHeureDebutOnChange} required />

                <label className="update-election-label" style={styles.label}>Date de fin : </label>
                <input type="date" max="9999-12-31" className="update-election-input" value={dateFinElection} onChange={handleDateFinOnChange} required />

                <label className="add-election-label" style={styles.label}>Heure de fin : </label>
                <input type="time" className="update-election-input" value={heureFin} onChange={handleHeureFinOnChange} required />

                <input type="submit" className="update-election-submit" style={styles.submit} key="btnSubmitElection" value="Modifier" />
            </form>
        </div>
      }
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
