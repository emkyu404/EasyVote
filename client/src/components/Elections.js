import AddElection from "./AddElection";
import ElectionCard from "./ElectionCard";
import React, { useEffect } from "react";
import Radium from 'radium';

const Elections = ({ getElections, elections }) => {
    useEffect(() => {
        getElections();
    }, [])

    return (
        <div>
            <h1 style={styles.mainTitle}>Listes des élections</h1>
                <button style={Object.assign({},styles.btnFiltre, styles.blue)}>En cours</button>
                <button style={Object.assign({},styles.btnFiltre, styles.green, {width: "34%"})}>A venir</button>
                <button style={Object.assign({},styles.btnFiltre, styles.red)}>Terminées</button>
            <div style={styles.divElections}>
                {elections.map((electionCard) => (
                    <ElectionCard key={electionCard.id} electionCard={electionCard}/>
                ))}
            </div>
        </div>
    )
}

const styles = {
    mainTitle: {
        color: "#0B6BA8",
        height: "fit-content",
        width: "100%",
        paddingBottom: "15px",
        textAlign: "center"
    },
    divElections: {
        backgroundColor: "white",
        padding: "40px 40px 10px 40px",
        boxShadow: "0 0 10px #999"
    },
    divElection: {
        border: "1px solid #0B6BA8",
        padding: "30px 30px 80px 30px",
        marginBottom: "30px"
    },
    text: {
        textAlign: "justify"
    },
    btn: {
        minWidth: "200px",
        padding: "15px",
        border: "none",
        color: "white",
        cursor: "pointer",        
        float: "right",
        marginTop: "15px"
    },
    blue : {
        backgroundColor: "#0B6BA8"
    },
    green : {
        backgroundColor: "#009F79"
    },
    red : {
        backgroundColor: "#A63950"
    },
    btnFiltre: {
        width: "33%",
        padding: "15px",
        border: "none",
        color: "white",
        cursor: "pointer"
    },
}

export default Radium(Elections)
