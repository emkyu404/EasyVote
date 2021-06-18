const LoginUser = () => {
    
    const handleSubmit = function (e) {
        e.preventDefault();
        console.log("default");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 class="login-title" style={loginTitleStyle}>Connexion</h1>

                <label class="login-label" for="email" style={loginLabelStyle}>Votre email : </label>
                <input class="login-input" type="email" id="email" name="email" style={loginInputStyle} required />

                <label class="login-label" for="password" style={loginLabelStyle}>Votre mot de passe : </label>
                <input class="login-input" type="password" id="password" name="password" style={loginInputStyle} required />

                <button class="login-button">Se connecter</button>
            </form>
        </div>
    )
}

const loginTitleStyle = {}

const loginLabelStyle = {}

const loginInputStyle = {}

export default LoginUser
