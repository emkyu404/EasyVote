import emailjs from "emailjs-com";
import React from 'react';
import Radium from 'radium';

const Contact = ({ Contact }) => {

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_btyu4pb', 'template_nd7o35g', e.target, 'user_i6c320cLnwcR81VHCJfhi')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset()
    }

    return (
        <div style={styles.fullWidth}>
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
    fullWidth: {
        width: "100%"
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
    divForm: {
        backgroundColor: "white",
        padding: "20px 40px 75px 40px",
        boxShadow: "0 0 10px #999",
        margin: "20px 0px 20px 0px",
        width: "100%",
        '@media (max-width: 640px)': { 
            padding: "20px 20px 60px 20px"
        }
    },
    label: {
        float: "left",
        height: "50px",
        lineHeight: "50px",
        textAlign: "center",
        verticalAlign: "middle",
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
    }
}

export default Radium(Contact)