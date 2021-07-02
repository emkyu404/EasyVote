import React from 'react';
import { useState } from 'react';
import CandidatCard from "./CandidatCard";

const ElectionVote = ({ election, candidats, addVote, URLIdElection, participer, getParticiper, currentUser, updateElection }) => {

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

    return (
        <div>
            {(currentUser.idElecteur !== undefined && currentUser.idElecteur !== "") &&
                <div style={styles.election}>
                    <h2 style={styles.title}>{election.titreElection}</h2>
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

                    <div id="divCandidats" style={styles.container}>
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
                            <p style={styles.background}>{participer === true ? "Important ! Vous avez déjà voté." : ""}</p>
                        </div>
                    </div>
                </div>
            }

            {(currentUser.idAdmin !== undefined && currentUser.idAdmin !== "") &&
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
    container: {
        overflow: "hidden",
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "space-evenly",
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

    background: {


    },

    election: {
        marginTop: "20px",
        marginBottom: "20px",
        backgroundColor: "white",
        padding: "20px 40px 40px 40px",
        boxShadow: "0 0 10px #999",
        '@media (max-width: 640px)': {
            padding: "20px 20px 65px 20px"
        }
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
        width: "100%"
    },

    title: {
        padding: "10px",
    }

}

export default ElectionVote
