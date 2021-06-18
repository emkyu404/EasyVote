import logo from '../img/header-logo.png';
import BoutonConnexionDeconnexion from './BoutonConnexionDeconnexion';

const Header = () => {
    return (
        <div className='header'>
            <div className="logo-container" style={logoContainerStyle}>
                <img className='header-logo' style={headerLogoStyle} src={logo}/>
            </div>
            <BoutonConnexionDeconnexion />
        </div>
    )
}

const logoContainerStyle = {
    height : "100%"
}

const headerLogoStyle = {
    position : "relative",
    top : "50%",
    transform : "translateY(-50%)",
    width : "auto",
    height : "70%"
}

export default Header