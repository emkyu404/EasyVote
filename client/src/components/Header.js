import logo from '../img/header-logo.png';
import BoutonConnexionDeconnexion from './BoutonConnexionDeconnexion';
import {Link} from "react-router-dom";
import Radium from 'radium'

const Header = ({ onDisconnection, isConnected }) => {
    return (
        <div className='header' style={styles.headerStyle}>
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
    },
    headerStyle : {
        backgroundColor : 'F9F9F9',
        height : '15vh',
        boxSizing : 'border-box',
        display : 'flex',
        padding : '10px',
        width : '100%',
        justifyContent : 'space-between',
        position : 'fixed',
        top : '0',
        zIndex : '10',
        boxShadow : '0 0 5px #999'
    }
}

export default Radium(Header)