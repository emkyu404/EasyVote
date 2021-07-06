import emailjs from "emailjs-com"
import React from 'react'
import Radium from 'radium'
import { useToasts } from 'react-toast-notifications'

const Contact = () => {
    const {addToast} = useToasts()

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_smeqj8c', 'template_4rtoyrl', e.target, 'user_7btEnIT2d1r5Dkv4VHxvI')
            .then((result) => {
                addToast("Message envoyé avec succès !", {
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
        <div>
            <h1 style={styles.mainTitle}>Contactez-nous</h1>
            <form onSubmit={sendEmail} className='contactForm'>
                <div style={styles.divForm}>
                <h2 style={styles.secondTitle}>Formulaire de contact</h2>
                <div>
                    <div style={styles.alignleft}>
                        <label style={styles.label}>Nom : </label>
                        <span style={styles.span}><input type="text" name="lastName" required style={styles.input}/></span>
                    </div>
                    <div style={styles.alignright}>
                        <label style={styles.label}>Prénom : </label>
                        <span style={styles.span}><input type="text" name="name" required style={styles.input}/></span>
                    </div>
                </div>
                <label style={styles.label}>Email : </label>
                <span style={styles.span}><input type="email" name="email" required style={styles.input}/></span>

                <label style={styles.label}>Numéro de téléphone : </label>
                <span style={styles.span}><input type="text" name="phone" required style={styles.input}/></span>

                <label style={styles.label}>Sujet: </label>
                <span style={styles.span}><input type="text" name="subject" required style={styles.input}/></span>

                <label style={styles.label}>Message : </label>
                <textarea name="message" style={styles.textArea}></textarea>

                <input type="submit" className="button" style={styles.submit} value="Envoyer"></input>
                </div>
            </form>
        </div>
    )
}

const styles = {
    mainTitle: {
        color: "#0B6BA8",
        paddingBottom: "15px",
        textAlign: "center"
    },
    secondTitle:{
        margin:"0px 0px 20px 0px",
        textAlign: "center"
    },
    divForm: {
        backgroundColor: "white",
        padding: "20px 40px 70px 40px",
        boxShadow: "0 0 10px #999",
        width: "100%",
        '@media (max-width: 640px)': { 
            padding: "20px 20px 70px 20px"
        }
    },
    alignleft: {
        width: "47.5%",
        float: "left",
        marginRight: "2.5%",
        '@media (max-width: 960px)': { 
            float: "none",
            width: "100%",
            marginRight: "0%",
        }
    },
    alignright: {
        width: "47.5%",
        float: "right",
        marginLeft: "2.5%",
        '@media (max-width: 960px)': { 
            float: "none",
            width: "100%",
            marginLeft: "0%",
        }
    },
    label: {
        float: "left",
        lineHeight: "50px",
        textAlign: "center",
        '@media (max-width: 640px)': { 
            float: "none",
            lineHeight: "30px",
        }
    },
    input: {
        border: "1px solid #E5E5E5",
        padding: "15px",
        width: "100%",
        height: "50px",
        marginBottom: "10px"
    },
    span: {
        display: "block",
        overflow: "hidden",
        paddingLeft: "15px",
        '@media (max-width: 640px)': { 
            paddingLeft: "0px"
        }
    },
    textArea: {
        resize: "none",
        border: "1px solid #E5E5E5",
        padding: "15px",
        width: "100%",
        height: "200px",
        marginBottom: "10px"
    },
    submit: {
        backgroundColor: "#0B6BA8",
        border: "none",
        color: "white",
        padding: "15px",
        textDecoration: "none",
        cursor: "pointer",
        width: "200px",
        float: "right",
        '@media (max-width: 640px)': { 
            width: "100%"
        }
    },
    
}

export default Radium(Contact)