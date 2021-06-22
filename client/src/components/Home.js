import vote from '../img/vote.jpg';
import Radium from 'radium';

const Home = ({onClick}) => {
    return (
        <div style={styles.mainHome}>
            <h1 style={styles.mainTitle}>Le vote à distance maintenant disponible</h1>
            <img style={styles.image} img src={vote} alt="Vote" />
            <p style={styles.text}>Découvrez dès maintenant le nouveau système de vote à distance proposé par le ministère de l'intérieur et développer par l'équipe EasyVote. Plus besoin de vous déplacer dans un bureau de poste pour voter, vous pouvez dès à présent voté directement depuis votre ordinateur ou appareil mobile. Rassurez vous, pour ceux qui souhaitent voter physiquement, il est toujours possible de voter auprès de votre bureau de vote.</p>
            <h2>Comment s'inscrire ?</h2>
            <p style={styles.text}>C'est simple, vous n'avez rien à faire, il vous suffit de vérifier auprès de votre administration local si vous avez bien donné une adresse mail valide, si cela est le cas nous vous enverrons un mail contenant vos identifiants si vous êtes éligible pour un vote.</p>
        </div>
    )
}

const styles = {
    mainHome: {
    },
    mainTitle: {
        color: "#0B6BA8",
        height: "fit-content",
        width: "100%",
        paddingBottom: "15px",
        textAlign: "center"
    },
    image: {
        float: "left",
        margin: "5px",
        width: "400px",
        '@media (max-width: 640px)': { 
            width: "100%"
        } 
    },
    text: {
        textAlign: "justify"
    },
}

export default Radium(Home)