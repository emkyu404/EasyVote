import Radium from 'radium';

const BoutonConnexionDeconnexion = ({ onDisconnection, isConnected }) => {
    return (
        <div className='button-container' style={styles.buttonContainerStyle}>
        {isConnected? 
            <button className='log-btn' style={styles.boutonConnexionDeconnexionStyle} onClick={onDisconnection}>Se déconnecter</button>:
            <a href="/login"><button className='log-btn' style={styles.boutonConnexionDeconnexionStyle}>Se connecter</button></a>
        }
        </div>
    )
}

const styles = {
    boutonConnexionDeconnexionStyle: {
        position : "relative",
        backgroundColor: "#0B6BA8",
        padding : "15px",
        top : "50%",
        transform : "translateY(-50%)",
        border : "none",
        color : "white",
        cursor : "pointer",
        // ':hover': {
        //     color: "#0B6BA8",
        //     backgroundColor: "red"
        // }
    },
    buttonContainerStyle: {
        height : "100%",
        marginRight : "5vw"
    }
}


export default Radium(BoutonConnexionDeconnexion)