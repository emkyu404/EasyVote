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

  return (
    <div>
      {(currentUser.idElecteur !== undefined && currentUser.idElecteur !== "") &&
        <div>
          <Link to={{ pathname: `/elections`}} >
            <button key={"Retour"} style={Object.assign({}, styles.returnBtn, styles.blue)}>Retour </button>
          </Link>
          <h1 style={styles.mainTitle}>En cours de préparation</h1>
          <div style={styles.divElections}>
            <h2>{election.titreElection}</h2>
            <p style={styles.text}>{election.descriptionElection}</p><br></br>
            <p>L'élection que vous avez séléctionné n'a pas encore débuté vous pourrez y participer à partir du <strong>{election.dateDebutElection}</strong> jusqu'au <strong>{election.dateFinElection}</strong></p>
          </div>
        </div>
      }

      {(currentUser.idAdmin !== undefined && currentUser.idAdmin !== "") &&
        <div style={styles.divForm}>
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
    textAlign: "center",
    '@media (max-width: 1100px)': {
      padding: "50px 0px 15px 0px",
    }
  },
  divElections: {
    backgroundColor: "white",
    padding: "40px 40px 30px 40px",
    boxShadow: "0 0 10px #999"
  },
  divForm: {
    backgroundColor: "white",
    padding: "40px 40px 70px 40px",
    boxShadow: "0 0 10px #999",
    margin: "20px 0px 20px 0px",
    '@media (max-width: 960px)': {
        padding: "40px 40px 150px 40px"
    },
    '@media (max-width: 640px)': {
        padding: "20px 20px 150px 20px"
    }
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
    },
    '@media (max-width: 960px)': {
        width: "100%"
    },
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
    margin: "15px 0px 0px 10px",
    ':hover': {
        backgroundColor: "#074E7B",
        transition: "0.2s"
    },
    '@media (max-width: 960px)': {
        width: "100%"
    },
},
returnBtn: {
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
  },
  position: "absolute",
  float: "left",
  marginTop: "0px",
  '@media (max-width: 640px)': {
      width: "calc(100% - 50px)",
      float: "none"
  }
},
  blue : {
      backgroundColor: "#0B6BA8"
  },
}
export default Radium(ElectionWait)
