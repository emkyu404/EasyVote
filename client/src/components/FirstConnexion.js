import Radium from 'radium'
import React from 'react'
import { useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications'

const FirstConnexion = ({pageTitle, currentUser, updateFirstConnexion, updatePasswordFirstConnexion}) => {
    const {addToast} = useToasts()
    useEffect(() => {
        document.title = pageTitle
        updateFirstConnexion(currentUser.idCitoyen)
    }, [pageTitle])// eslint-disable-line react-hooks/exhaustive-deps

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(newPassword === confirmPassword){
            updatePasswordFirstConnexion(currentUser.idCitoyen, newPassword)
        }else{
            addToast("Les mots de passes ne correspondent pas", {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    }

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value)
        passwordAndConfirmPasswordMatch(e.target.value, confirmPassword)
    }

    const handleConfirmPasswordChange = (e) => {
       setConfirmPassword(e.target.value)
       passwordAndConfirmPasswordMatch(newPassword, e.target.value)
    }

    function passwordAndConfirmPasswordMatch(newPwd, cfmPwd){
        if(cfmPwd === "" || newPwd === ""){
            document.getElementById("newPassword").style.backgroundColor="white"
            document.getElementById("confirmPassword").style.backgroundColor="white"
            submitButtonEnabledOrDisabled(newPwd, cfmPwd)
            
        }else if(cfmPwd !== newPwd){
            document.getElementById("newPassword").style.backgroundColor="rgba(240,128,128,0.5)"
            document.getElementById("confirmPassword").style.backgroundColor="rgba(240,128,128,0.5)"
            document.getElementById("changePasswordButton").style.backgroundColor = "#CECECE"
            submitButtonEnabledOrDisabled(newPwd, cfmPwd)
            
        }else{
            document.getElementById("newPassword").style.backgroundColor="rgba(152,251,152,0.5)"
            document.getElementById("confirmPassword").style.backgroundColor="rgba(152,251,152,0.5)"
            submitButtonEnabledOrDisabled(newPwd, cfmPwd)
        }
    }

    function submitButtonEnabledOrDisabled(newPwd, cfmPwd){
        if(cfmPwd === "" || newPwd === ""){
            document.getElementById("changePasswordButton").style.cursor = "not-allowed"
            document.getElementById("changePasswordButton").disabled = true
            document.getElementById("changePasswordButton").style.backgroundColor = "#CECECE"
        }else if(cfmPwd !== newPwd){
            document.getElementById("changePasswordButton").style.backgroundColor = "#CECECE"
            document.getElementById("changePasswordButton").style.cursor = "not-allowed"
            document.getElementById("changePasswordButton").disabled = true
        }else{
            document.getElementById("changePasswordButton").style.backgroundColor = "#0B6BA8"
            document.getElementById("changePasswordButton").style.cursor = "pointer"
            document.getElementById("changePasswordButton").disabled = false
        }
    }

    return (
        <div>
            <h1 className="welcome-title" style={styles.welcomeTitle}>Bienvenue citoyen {currentUser.nomCitoyen} </h1>
            <p className="welcome-title" style={styles.welcomeText}>Il s'agit de votre première connexion sur la plateforme EasyVote. </p>
            <br></br>
            <p className="welcome-title" style={styles.welcomeText}>Vous avez la possibilité de changer le mot de passe attribué par défaut à votre compte.</p>
            <br></br>
            <p className="welcome-title" style={styles.welcomeText}>Vous pouvez également le changer ultérieurement en allant à la section "Vos informations"</p>
            <br></br>
            <form onSubmit={handleSubmit} style={styles.formStyle}>
                <input className="welcome-input" type="password" id="newPassword"  placeholder="Nouveau mot de passe" style={styles.welcomeInput} onChange={handleNewPasswordChange} required />
                <input className="welcome-input" type="password" id="confirmPassword"  placeholder="Confirmer le mot de passe" style={styles.welcomeInput} onChange={handleConfirmPasswordChange} required />
                <input type="submit" id="changePasswordButton" className="welcome-button" value="Envoyer" style={styles.welcomeSubmit} disabled />
            </form>
            <a href="/"><p style={styles.welcomeCancel} key="welcomeCancelLink"> Je ne souhaite pas changer de mot de passe </p></a>
        </div>
    )
}

const styles = {
    formStyle: {
        display: "flex",
        flexDirection: "column",
        width: "60%",
        margin: "auto"
    },

    welcomeTitle: {
        fontSize: "20px",
        textAlign: "center",
        marginBottom: "20px"
    },

    welcomeText: {
        width : "60%",
        fontSize: "20px",
        textAlign: "justify",
        margin : "auto"
    },
    welcomeCancel: {
        width : "60%",
        fontSize: "10px",
        textAlign: "justify",
        margin : "auto",
        textDecoration : "underline",
        ":hover" : {
            cursor : "pointer"
        }
    },

    welcomeInput: {
        padding: "5px",
        marginTop: "5px"
    },

    welcomeSubmit: {
        padding: "15px",
        marginTop: "20px",
        backgroundColor: "#CECECE",
        border: "none",
        color: "white",
        cursor: "pointer",
        ':hover': {
            backgroundColor: "#074E7B",
            transition: "0.2s"
        }
    },

    welcomeLabel: {
        float: "left",
        height: "50px",
        lineHeight: "50px",
        textAlign: "center",
        verticalAlign: "middle",
        '@media (max-width: 920px)': {
            float: "none",
            lineHeight: "30px"
        }
    }
}
export default Radium(FirstConnexion)
