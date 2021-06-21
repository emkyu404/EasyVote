import { useState } from 'react'

const LoginUser = ({ onLogin }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailOnChange = (e) => {
        setEmail(e.target.value)
        setTimeout(function() {console.log(email)}, 1000)
        
    }

    const handlePasswordOnChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onLogin(email, password)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 className="login-title" style={loginTitleStyle}>Connexion</h1>

                <label className="login-label" style={loginLabelStyle}>Votre email : 
                    <input className="login-input" type="email" id="email" name="email" style={loginInputStyle} required onBlur={handleEmailOnChange} />
                </label>

                <label className="login-label" style={loginLabelStyle}>Votre mot de passe : 
                    <input className="login-input" type="password" id="password" name="password" style={loginInputStyle} required onBlur={handlePasswordOnChange} />
                </label>
                <input type="submit" className="login-button" value="Se connecter"/>
            
                <p>Mot de passe oublié ?</p>
            </form>
        </div>
    )
}

const loginTitleStyle = {}

const loginLabelStyle = {}

const loginInputStyle = {}

export default LoginUser
