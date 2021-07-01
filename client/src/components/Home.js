import vote from '../img/vote.jpg';
import Radium from 'radium';
import { useEffect } from 'react'

const Home = ({onClick, pageTitle}) => {
    useEffect(() => {
        document.title = pageTitle
    }, [pageTitle])

    return (
        <div>
            <h1 style={styles.mainTitle}>Le vote à distance maintenant disponible</h1>
            <div style={styles.homeDiv}>
                <h2 style={styles.secondTitle}>Qu'est ce qu'EasyVote ?</h2>
                <div style={styles.container}>
                    <img style={styles.image} src={vote} alt="Vote" />
                    <p style={styles.text}>Découvrez dès maintenant le nouveau système de vote à distance proposé par le ministère de l'intérieur et développer par l'équipe EasyVote. Plus besoin de vous déplacer dans un bureau de poste pour voter, vous pouvez dès à présent voté directement depuis votre ordinateur ou appareil mobile. Rassurez vous, pour ceux qui souhaitent voter physiquement, il est toujours possible de voter auprès de votre bureau de vote.</p>
                </div>
                <h2 style={styles.secondTitle}>Comment s'inscrire ?</h2>
                <p style={styles.text}>C'est simple, vous n'avez rien à faire, il vous suffit de vérifier auprès de votre administration local si vous avez bien donné une adresse mail valide, si cela est le cas nous vous enverrons un mail contenant vos identifiants si vous êtes éligible pour un vote.</p>
            </div>
        </div>
    )
}

const styles = {
    homeDiv: {
        backgroundColor: "white",
        padding: "20px 40px 20px 40px",
        boxShadow: "0 0 10px #999",
        '@media (max-width: 640px)': { 
            padding: "20px 20px 20px 20px"
        }
    },
    mainTitle: {
        color: "#0B6BA8",
        height: "fit-content",
        width: "100%",
        paddingBottom: "15px",
        textAlign: "center"
    },
    secondTitle:{
        textAlign: "center",
        paddingBottom: "10px"
    },
    image: {
        float: "left",
        margin: "5px 20px 5px 5px",
        width: "400px",
        '@media (max-width: 640px)': { 
            width: "100%"
        },
        '@media (max-width: 960px)': { 
            float: "none",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
        }  
    },
    text: {
        textAlign: "justify"
    },
    container: {
        overflow: "hidden",
        paddingBottom: "20px"
    }
}

export default Radium(Home)