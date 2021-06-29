import React from 'react'
import Radium from "radium"
import thierry from '../img/thierry.JPG'
import saiyan from '../img/saiyan.jpg'
import Chart from "react-google-charts";

const Election = () => {
    return (
        <div>
            {/* <PieChart
                data={[
                    { title: 'One', value: 10, color: '#E38627' },
                    { title: 'Two', value: 15, color: '#C13C37' },
                    { title: 'Three', value: 20, color: '#6A2135' },
                ]}
            /> */}

            <h1 style={styles.mainTitle}>Résultat du vote</h1>
            <div style={styles.electionDiv}>
                <h2 style={styles.secondTitle}>Nike dro ?</h2>
                <p>🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔 Nike dro ? 🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔</p>
                <div style={styles.chartContainer}>
                    <Chart
                        chartType="PieChart"
                        data={[
                            ['Choix', 'Votes'],
                            ['Oui', 30],
                            ['Non', 10],
                            ['Yes', 30],
                            ['Oui aussi', 30],
                        ]}
                        height="600px"
                        options={{
                            chartArea: {
                                height: '80%',
                                width: '100%',
                            },
                            legend: {
                                position: 'top',
                                alignment: 'center'
                            }
                        }}
                    />
                </div>
                <p>🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔 Nike dro ? 🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔</p>
            </div>


            <div className="container" style={styles.container}>
                <div className="card" style={styles.card}>
                    <div className="picture" style={styles.picture}>
                        <img className="img" style={styles.img} src={thierry} />
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
                        <img className="img" style={styles.img} src={saiyan} />
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
                        <img className="img" style={styles.img} src={saiyan} />
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
                        <img className="img" style={styles.img} src={saiyan} />
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
                        <img className="img" style={styles.img} src={saiyan} />
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
                        <img className="img" style={styles.img} src={saiyan} />
                    </div>
                    <div className="team">
                        <h4 className="name">Amaury Saiyan</h4>
                        <h4 className="title" style={styles.title}>Web Developer</h4>
                    </div>
                    <div className="vote" style={styles.vote}>
                        <button style={styles.voterCandidat} onClick="{}" className="voterCandidat">Voter</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Radium(Election)


const styles = {

    card: {
        padding: "30px 0 40px",
        backgroundColor: "#f7f5ec",
        textAlign: "center",
        overflow: "hidden",
        position: "relative",
        borderRadius: "0.2em",
        border: "solid #0B6BA8",
        paddingLeft: "15px",
        paddingRight: "15px",
        width: "240px",
        topMax: "200px",
        bottomMax: "200px",
        float: "left",
        margin: "70px",
    },

    picture: {
        display: "inline-block",
        height: "130px",
        width: "130px",
        marginBottom: "50px",
        zIndex: "1",
        position: "relative",
    },



    img: {
        width: "100%",
        borderRadius: "50%",
        transform: "scale(1)",

    },


    title: {
        display: "block",
        fontSize: "15px",
        color: "#4e5052",
        textTransform: "capitalize",
    },


    container: {
        overflow: "hidden",
    },

    voterCandidat: {
        backgroundColor: "#0B6BA8",
        border: "none",
        color: "white",
        cursor: "pointer",
    },

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
    chartContainer: {

    }
}



