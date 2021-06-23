import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom'
import '../css/App.css'

const Profil = ({onProfile, currentUser}) => {
    useEffect(() => {
            onProfile();
      }, [onProfile])

    const history = useHistory();

    const contact = () => {
        history.push("./Contact");
    }
    return (
        <div>
            <h1>Profil</h1>
            <div className='profil-form' style={styles.profilForm}>
                <div className="information" style={styles.information}>
                    <h2 style={styles.h2}>Mes informations</h2>
                </div>
                <div className="block-align" style={styles.blockAlign}>
                    <div className='left-block' style={styles.leftBlock}>
                        <p className="br" style={styles.br}>Nom : </p>
                        <p className="br" style={styles.br}>Prénom : </p>
                        <p className="br" style={styles.br}>Email : </p>
                        <p className="br" style={styles.br}>Adresse : </p>
                        <p className="br" style={styles.br}>Code postal : </p>
                    </div>
                    <div className="right-block" style={styles.rightBlock}>
                        <p className="br1" style={styles.br1}>{currentUser.nomCitoyen}</p>
                        <p className="br1" style={styles.br1}>{currentUser.prenomCitoyen}</p>
                        <p className="br1" style={styles.br1}>{currentUser.emailCitoyen}</p>
                        <p className="br1" style={styles.br1}>{currentUser.idAdresse}</p>
                        {/* <p className="br1" style={styles.br1}>{currentUser.codePostal}</p> */}
                    </div>
                </div>
            </div>

            <h3 className="h3" style={styles.h3}>Changer mes informations</h3>
            <button style={styles.contactButton} onClick={contact} className="buttonProfil">Contactez nous</button>
        </div>
    )
}

const styles = {
    contactButton: {
        marginTop: "30px",
        width: "30%",
        backgroundColor: "#0B6BA8",
        padding: "15px",
        border: "none",
        color: "white",
        cursor: "pointer",


        ':hover': {
            letterSpacing: "1px",
        }
    },

    information: {
        borderBottom: "groove",
        borderColor: "red",
        marginTop: "5px",
        justifyContent: "center",

    },

    profilForm: {
        backgroundColor: "white",
        border: "1px solid",
        borderColor: "#0B6BA8",
        padding: "30px",
        marginottom: "100px",
        paddingBottom: "30px",
        margin: "auto",
        position: "relative",
    },

    blockAlign: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridGap: "10px 2em",
        marginTop: "40px",
        position: "relative",
    },

    blockAlignfirstChild: {
        alignSelf: "center",
    },

    h2: {
        marginTop: "25px",
        textAlign: "center",
    },

    formContent: {
        display: "grid",
    },

    br: {
        paddingBottom: "20px",
        paddingRight: "100px",
    },

    br1: {
        paddingBottom: "20px",
        paddingRight: "20px",
    },

    h3: {
        marginTop: "40px",
    },
}


export default Profil
