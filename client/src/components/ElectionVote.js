import React from 'react'
import CandidatCard from "./CandidatCard";

const ElectionVote = ({candidats, addVote, URLIdElection, participer}) => {
    return (
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
