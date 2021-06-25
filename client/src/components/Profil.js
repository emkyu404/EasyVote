import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import '../css/App.css';
import Radium from 'radium';

const Profil = ({getProfile, currentUser}) => {
    useEffect(() => {
        getProfile();
    }, [])

    const history = useHistory();

    const contact = () => {
        history.push("./Contact");
    }
    return (
        <div>
            <h1 style={styles.mainTitle}>Profil</h1>
            <div className='profil-form' style={styles.divForm}>
                <h2 style={styles.secondTitle}>Mes informations</h2>
                <table style={styles.table}>
                    <tr>
                        <th style={styles.th}>Nom</th>
                        <td style={styles.td}>{currentUser.nomCitoyen}</td>
                    </tr>
                    <tr>
                        <th style={styles.th}>Prénom</th>
                        <td style={styles.td}>{currentUser.prenomCitoyen}</td>
                    </tr>
                    <tr>
                        <th style={styles.th}>Email</th>
                        <td style={styles.td}>{currentUser.emailCitoyen}</td>
                    </tr>
                    <tr>
                        <th style={styles.th}>Adresse</th>
                        <td style={styles.td}>{currentUser.numRue} {currentUser.rue}</td>
                    </tr>
                    <tr>
                        <th style={styles.th}>Code postal</th>
                        <td style={styles.td}>{currentUser.codePostal}</td>
                    </tr>
                    <tr>
                        <th style={styles.th}>Ville</th>
                        <td style={styles.td}>{currentUser.nomVille}</td>
                    </tr>
                    <tr>
                        <th style={styles.th}>Code département</th>
                        <td style={styles.td}>{currentUser.codeDepartement}</td>
                    </tr>
                    <tr>
                        <th style={styles.th}>Département</th>
                        <td style={styles.td}>{currentUser.nomDepartement}</td>
                    </tr>
                    <tr>
                        <th style={styles.th}>Région</th>
                        <td style={styles.td}>{currentUser.nomRegion}</td>
                    </tr>
                </table>
                <div style={styles.divContact}>
                    <h2 style={styles.thirdTitle}>Des informations sont incorrectes ?</h2>
                    <button style={styles.btn} onClick={contact}>Contactez nous</button>
                </div>
            </div>

            <hr style={styles.rounded}></hr>

            <form onSubmit={null} className='passwordForm'>
                <div style={styles.divForm}>
                <h2 style={styles.secondTitle}>Changer de mot de passe</h2>

                <label style={styles.label}>Ancien mot de passe : </label>
                <span style={styles.span}><input type="text" name="old-pass" required style={styles.input}/></span>

                <label style={styles.label}>Nouveau mot de passe : </label>
                <span style={styles.span}><input type="text" name="new-pass" required style={styles.input}/></span>

                <label style={styles.label}>Confirmation nouveau mot de passe : </label>
                <span style={styles.span}><input type="text" name="confirm-pass" required style={styles.input}/></span>

                <input type="submit" className="button" style={styles.submit} value="Envoyer"></input>
                </div>
            </form>
        </div>
    )
}

const styles = {
    table: {
        border: "1px solid #eee",
        borderCollapse: "collapse",
        width: "auto",
        marginBottom: "40px"
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
    btn: {
        backgroundColor: "#0B6BA8",
        border: "none",
        color: "white",
        padding: "15px",
        textDecoration: "none",
        cursor: "pointer",
        minWidth: "200px",
        verticalAlign: "middle"
    },
    rounded: {
        borderTop: "5px solid #0B6BA8",
        margin: "50px",
        borderRadius: "5px"
    },
    divForm: {
        backgroundColor: "white",
        padding: "40px 40px 70px 40px",
        boxShadow: "0 0 10px #999",
        margin: "20px 0px 20px 0px"
    },
    mainTitle: {
        color: "#0B6BA8",
        height: "fit-content",
        width: "100%",
        paddingBottom: "15px",
        textAlign: "center"
    },
    secondTitle:{
        margin:"0px 0px 20px 0px",
        textAlign: "center"
    },
    thirdTitle: {
        display: "inline-block",
        marginRight: "20px",
        verticalAlign: "middle"
    },
    divContact: {
        textAlign: "center"
    },
    label: {
        float: "left",
        height: "50px",
        lineHeight: "50px",
        textAlign: "center",
        verticalAlign: "middle",
        '@media (max-width: 400px)': { 
            float: "none"
        }
    },
    input: {
        border: "1px solid #E5E5E5",
        padding: "15px",
        width: "100%",
        height: "50px",
        marginBottom: "10px"
    },
    submit: {
        backgroundColor: "#0B6BA8",
        border: "none",
        color: "white",
        padding: "15px",
        textDecoration: "none",
        cursor: "pointer",
        minWidth: "200px",
        float: "right"
    },
    span: {
        display: "block",
        overflow: "hidden",
        paddingLeft: "15px",
        '@media (max-width: 400px)': { 
            paddingLeft: "0px"
        }
    }
}

export default Radium(Profil)