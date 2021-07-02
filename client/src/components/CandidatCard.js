import React from 'react'
import { useState } from 'react'
import DialogComponent from './DialogComponent'
const CandidatCard = ({ candidatCard, addVote, URLIdElection, participer, getParticiper }) => {
    const [numberOfCalls, setNumberOfCalls] = useState(0)
    function prepareVote(){
        setNumberOfCalls(numberOfCalls + 1)
    }
    return (
        <div style={styles.card} className="card">
            <div className="information">
                <h4 style={styles.name}>{candidatCard.titreCandidat}</h4>
                <div style={styles.picture}>
                    <img style={styles.img} src={candidatCard.urlImage} alt={"Image "+candidatCard.titreCandidat} />
                </div>
            </div>
            <div style={styles.general}>
                <h2>Description</h2><br></br>
                <p>{candidatCard.descriptionCandidat}</p>
                {participer===false ? <button style={styles.voterCandidat} onClick={() => {prepareVote()}} className="voterCandidat">Voter</button> : ""}
            </div>

            <DialogComponent
                dialogText={"Le vote est irréversible. Vous avez encore la possibilité de consulter la liste des candidats"}
                dialogTitle={"Confirmation de votre vote pour " +candidatCard.titreCandidatb}
                openOnRender={false}
                handleClickYes={async () => { await addVote(URLIdElection, candidatCard.idCandidat); await getParticiper(URLIdElection)}}
                handleClickNo={() => {}}
                handleClickBehavior={() => {}}
                yesNo={true}
                numberOfCall={numberOfCalls}
            />
        </div>
    )
}

const styles = {
    card: {
        width: "450px",
        height: "250px",
        background: "linear-gradient(#f8f8f8, #FFF5EE)",
        boxShadow: "0 8px 16px -8px rgba(0,0,0,0.4)",
        borderRadius: "6px",
        overflow: "hidden",
        position: "relative",
        margin: "40px",
    },

    picture: {
        display: "inline-block",
        height: "130px",
        width: "130px",
        marginLeft: "10px",
        zIndex: "1",
        position: "relative",
    },

    img: {
        width: "100%",
        borderRadius: "50%",
        transform: "scale(1)",
        position: "absolute",
    },


    slogan: {
        display: "block",
        fontSize: "15px",
        color: "#4e5052",
        textTransform: "capitalize",
        margin: "10px",
    },

    name: {
        margin: "10px",
        maxWidth: "130px",
    },

    voterCandidat: {
        backgroundColor: "#0B6BA8",
        border: "none",
        color: "white",
        cursor: "pointer",
        position: "absolute",
        bottom: "1rem",
        right: "1rem",
        fontSize: "0.9em",
        width: "100px",
    },

    general: {
        width: "300px",
        height: "100%",
        position: "absolute",
        top: "0",
        right: "0",
        zIndex: "1",
        boxSizing: "border-box",
        padding: "1rem",
    },
}

export default CandidatCard
