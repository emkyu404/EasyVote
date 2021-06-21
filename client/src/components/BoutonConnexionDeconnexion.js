const BoutonConnexionDeconnexion = ({ onDisconnection, isConnected }) => {
    return (
        <div className='button-container' style={buttonContainerStyle}>
        {isConnected? 
            <button className='log-btn' style={BoutonConnexionDeconnexionStyle} onClick={onDisconnection}>Se déconnecter</button>:
            <a href="/login"><button className='log-btn' style={BoutonConnexionDeconnexionStyle}>Se connecter</button></a>
        }
        </div>
    )
}

const BoutonConnexionDeconnexionStyle = {
    position : "relative",
    backgroundColor: "#0B6BA8",
    padding : "15px",
    top : "50%",
    transform : "translateY(-50%)",
    border : "none",
    color : "white",
    cursor : "pointer"
}

const buttonContainerStyle = {
    height : "100%",
    marginRight : "5vw"
}

export default BoutonConnexionDeconnexion