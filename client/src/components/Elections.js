import ElectionCard from "./ElectionCard";
import React, { useEffect } from "react";
import Radium from 'radium';
import { useHistory } from 'react-router-dom';

const Elections = ({getCurrentDate, getElections, filteredElections, filterElection }) => {

    useEffect( () => {
        async function prepareElections(){
            await getCurrentDate();
            await getElections();
            await filterElection("Ongoing");
        }
        prepareElections();
    }, [])

    const history = useHistory();

    const election = () => {
        history.push("./election");
    }

    return (
        <div>
            <button onClick={election}>OUI</button>
            <h1 style={styles.mainTitle}>Listes des élections</h1>
            <button style={Object.assign({},styles.btnFiltre, styles.blue)} onClick={ () => filterElection("Ongoing")}>En cours</button>
            <button style={Object.assign({},styles.btnFiltre, styles.green, {width: "34%"})} onClick={ () => filterElection("Soon")}>A venir</button>
            <button style={Object.assign({},styles.btnFiltre, styles.red)} onClick={ () => filterElection("Finished")}>Terminées</button>
            <div style={styles.divElections}>
                {typeof(filteredElections)==="undefined" || filteredElections.length===0 ? "Aucune élection" : filteredElections.map((electionCard) => (
                    <div key={electionCard.idElection}>
                        <ElectionCard electionCard={electionCard}/>
                    </div>
                )) }
                
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
