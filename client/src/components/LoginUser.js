const LoginUser = () => {
    return (
        <div>
            <h1>Connexion</h1>

            <label class="login-label" for="email">Votre email : </label>
            <input class="login-input" type="email" id="email" name="email" required />

            <label class="login-label" for="password">Votre mot de passe : </label>
            <input class="login-input" type="password" id="password" name="password" required />

            <button class="login-button">Se connecter</button>
        </div>
    )
}

export default LoginUser
