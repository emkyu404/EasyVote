import logo from '../img/header-logo.png';
import BoutonConnexionDeconnexion from './BoutonConnexionDeconnexion';

const Header = ({ onDisconnection, isConnected }) => {
    return (
        <div className='header'>
            <div className="logo-container" style={logoContainerStyle}>
                <a href="/"><img className='header-logo clickable' style={headerLogoStyle} src={logo} alt="Logo"/></a>
            </div>
            <BoutonConnexionDeconnexion onDisconnection = {onDisconnection} isConnected={isConnected} />
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