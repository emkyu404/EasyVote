
// import React, { useState } from 'react'
import emailjs from "emailjs-com";
import Radium from 'radium';
import { useToasts } from 'react-toast-notifications'
const PasswordForget = () => {

    // const [email, setEmail] = useState();

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    // }

    // const handleEmailOnChange = (e) => {
    //     setEmail(e.target.value)
    // }

    const { addToast } = useToasts()

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_btyu4pb', 'template_cvrcrja', e.target, 'user_i6c320cLnwcR81VHCJfhi')
            .then((result) => {
                addToast("Vous recevrez prochainement votre mot de passe par email.", {
                    appearance: 'success',
                    autoDismiss: true,
                })
            }, (error) => {
                addToast("Erreur : " + error.text, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            });
        e.target.reset()

    }

    return (
        <div style={{ width: "100%" }}>
            <form onSubmit={sendEmail} style={styles.formStyle}>
                <h1 className="forget-title" style={styles.forgetTitle}>Mot de passe oublié</h1>

                <label className="forget-label" style={styles.forgetLabel}>Votre email : </label>
                <input className="forget-input" type="email" id="email" name="email" style={styles.forgetInput} required />

                <input type="submit" className="forget-button" value="Envoyer" style={styles.forgetSubmit} />
            </form>
        </div>
    )
}

const styles = {
    formStyle: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "300px",
        margin: "auto"
    },

    forgetTitle: {
        fontSize: "20px",
        textAlign: "center",
        marginBottom: "20px"
    },

    forgetInput: {
        padding: "5px",
        marginTop: "5px"
    },

    forgetSubmit: {
        padding: "15px",
        marginTop: "20px",
        backgroundColor: "#0B6BA8",
        border: "none",
        color: "white",
        cursor: "pointer",
        ':hover': {
            backgroundColor: "#074E7B",
            transition: "0.2s"
        }
    },

    forgetLabel: {
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

export default Radium(PasswordForget)
