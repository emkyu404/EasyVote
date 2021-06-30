import React from 'react'

const Candidat = ({candidatCard}) => {
    return (
        <div style={styles.card} className="card">
            <div className="information">
                <h3 style={styles.name}>{candidatCard.titreCandidat}</h3>
                <h4 style={styles.slogan}>Nikdro !</h4>
                <div style={styles.picture}>
                    {/* <img style={styles.img} src={thierry} /> */}
                </div>
            </div>
            <div style={styles.general}>
                <h2>Description</h2><br></br>
                <p>{candidatCard.descriptionCandidat}</p>
                <button style={styles.voterCandidat} className="voterCandidat">Voter</button>
            </div>
            {/* old Card
            <div className="container" style={styles.container}>
                <div className="card" style={styles.card}>
                    <div className="picture" style={styles.picture}>
                        <img className="img" style={styles.img} src={thierry} alt="candidat"/>
                    </div>
                    <div className="team">
                        <h4 className="name">Thierry Pilote</h4>
                        <h4 style={styles.title}>Web Developer</h4>
                    </div>
                    <div className="vote" style={styles.vote}>
                        <button style={styles.voterCandidat} onClick="{}" className="voterCandidat">Voter</button>
                    </div>
                </div>

                <div className="card" style={styles.card}>
                    <div className="picture" style={styles.picture}>
                        <img className="img" style={styles.img} src={saiyan} alt="candidat"/>
                    </div>
                    <div className="team">
                        <h4 className="name">Amaury Saiyan</h4>
                        <h4 className="title" style={styles.title}>Web Developer</h4>
                    </div>
                    <div className="vote" style={styles.vote}>
                        <button style={styles.voterCandidat} onClick="{}" className="voterCandidat">Voter</button>
                    </div>
                </div>

                <div className="card" style={styles.card}>
                    <div className="picture" style={styles.picture}>
                        <img className="img" style={styles.img} src={saiyan} alt="candidat"/>
                    </div>
                    <div className="team">
                        <h4 className="name">Amaury Saiyan</h4>
                        <h4 className="title" style={styles.title}>Web Developer</h4>
                    </div>
                    <div className="vote" style={styles.vote}>
                        <button style={styles.voterCandidat} onClick="{}" className="voterCandidat">Voter</button>
                    </div>
                </div>

                <div className="card" style={styles.card}>
                    <div className="picture" style={styles.picture}>
                        <img className="img" style={styles.img} src={saiyan} alt="candidat"/>
                    </div>
                    <div className="team">
                        <h4 className="name">Amaury Saiyan</h4>
                        <h4 className="title" style={styles.title}>Web Developer</h4>
                    </div>
                    <div className="vote" style={styles.vote}>
                        <button style={styles.voterCandidat} onClick="{}" className="voterCandidat">Voter</button>
                    </div>
                </div>

                <div className="card" style={styles.card}>
                    <div className="picture" style={styles.picture}>
                        <img className="img" style={styles.img} src={saiyan} alt="candidat"/>
                    </div>
                    <div className="team">
                        <h4 className="name">Amaury Saiyan</h4>
                        <h4 className="title" style={styles.title}>Web Developer</h4>
                    </div>
                    <div className="vote" style={styles.vote}>
                        <button style={styles.voterCandidat} onClick="{}" className="voterCandidat">Voter</button>
                    </div>
                </div>

                <div className="card" style={styles.card}>
                    <div className="picture" style={styles.picture}>
                        <img className="img" style={styles.img} src={saiyan} alt="candidat"/>
                    </div>
                    <div className="team">
                        <h4 className="name">Amaury Saiyan</h4>
                        <h4 className="title" style={styles.title}>Web Developer</h4>
                    </div>
                    <div className="vote" style={styles.vote}>
                        <button style={styles.voterCandidat} onClick="{}" className="voterCandidat">Voter</button>
                    </div>
                </div>
            </div>*/}
        </div>
    )
}

const styles={
    card: {
        width: "450px",
        height: "250px",
        backgroundColor: "#fff",
        background: "linear-gradient(#f8f8f8, #FFF5EE)",
        boxShadow: "0 8px 16px -8px rgba(0,0,0,0.4)",
        borderRadius: "6px",
        overflow: "hidden",
        position: "relative",
        margin: "40px",
    },

    picture: {
        display: "inline-block",
        height: "130px",
        width: "130px",
        marginLeft: "10px",
        zIndex: "1",
        position: "relative",
    },

    img: {
        width: "100%",
        borderRadius: "50%",
        transform: "scale(1)",
    },


    slogan: {
        display: "block",
        fontSize: "15px",
        color: "#4e5052",
        textTransform: "capitalize",
        margin: "10px",
    },

    name: {
        margin: "10px",
    },

    voterCandidat: {
        backgroundColor: "#0B6BA8",
        border: "none",
        color: "white",
        cursor: "pointer",
        position: "absolute",
        bottom: "1rem",
        right: "1rem",
        fontSize: "0.9em",
        width: "100px",
    },

    general: {
        width: "300px",
        height: "100%",
        position: "absolute",
        top: "0",
        right: "0",
        zIndex: "1",
        boxSizing: "border-box",
        padding: "1rem",
    },
}

export default Candidat
