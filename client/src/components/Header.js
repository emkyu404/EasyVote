import logo from '../img/header-logo.png';
import BoutonConnexionDeconnexion from './BoutonConnexionDeconnexion';
import {Link} from "react-router-dom";

const Header = ({ onDisconnection, isConnected }) => {
    return (
        <div className='header'>
            <div className="logo-container" style={logoContainerStyle}>
                <Link to="/"><img className='header-logo clickable' style={headerLogoStyle} src={logo} alt="Logo"/></Link>
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