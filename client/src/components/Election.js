import React from 'react'
import Radium from "radium"
import thierry from '../img/thierry.JPG'
import saiyan from '../img/saiyan.jpg'
import Chart from "react-google-charts";

const Election = () => {
    return (
        <div>
            <h1 style={styles.mainTitle}>Résultat du vote</h1>
            <div style={styles.electionDiv}>
                <h2 style={styles.secondTitle}>Nike dro ?</h2>
                <p>🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔 Nike dro ? 🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔</p>
                <p>Description : Wow really nice graphe</p>
                <p>🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔 Nike dro ? 🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔</p>
                <div style={styles.pieChartContainer}>
                    <Chart
                        chartType="PieChart"
                        data={[
                            ['Choix', 'Votes'],
                            ['Oui', 30],
                            ['Non', 10],
                            ['Yes', 30],
                            ['Oui aussi', 30],
                        ]}
                        height="100%"
                        width="100%"
                        options={{
                            chartArea: {
                                height: '80%',
                                width: '100%',
                            },
                            legend: {
                                position: 'bottom',
                                alignment: 'center'
                            },
                            tooltip: {
                                trigger: 'none'
                            },
                            enableInteractivity: false
                        }}
                    />
                </div>
                <div style={styles.columnChartContainer}>
                    <Chart
                        chartType="ColumnChart"
                        data={[
                            ['Choix', 'Oui', { role: 'annotation' }, 'Non', { role: 'annotation' }, 'Yes', { role: 'annotation' }, 'Oui aussi', { role: 'annotation' }],
                            ['', 30, "30", 10, "10", 30, "30", 30, "30"],
                        ]}
                        height="100%"
                        width="100%"
                        options={{
                            chartArea: {
                                height: '80%',
                                width: '80%',
                            },
                            legend: {
                                position: 'bottom',
                                alignment: 'center'
                            },
                            bar: { groupWidth: "90%" }
                            ,
                            tooltip: {
                                trigger: 'none'
                            },
                            enableInteractivity: false
                        }}
                    />
                </div>
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

            {/* Carte de candidat */}
            <div style={styles.container}>
                <div style={styles.card} className="card">
                    <div className="information">
                        <h3 style={styles.name}>Thierry Pilote</h3>
                        <h4 style={styles.slogan}>Nikdro !</h4>
                        <div style={styles.picture}>
                            <img style={styles.img} src={thierry} />
                        </div>
                    </div>
                    <div style={styles.general}>
                        <h2>Description</h2><br></br>
                        <p>Votez moi et je vous emmène sur la lune.</p>
                        <button style={styles.voterCandidat} onClick="{}" className="voterCandidat">Voter</button>

                    </div>
                </div>

                <div style={styles.card} className="card">
                    <div className="information">
                        <h3 className="name" style={styles.name}>Thierry Pilote</h3>
                        <h4 className="slogan" style={styles.slogan}>Nikdro !</h4>
                        <div className="picture" style={styles.picture}>
                            <img className="img" style={styles.img} src={thierry} />
                        </div>
                    </div>
                    <div style={styles.general}>
                        <h2>Description</h2><br></br>
                        <p>Accrochez-vous on va décoller !</p>
                        <button style={styles.voterCandidat} onClick="{}" className="voterCandidat">Voter</button>
                    </div>
                </div>


                <div style={styles.card} className="card">
                    <div className="information">
                        <h3 className="name" style={styles.name}>Thierry Pilote</h3>
                        <h4 className="slogan" style={styles.slogan}>Nikdro !</h4>
                        <div className="picture" style={styles.picture}>
                            <img className="img" style={styles.img} src={thierry} />
                        </div>
                    </div>
                    <div style={styles.general}>
                        <h2>Description</h2><br></br>
                        <p>JE PROPOSE QU'ON AILLE TOUS NIQUER DRO !!!!</p>
                        <button style={styles.voterCandidat} onClick="{}" className="voterCandidat">Voter</button>
                    </div>
                </div>
            </div>

        </div>
    )
}


const styles = {

    // card
    container: {
        overflow: "hidden",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    card: {
        width: "450px",
        height: "250px",
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


    // chart
    electionDiv: {
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
    secondTitle: {
        textAlign: "center",
        paddingBottom: "10px"
    },
    pieChartContainer: {
        height: "600px",
        '@media (max-width: 960px)': {
            height: "450px",
        },
        '@media (max-width: 640px)': {
            height: "300px",
        }
    },
    columnChartContainer: {
        height: "600px",
        '@media (max-width: 960px)': {
            height: "450px",
        },
        '@media (max-width: 640px)': {
            height: "300px",
        }
    }
}


export default Radium(Election)
