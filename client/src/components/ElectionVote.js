import React from 'react'
import { useState, useEffect } from 'react'
import CandidatCard from "./CandidatCard"
import Radium from 'radium'
import { Link } from 'react-router-dom'

const ElectionVote = ({ election, candidats, addVote, URLIdElection, participer, getParticiper, currentUser, updateElection }) => {

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
                        <button key={"Retour"} style={styles.returnBtn}>Retour </button>
                    </Link>

                    <h1 style={styles.mainTitle}>Voter pour un candidat</h1>
                    <div style={styles.divElection}>
                        <h2 style={styles.secondTitle}>{election.titreElection}</h2>

                        <table style={styles.table}>
                            <tbody>
                                <tr>
                                    <th style={styles.th}>Description : </th>
                                    <td style={styles.td}>{election.descriptionElection}</td>
                                </tr>
                                <tr>
                                    <th style={styles.th}>Date de début : </th>
                                    <td style={styles.td}>{election.dateDebutElection}</td>
                                </tr>
                                <tr>
                                    <th style={styles.th}>Date de fin : </th>
                                    <td style={styles.td}>{election.dateFinElection}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div id="divCandidats">
                            {typeof (candidats) === "undefined" || candidats.length === 0
                                ?
                                "Pas de candidats"
                                :
                                candidats.map((candidatCard) => (
                                    <div key={candidatCard.idCandidat}>
                                        <CandidatCard candidatCard={candidatCard} addVote={addVote} URLIdElection={URLIdElection} participer={participer} getParticiper={getParticiper} />
                                    </div>
                                ))
                            }
                            <div style={styles.votedStyle}>
                                <p>{participer === true ? "Vous avez déjà voté." : ""}</p>
                            </div>
                        </div>
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

                        <input type="submit" className="update-election-submit" style={styles.btn} key="btnSubmitElection" value="Modifier" />
                    </form>
                    <Link to={{ pathname: `/elections`}} >
                        <button key={"Annuler"} style={styles.btn}>Annuler </button>
                    </Link>
                </div>
            }

        </div>
    )
}

const styles = {
    returnBtn: {
        backgroundColor: "#0B6BA8",
        textAlign: "center",
        textDecoration: "none",
        minWidth: "200px",
        padding: "15px",
        border: "none",
        color: "white",
        cursor: "pointer",        
        float: "right",
        marginTop: "15px",
        position: "absolute",
        float: "left",
        marginTop: "0px",
        ':hover':{
            backgroundColor: "#074E7B",
            transition: "0.2s"
        },
        '@media (max-width: 640px)': {
            width: "calc(100% - 50px)",
            float: "none"
        }
    },
    mainTitle: {
        color: "#0B6BA8",
        width: "100%",
        padding: "0px 0px 15px 0px",
        textAlign: "center",
        '@media (max-width: 1100px)': {
            padding: "60px 0px 5px 0px",
        }
    },
    secondTitle: {
        margin: "0px 0px 20px 0px",
        textAlign: "center"
    },
    divElection: {
        marginTop: "20px",
        marginBottom: "20px",
        backgroundColor: "white",
        padding: "20px 40px 20px 40px",
        boxShadow: "0 0 10px #999",
        '@media (max-width: 640px)': {
            padding: "20px 20px 65px 20px"
        }
    },
    table: {
        border: "1px solid #eee",
        borderCollapse: "collapse",
        width: "auto",
        marginBottom: "25px",
        display: "block",
        overflow: "auto"
    },
    th: {
        border: "1px solid #eee",
        borderCollapse: "collapse",
        backgroundColor: "#fafafa",
        padding: "5px 20px 5px 20px",
        whiteSpace: "nowrap"
    },
    td: {
        border: "1px solid #eee",
        borderCollapse: "collapse",
        padding: "5px 20px 5px 20px",
        width: "100%",
        minWidth: "300px"
    },
    votedStyle: {
        width: "100%",
        padding: "10px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        color: "red",
        fontSize: "18px",
    },
    divForm: {
        backgroundColor: "white",
        padding: "40px 40px 70px 40px",
        boxShadow: "0 0 10px #999",
        margin: "20px 0px 20px 0px",
        '@media (max-width: 960px)': {
            padding: "20px 40px 150px 40px"
        },
        '@media (max-width: 640px)': {
            padding: "20px 20px 150px 20px"
        }
    },
    label: {
        float: "left",
        lineHeight: "50px",
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
        backgroundColor: "#0B6BA8",
        border: "none",
        textDecoration: "none",
        color: "white",
        width: "200px",
        padding: "15px",
        cursor: "pointer",        
        float: "right",
        margin: "15px 0px 0px 10px",
        ':hover':{
            backgroundColor: "#074E7B",
            transition: "0.2s"
        },
        '@media (max-width: 960px)': {
            width: "100%",
            margin: "15px 0px 0px 0px"
        }
    }
}

export default Radium(ElectionVote)
