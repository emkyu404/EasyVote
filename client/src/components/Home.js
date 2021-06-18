import vote from '../img/vote.jpg';

const Home = ({onClick}) => {
    return (
        <div className='main-home'>
                <h1 style={{textAlign:"center"}}>Le vote à distance maintenant disponible</h1>
                <div className="flex-row-wrap">
                <div><img src={vote} alt="Vote" /></div>
                <p>Découvrez dès maintenant le nouveau système de vote à distance proposé par le ministère de l'intérieur et développer par l'équipe EasyVote. Plus besoin de vous déplacer dans un bureau de poste pour voter, vous pouvez dès à présent voté directement depuis votre ordinateur ou appareil mobile. Rassurez vous, pour ceux qui souhaitent voter physiquement, il est toujours possible de voter auprès de votre bureau de vote.</p>
                </div>
                <h2>Comment s'inscrire ?</h2>
                <p>C'est simple, vous n'avez rien à faire, il vous suffit de vérifier auprès de votre administration local si vous avez bien donné une adresse mail valide, si cela est le cas nous vous enverrons un mail contenant vos identifiants si vous êtes éligible pour un vote.</p>
        </div>
    )
}

export default Home