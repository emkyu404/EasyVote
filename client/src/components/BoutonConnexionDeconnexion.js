const BoutonConnexionDeconnexion = () => {
    return (
        <div className='button-container' style={buttonContainerStyle}>
          <button className='log-btn' style={{display: "none"}}>Se connecter</button>
            <button className='log-btn' style={BoutonConnexionDeconnexionStyle}>Se déconnecter</button>  
        </div>
    )
}

const BoutonConnexionDeconnexionStyle = {
    position : "relative",
    backgroundColor: "#0B6BA8",
    padding : "10px",
    top : "50%",
    transform : "translateY(-50%)"
}

const buttonContainerStyle = {
    height : "100%",
    marginRight : "5vw"
}

export default BoutonConnexionDeconnexion