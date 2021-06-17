import logo from '../img/header-logo.png';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

const Header = () => {
    return (
        <div className='header'>
            {/* <Router>
                <Link className='header-link' to="/"> */}
                    <img className='header-logo' src={logo}/>
                {/* </Link>
            </Router> */}

            <button className='log-btn'>Se connecter</button>
            <button className='log-btn'>Se déconnecter</button>
        </div>
    )
}

export default Header