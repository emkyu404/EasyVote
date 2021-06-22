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
            <form onSubmit={sendEmail} className='contact_form'>
                <h2>Contactez-nous</h2>
                <div className="form-content">
                    <div>
                        <input type="text" placeholder="Nom" name="lastName" />
                    </div>
                    <div>
                        <input type="text" placeholder="Prénom" name="name" />
                    </div>
                    <div>
                        <input type="email" placeholder="Email" name="email" />
                    </div>
                    <div>
                        <input type="text" placeholder="Numéro de téléphone" name="phone" />
                    </div>
                    <div>
                        <input type="text" placeholder="Sujet" name="subject" />
                    </div>
                    <div>
                        <textarea id="" cols="30" rows="8" placeholder="Message" name="message"></textarea>
                    </div>
                    <div>
                        <input type="submit" className="button" value="Envoyer"></input>
                    </div>
                </div>
            </form>
        </div>
    )
}