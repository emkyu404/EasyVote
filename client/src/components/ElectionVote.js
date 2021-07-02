import React from 'react';
import { useState } from 'react';
import CandidatCard from "./CandidatCard";

const ElectionVote = ({election, candidats, addVote, URLIdElection, participer, getParticiper, currentUser, updateElection}) => {

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
            { (currentUser.idElecteur !== undefined && currentUser.idElecteur !== "") &&
                <div>
                    <h2 style={styles.secondTitle}>{election.titreElection}</h2>
                    <p>Description : {election.descriptionElection}</p>
                    Date de début : {election.dateDebutElection} <br/>
                    Date de fin : {election.dateFinElection}<br/>
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

            <div id="divCandidats" style={styles.container}>
                {typeof(candidats)==="undefined" || candidats.length===0 
                ?
                "Pas de candidats"
                :
                candidats.map((candidatCard)=> (
                    <div key={candidatCard.idCandidat}>
                        <CandidatCard candidatCard={candidatCard} addVote={addVote} URLIdElection={URLIdElection} participer={participer} getParticiper={getParticiper} />
                    </div>
                ))
                }
                {participer===true ? "Vous avez déjà voté" : "" }
            </div>
        </div>
    )
}

const styles={
    container: {
        overflow: "hidden",
        display: "flex",
        flexWrap: "wrap",
        width : "100%",
        justifyContent: "space-evenly",
    },
}

export default ElectionVote
