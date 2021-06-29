import React from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import Radium from "radium"
import thierry from '../img/thierry.JPG'
import saiyan from '../img/saiyan.jpg'

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
    }

}