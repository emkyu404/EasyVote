import React from 'react'
import CandidatCard from "./CandidatCard";

const ElectionVote = ({election, candidats, addVote, URLIdElection, participer, currentUser}) => {

    const dateHeureDebut = election.start.split(' ');

    const dateHeureFin = election.end.split(' ');

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
                    <label className="update-election-label" style={styles.label}>Titre de l'élection : </label>
                    <input type="text" className="update-election-input" value={election.titreElection} required />

                    <label className="update-election-label" style={styles.label}>Description de l'élection : </label>
                    <input type="text" className="update-election-input" value={election.descriptionElection} required />

                    <label className="update-election-label" style={styles.label}>Date de début : </label>
                    <input type="date" className="update-election-input" value={dateHeureDebut[0]} required />

                    <label className="add-election-label" style={styles.label}>Heure de début : </label>
                    <input type="time" className="update-election-input" value={dateHeureDebut[1]} required />

                    <label className="update-election-label" style={styles.label}>Date de fin : </label>
                    <input type="date" className="update-election-input" value={dateHeureFin[0]} required />

                    <label className="add-election-label" style={styles.label}>Heure de fin : </label>
                    <input type="time" className="update-election-input" value={dateHeureFin[1]} required />
                </div>
                }

            <div id="divCandidats" style={styles.container}>
                {typeof(candidats)==="undefined" || candidats.length===0 
                ?
                "Pas de candidats"
                :
                candidats.map((candidatCard)=> (
                    <div key={candidatCard.idCandidat}>
                        <CandidatCard candidatCard={candidatCard} addVote={addVote} URLIdElection={URLIdElection} participer={participer}/>
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
