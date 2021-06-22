import { useState } from 'react'

const LoginUser = ({ onLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailOnChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordOnChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await onLogin(email, password)
    }

    return (
        <div style={{width : "100%"}}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <h1 className="login-title" style={loginTitleStyle}>Connexion</h1>

                <label className="login-label" style={loginLabelStyle}>Votre email : </label>
                <input className="login-input" type="email" id="email" name="email" style={loginInputStyle} required onBlur={handleEmailOnChange} />
                

                <label className="login-label" style={loginLabelStyle}>Votre mot de passe : </label>
                <input className="login-input" type="password" id="password" name="password" style={loginInputStyle} required onBlur={handlePasswordOnChange} />
                
                <input type="submit" className="login-button" value="Se connecter" style={loginSubmitStyle}/>
            
                <p style={{fontSize : "10px"}}>Mot de passe oublié ?</p>
            </form>
        </div>
    )
}

const formStyle = {
    display : "flex",
    flexDirection : "column",
    width : "100%",
    maxWidth :"300px",
    margin : "auto"
}

const loginTitleStyle = {
    fontSize : "20px",
    textAlign : "center",
    marginBottom : "20px"
}

const loginLabelStyle = {}

const loginInputStyle = {
    padding : "5px",
    marginTop : "5px"
}

const loginSubmitStyle = {
    padding : "15px",
    marginTop : "20px",
    backgroundColor: "#0B6BA8",
    border : "none",
    color : "white",
    cursor : "pointer"
}

export default LoginUser
