import React from 'react';
import { useState, useEffect } from 'react';
import Radium from "radium";
import { Link } from 'react-router-dom';

const ElectionWait = ({ election, currentUser, updateElection }) => {

  useEffect(() => {
    const dateHeureDebut = election.start.split(' ');
    const dateHeureFin = election.end.split(' ');
    setDateDebutElection(dateHeureDebut[0])
    setDateFinElection(dateHeureFin[0])
    setHeureDebut(dateHeureDebut[1])
    setHeureFin(dateHeureFin[1])
  },[election])

  const [titreElection, setElectionTitle] = useState(election.titreElection)
  const [dateDebutElection, setDateDebutElection] = useState("")
  const [dateFinElection, setDateFinElection] = useState("")
  const [descriptionElection, setDescriptionElection] = useState(election.descriptionElection)

  const [heureDebut, setHeureDebut] = useState("")
  const [heureFin, setHeureFin] = useState("")

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
      window.location.replace('/elections')
  }

  const elections = () => {
    window.location.replace('/elections')
  }

  return (
    <div>
      {(currentUser.idElecteur !== undefined && currentUser.idElecteur !== "") &&
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

      {(currentUser.idAdmin !== undefined && currentUser.idAdmin !== "") &&
        <div>
            <form onSubmit={handleModification}>
                <label className="update-election-label" style={styles.label}>Titre de l'élection : </label>
                <span style={styles.span}><input type="text" className="update-election-input" value={titreElection} style={styles.input} onChange={handleTitreOnChange} required /></span>

                <label className="update-election-label" style={styles.label}>Description de l'élection : </label>
                <textarea id="descriptionElection" type="text" className="update-election-input" style={styles.textArea} onChange={handleDescriptionOnChange} required value={descriptionElection}></textarea>

                <label className="update-election-label" style={styles.label}>Date de début : </label>
                <span style={styles.span}><input type="date" max="9999-12-31" className="update-election-input" value={dateDebutElection} style={styles.input} onChange={handleDateDebutOnChange} required /></span>

                <label className="add-election-label" style={styles.label}>Heure de début : </label>
                <span style={styles.span}><input type="time" className="update-election-input" value={heureDebut} style={styles.input} onChange={handleHeureDebutOnChange} required /></span>

                <label className="update-election-label" style={styles.label}>Date de fin : </label>
                <span style={styles.span}><input type="date" max="9999-12-31" className="update-election-input" value={dateFinElection} style={styles.input} onChange={handleDateFinOnChange} required /></span>

                <label className="add-election-label" style={styles.label}>Heure de fin : </label>
                <span style={styles.span}><input type="time" className="update-election-input" value={heureFin} style={styles.input} onChange={handleHeureFinOnChange} required /></span>

                <input type="submit" className="update-election-submit" style={styles.submit} key="btnSubmitElection" value="Modifier" />
            </form>

            <Link to={{ pathname: `/elections`}} >
              <button key={"Annuler"} style={Object.assign({},styles.btn, styles.blue)}>Annuler </button>
            </Link>
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
  },
  label: {
    float: "left",
    height: "50px",
    lineHeight: "50px",
    textAlign: "center",
    verticalAlign: "middle",
    '@media (max-width: 640px)': {
        float: "none",
        lineHeight: "30px",
    }
  },
  input: {
      border: "1px solid #E5E5E5",
      padding: "15px",
      width: "100%",
      height: "50px",
      marginBottom: "10px"
  },
  submit: {
      backgroundColor: "#0B6BA8",
      border: "none",
      color: "white",
      padding: "15px",
      textDecoration: "none",
      cursor: "pointer",
      width: "200px",
      float: "right",
      margin: "0px 0px 10px 10px",
      ':hover': {
          backgroundColor: "#074E7B",
          transition: "0.2s"
      },
      '@media (max-width: 960px)': {
          width: "100%",
          marginBottom: "10px"
      },
  },
  button: {
      backgroundColor: "#0B6BA8",
      border: "none",
      color: "white",
      padding: "15px",
      textDecoration: "none",
      cursor: "pointer",
      width: "200px",
      float: "right",
      ':hover': {
          backgroundColor: "#074E7B",
          transition: "0.2s"
      },
      '@media (max-width: 960px)': {
          width: "100%"
      }
  },
  span: {
      display: "block",
      overflow: "hidden",
      paddingLeft: "15px",
      '@media (max-width: 640px)': {
          paddingLeft: "0px"
      }
  },
  textArea: {
      resize: "none",
      border: "1px solid #E5E5E5",
      padding: "15px",
      width: "100%",
      height: "200px",
      marginBottom: "10px"
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
  blue : {
      backgroundColor: "#0B6BA8"
  },
}
export default Radium(ElectionWait)
