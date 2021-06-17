import logo from '../img/header-logo.png';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

const Header = () => {
    return (
        <div className='header'>
            <img className='header-logo' src={logo}/>
            <button className='log-btn' style={{display: "none"}}>Se connecter</button>
            <button className='log-btn'>Se déconnecter</button>
        </div>
    )
}

export default Header