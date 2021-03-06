import { useState, useEffect } from 'react'
import Radium from 'radium'


const LoginAdmin = ({ onLogin, pageTitle }) => {

    useEffect(() => {
        document.title = pageTitle
    }, [pageTitle])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onLogin(email, password)
    }

    return (
        <div style={{ width : "100%" }}>
            <form onSubmit={handleSubmit} style={styles.formStyle}>
                <h1 className="login-title" style={styles.loginTitleStyle}>Connexion administrateur</h1>

                <label className="login-label" style={styles.loginLabelStyle}>Votre email : </label>
                <input className="login-input" type="email" id="email" name="email" style={styles.loginInputStyle} required onChange={(e) => setEmail(e.target.value)} />
                
                <label className="login-label" style={styles.loginLabelStyle}>Votre mot de passe : </label>
                <input className="login-input" type="password" id="password" name="password" style={styles.loginInputStyle} required onChange={(e) => setPassword(e.target.value)} />
                
                <input type="submit" className="login-button" value="Se connecter" style={styles.loginSubmitStyle} disabled={!validateForm()}/>
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

    loginTitleStyle: {
        fontSize: "20px",
        textAlign: "center",
        marginBottom: "20px"
    },

    loginInputStyle: {
        padding: "5px",
        marginTop: "5px",
        marginBottom: "15px",
    },

    loginSubmitStyle: {
        padding: "15px",
        marginTop: "10px",
        backgroundColor: "#0B6BA8",
        border: "none",
        color: "white",
        cursor: "pointer",
        ':hover': {
            backgroundColor: "#074E7B",
            transition: "0.2s"
        }
    }
}

export default Radium(LoginAdmin)
