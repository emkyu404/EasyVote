import React from 'react'
import { useState } from 'react'
import DialogComponent from './DialogComponent'
import Radium from 'radium'
import NotFound from '../img/default.png'

const CandidatCard = ({ candidatCard, addVote, URLIdElection, participer, getParticiper, currentUser }) => {
    const [numberOfCalls, setNumberOfCalls] = useState(0)
    function prepareVote() {
        setNumberOfCalls(numberOfCalls + 1)
    }

    return (
        <div style={styles.card}>
            <div style={styles.imgDiv}>
            <table style={styles.table}>
                <tbody>
                    <tr>
                        <td><img style={styles.img} src={candidatCard.urlImage} alt={"Image " + candidatCard.titreCandidat} onError={(e) => { e.target.onerror = null; e.target.src =NotFound}} /></td>
                    </tr>
                    {(currentUser.idElecteur !== undefined && currentUser.idElecteur !== "") &&
                        <tr>
                            <td>{participer === false ? <button style={styles.btn} onClick={() => { prepareVote() }} className="voterCandidat">Voter</button> : ""}</td>
                        </tr>
                    }
                </tbody>
            </table>
            </div>
            <div style={styles.textDiv}>
                <h2 style={styles.secondTitle}>{candidatCard.titreCandidat}</h2>
                <p style={styles.description}>{candidatCard.descriptionCandidat}</p>
            </div>
            <DialogComponent
                dialogText={"Le vote est irréversible. Vous avez encore la possibilité de consulter la liste des candidats"}
                dialogTitle={"Confirmation de votre vote pour " + candidatCard.titreCandidat}
                openOnRender={false}
                handleClickYes={async () => { await addVote(URLIdElection, candidatCard.idCandidat); await getParticiper(URLIdElection) }}
                handleClickNo={() => { }}
                handleClickBehavior={() => { }}
                yesNo={true}
                numberOfCall={numberOfCalls}
            />
        </div>
    )
}

const styles = {
    card: {
        overflow: "hidden",
        height: "250px",
        margin: "0px 10px 30px 10px",
        width: "calc(50% - 20px)",
        float: "left",
        boxShadow: "0 0 5px #555",
        background: "linear-gradient(#f8f8f8, #FFF5EE)",
        borderRadius: "5px",
        '@media (max-width: 1100px)': {
            width: "100%",
            height: "300px",
            margin: "0px 0px 30px 0px",
        }
    },
    table: {
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
    },
    img: {
        width: "125px",
        height: "150px",
        margin: "0px 5px 0px 5px",
        borderRadius: "5px",
        backgroundColor: "white",
        objectFit: "cover",
        '@media (max-width: 1100px)': {
            width: "150px",
            height: "180px"
        }
    },
    secondTitle: {
        textAlign: "center",
        marginBottom: "10px"
    },
    imgDiv: {
        float: "left",
        height: "100%",
        backgroundColor: "#6da6cb",
        margin: "0px 15px 0px 0px",
    },
    textDiv: {
        padding: "0px 15px 0px 0px",
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
        width: "calc(100% - 140px)",
        marginLeft: "140px"
    },
    description: {
        overflow: "auto",
        maxHeight: "150px",
        '@media (max-width: 1100px)': {
            maxHeight: "200px",
        }
    },
    btn: {
        backgroundColor: "#0B6BA8",
        border: "none",
        color: "white",
        padding: "15px",
        textDecoration: "none",
        cursor: "pointer",
        width: "80%",
        margin: "0px 10% 0px 10%",
        ':hover': {
            backgroundColor: "#074E7B",
            transition: "0.2s"
        },
    }
}

export default Radium(CandidatCard)
