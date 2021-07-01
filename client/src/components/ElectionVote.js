import React from 'react'
import CandidatCard from "./CandidatCard";

const ElectionVote = ({candidats, addVote, URLIdElection}) => {
    return (
        <div id="divCandidats" style={styles.container}>
            {typeof(candidats)==="undefined" || candidats.length===0 
            ?
            "Pas de candidats"
            :
            candidats.map((candidatCard)=> (
                <div key={candidatCard.idCandidat}>
                    <CandidatCard candidatCard={candidatCard} addVote={addVote} URLIdElection={URLIdElection}/>
                </div>
            ))}
        </div>
    )
}

const styles={
    container: {
        overflow: "hidden",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
}

export default ElectionVote
