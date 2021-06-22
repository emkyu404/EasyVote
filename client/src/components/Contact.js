import emailjs from "emailjs-com";
import React from 'react';

export default function ContactUs() {

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

        <div className='contact-form'>
            <form onSubmit={sendEmail} className='contactForm' style={styles.contactForm}>
                <h2 style={styles.h2}>Contactez-nous</h2>
                <div className="form-content">
                    <div>
                        <input type="text" placeholder="Nom" name="lastName" required />
                    </div>
                    <div>
                        <input type="text" placeholder="Prénom" name="name" required />
                    </div>
                    <div>
                        <input type="email" placeholder="Email" name="email" required />
                    </div>
                    <div>
                        <input type="text" placeholder="Numéro de téléphone" name="phone" required />
                    </div>
                    <div>
                        <input type="text" placeholder="Sujet" name="subject" required />
                    </div>
                    <div>
                        <textarea id="" cols="30" rows="8" placeholder="Message" name="message"></textarea>
                    </div>
                    <div>
                        <input type="submit" className="button" style={styles.button} value="Envoyer"></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

const styles = {
    button: {
        marginLeft: "33%",
        marginTop: "20px",
        width: "33%",
        backgroundColor: "#0B6BA8",
        padding: "15px",
        border: "none",
        color: "white",
        cursor: "pointer",
    },

    contactForm: {
        margin: "10rem auto 0",
        marginTop: "-2px",
        marginBottom: "15%",
        fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
        border: "1px solid #0B6BA8",
        background: "white",
        padding: "30px 30px 10px",
        boxShadow: "0px 4px 10px rgba(51, 51, 51, 0.637)",
        borderWidth: "0.25em",
    },

    blockAlignFirstChild: {
        alignSelf: "center",
    },

    h2: {
        marginTop: "25px",
        textAlign: "center",
    },

    formContent: {
        display: "grid",
    }


}