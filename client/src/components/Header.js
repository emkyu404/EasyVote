import logo from '../img/header-logo.png';
import BoutonConnexionDeconnexion from './BoutonConnexionDeconnexion';

const Header = () => {
    return (
        <div className='header'>
            <div className="logo-container" style={logoContainerStyle}>
                <a href="/"><img className='header-logo clickable' style={headerLogoStyle} src={logo}/></a>
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