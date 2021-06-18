import styled from 'styled-components';

const Title = styled.h1`
  color: #0d1a26;
  font-weight: 400;
`;

const Label = styled.label`
  color: #0d1a26;
  font-weight: 400;
`;

const LoginAdmin = () => {
    return (
        <div>
            <Title>Connexion administrateur</Title>

            <Label class="login-label" for="email">Votre email : </Label>
            <input class="login-input" type="email" id="email" name="email" required />

            <Label class="login-label" for="password">Votre mot de passe : </Label>
            <input class="login-input" type="password" id="password" name="password" required />

            <button class="login-button">Se connecter</button>
        </div>
    )
}

export default LoginAdmin
