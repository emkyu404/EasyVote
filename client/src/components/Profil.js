import React, { useEffect, useState, Component } from "react";
import { useHistory } from 'react-router-dom';
import '../css/App.css';
import Radium from 'radium';

import DialogComponent from './DialogComponent'

const Profil = ({ getProfile, currentUser,changePassword, pageTitle }) => {

    useEffect(() => {
        document.title = pageTitle
    }, [pageTitle])

    useEffect(() => {
        getProfile();
    }, [])

    const [triggerDialog, setTriggerDialog] = useState(false)
    const [numberOfCalls, setNumberOfCalls] = useState(0)
    const [newPassword, setNewPassword] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const history = useHistory();

    const contact = () => {
        history.push("./Contact");
    }

    // ouvre la boite de dialogue pour confirmer le changement de mot de passe
    const handleSubmitPassword = (e) => {
        e.preventDefault()
        setNumberOfCalls(numberOfCalls + 1)
    }


    // fonction appeler à la confirmation
    const handleConfirmSubmitPassword = () => {
        changePassword(password, newPassword)
    }

    const handlePasswordChange = (e)=> {
        setPassword(e.target.value)
        submitButtonEnabledOrDisabled(e.target.value, newPassword, confirmPassword)
    }

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value)
        passwordAndConfirmPasswordMatch(e.target.value, confirmPassword)
    }

    const handleConfirmPasswordChange = (e) => {
       setConfirmPassword(e.target.value)
       passwordAndConfirmPasswordMatch(newPassword, e.target.value)
    }

    const [show, setShow] = React.useState(false);

    function submitButtonEnabledOrDisabled(pwd, newPwd, cfmPwd){
        if(cfmPwd === "" || newPwd === "" || pwd === ""){
            document.getElementById("changePasswordButton").style.cursor = "not-allowed"
            document.getElementById("changePasswordButton").disabled = true
            document.getElementById("changePasswordButton").style.backgroundColor = "#CECECE"
        }else if(cfmPwd != newPwd){
            document.getElementById("changePasswordButton").style.backgroundColor = "#CECECE"
            document.getElementById("changePasswordButton").style.cursor = "not-allowed"
            document.getElementById("changePasswordButton").disabled = true
        }else{
            document.getElementById("changePasswordButton").style.backgroundColor = "#0B6BA8"
            document.getElementById("changePasswordButton").style.cursor = "pointer"
            document.getElementById("changePasswordButton").disabled = false
        }
    }

    function passwordAndConfirmPasswordMatch(newPwd, cfmPwd){
        if(cfmPwd === "" || newPwd === ""){
            document.getElementById("newPassword").style.backgroundColor="white"
            document.getElementById("confirmPassword").style.backgroundColor="white"
            submitButtonEnabledOrDisabled(password, newPwd, cfmPwd)
            
        }else if(cfmPwd != newPwd){
            document.getElementById("newPassword").style.backgroundColor="rgba(240,128,128,0.5)"
            document.getElementById("confirmPassword").style.backgroundColor="rgba(240,128,128,0.5)"
            document.getElementById("changePasswordButton").style.backgroundColor = "#CECECE"
            submitButtonEnabledOrDisabled(password, newPwd, cfmPwd)
            
        }else{
            document.getElementById("newPassword").style.backgroundColor="rgba(152,251,152,0.5)"
            document.getElementById("confirmPassword").style.backgroundColor="rgba(152,251,152,0.5)"
            submitButtonEnabledOrDisabled(password, newPwd, cfmPwd)
        }
    }

    return (
        <div>
            <h1 style={styles.mainTitle}>Profil</h1>
            <div className='profil-form' style={styles.divProfil}>
                <h2 style={styles.secondTitle}>Mes informations</h2>
                <table style={styles.table}>
                    <tbody>
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
                    </tbody>
                </table>
                <div style={styles.divContact}>
                    <p>Des informations sont incorrectes ?</p>
                    <button style={styles.btn} onClick={contact}>Contactez nous</button>
                </div>
            </div>

            <hr style={styles.rounded}></hr>

            <button style={styles.btn} onClick={() => setShow(!show)}>Changer de mot de passe</button>

            {show ?
                <form onSubmit={handleSubmitPassword} className='passwordForm' id="myForm">
                    <div style={styles.divForm}>
                        <h2 style={styles.secondTitle}>Changer de mot de passe</h2>

                        <label style={styles.label}>Ancien mot de passe : </label>
                        <span style={styles.span}><input id="password" type="password" name="old-pass" required style={styles.input} onChange={handlePasswordChange} /></span>

                        <label style={styles.label}>Nouveau mot de passe : </label>
                        <span style={styles.span}><input id="newPassword" type="password" name="new-pass" required style={styles.input} onChange={handleNewPasswordChange} /></span>

                        <label style={styles.label}>Confirmation nouveau mot de passe : </label>
                        <span style={styles.span}><input id="confirmPassword" type="password" name="confirm-pass" required style={styles.input} onChange={handleConfirmPasswordChange}/></span>

                        <input id="changePasswordButton" type="submit" className="button" style={styles.submit} value="Envoyer"></input>
                    </div>
                </form>
                : null
            }

            <DialogComponent
                dialogText={"Êtes-vous sûr de vouloir changer votre mot de passe ?"}
                dialogTitle={"Changement de mot de passe ?"}
                openOnRender={false}
                handleClickYes={handleConfirmSubmitPassword}
                handleClickNo={() => {}}
                handleClickBehavior={() => {}}
                yesNo={true}
                numberOfCall={numberOfCalls}
            />
        </div>
    )
}

const styles = {
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
        width: "100%"
    },
    btn: {
        backgroundColor: "#0B6BA8",
        border: "none",
        color: "white",
        padding: "15px",
        textDecoration: "none",
        cursor: "pointer",
        width: "200px",
        verticalAlign: "middle",
        marginTop: "15px",
        '@media (max-width: 640px)': {
            width: "100%"
        },
        marginBottom: "10px",
    },
    rounded: {
        borderTop: "5px solid #0B6BA8",
        margin: "50px",
        borderRadius: "5px",
        '@media (max-width: 640px)': {
            margin: "30px 50px 30px 50px"
        }
    },
    divProfil: {
        backgroundColor: "white",
        padding: "20px 40px 30px 40px",
        boxShadow: "0 0 10px #999",
        '@media (max-width: 640px)': {
            padding: "20px 20px 20px 20px"
        }
    },
    divForm: {
        backgroundColor: "white",
        padding: "20px 40px 75px 40px",
        boxShadow: "0 0 10px #999",
        '@media (max-width: 640px)': {
            padding: "20px 20px 65px 20px"
        }
    },
    mainTitle: {
        color: "#0B6BA8",
        height: "fit-content",
        width: "100%",
        paddingBottom: "15px",
        textAlign: "center"
    },
    secondTitle: {
        margin: "0px 0px 20px 0px",
        textAlign: "center"
    },
    thirdTitle: {
        display: "inline-block",
        marginRight: "20px",
        verticalAlign: "middle",
        marginTop: "15px"
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
        '@media (max-width: 920px)': {
            float: "none",
            lineHeight: "30px"
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
        backgroundColor: "#CECECE",
        cursor: "not-allowed",
        border: "none",
        color: "white",
        padding: "15px",
        textDecoration: "none",
        width: "200px",
        float: "right",
        '@media (max-width: 640px)': {
            width: "100%"
        },
        ':disabled':{
            backgroundColor : "#CECECE",
            cursor: "not-allowed"
        }
    },
    span: {
        display: "block",
        overflow: "hidden",
        paddingLeft: "15px",
        '@media (max-width: 920px)': {
            paddingLeft: "0px"
        }
    }
}

export default Radium(Profil)