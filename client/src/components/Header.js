import logo from '../img/header-logo.png';
import BoutonConnexionDeconnexion from './BoutonConnexionDeconnexion';
import {Link} from "react-router-dom";
import Radium from 'radium'

const Header = ({ onDisconnection, isConnected }) => {
    return (
        <div className='header'>
            <div className="logo-container" style={styles.logoContainerStyle}>
                <Link to="/"><img className='header-logo clickable' style={styles.headerLogoStyle} src={logo} alt="Logo"/></Link>
            </div>
            <BoutonConnexionDeconnexion onDisconnection = {onDisconnection} isConnected={isConnected} />
        </div>
    )
}

const styles = {
    logoContainerStyle : {
        height : "100%"
    },
    headerLogoStyle : {
        position : "relative",
        top : "50%",
        transform : "translateY(-50%)",
        width : "auto",
        height : "70%",
        ':hover' : {
            cursor : "pointer",
        }
    }
}

export default Radium(Header)