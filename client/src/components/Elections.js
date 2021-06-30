import ElectionCard from "./ElectionCard";
import React, { useEffect } from "react";
import Radium from 'radium';
import { useHistory } from 'react-router-dom';
import loupe from '../img/loupe.png'

const Elections = ({getCurrentDate, getElections, filteredElections, filterElection }) => {

    useEffect( () => {
        async function prepareElections(){
            await getCurrentDate();
            await getElections();
            await filterElection("Ongoing");
        }
        prepareElections();
        switchBtn("Ongoing");
    }, [])

    const history = useHistory();

    const election = () => {
        history.push("./election");
    }

    function switchBtn(btnName) {
        if(btnName === "Ongoing"){
            document.getElementById("Ongoing").style.flex="2";
            document.getElementById("Soon").style.flex="1";
            document.getElementById("Finished").style.flex="1";
            document.getElementById("divElections").style.backgroundColor="#0B6BA8";
        } else if(btnName === "Soon") {
            document.getElementById("Ongoing").style.flex="1";
            document.getElementById("Soon").style.flex="2";
            document.getElementById("Finished").style.flex="1";
            document.getElementById("divElections").style.backgroundColor="#009F79";
        } else if(btnName === "Finished") {
            document.getElementById("Ongoing").style.flex="1";
            document.getElementById("Soon").style.flex="1";
            document.getElementById("Finished").style.flex="2";
            document.getElementById("divElections").style.backgroundColor="#A63950";
        }

    }

    return (
        <div>
            <button onClick={election}>OUI</button>
            <h1 style={styles.mainTitle}>Listes des élections</h1>
            <div style={styles.flexContainer}>
            <button id="Ongoing" style={Object.assign({},styles.btnFiltre, styles.blue)} onClick={ () => {filterElection("Ongoing"); switchBtn("Ongoing");}}>En cours</button>
            <button id="Soon" style={Object.assign({},styles.btnFiltre, styles.green)} onClick={ () => {filterElection("Soon"); switchBtn("Soon");}}>A venir</button>
            <button id="Finished" style={Object.assign({},styles.btnFiltre, styles.red)} onClick={ () => {filterElection("Finished"); switchBtn("Finished");}}>Terminées</button>
            </div>
            <div id="divElections" style={styles.divElections}>
                {typeof(filteredElections)==="undefined" || filteredElections.length===0 ? 
                <div style={styles.emptyDiv}>
                    <img style={styles.emptyImg} src={loupe} alt="loupe"/>
                    <p style={styles.emptyMessage}>Il n'y a actuellement aucune éléction correpondant à votre recherche</p>
                </div> 
                : filteredElections.map((electionCard) => (
                    <div key={electionCard.idElection}>
                        <ElectionCard electionCard={electionCard}/>
                    </div>
                )) }
                
            </div>
        </div>
    )
}

const styles = {
    flexContainer:{
        display: "flex",
        flexDirection: "row",
        flexWrap: "no-wrap",
    },
    mainTitle: {
        color: "#0B6BA8",
        height: "fit-content",
        width: "100%",
        paddingBottom: "15px",
        textAlign: "center"
    },
    divElections: {
        backgroundColor: "#0B6BA8",
        padding: "40px 40px 10px 40px",
        boxShadow: "0 0 10px #999"
    },
    blue : {
        backgroundColor: "#0B6BA8",
    },
    green : {
        backgroundColor: "#009F79",
    },
    red : {
        backgroundColor: "#A63950",
    },
    btnFiltre: {
        flex: 1,
        padding: "15px",
        border: "none",
        color: "white",
        cursor: "pointer",
        transition: "0.5s"
    },
    emptyImg: {
        maxWidth: "150px",
        filter: "brightness(0) invert(1)"
    },
    emptyMessage: {
        padding: "0 20% 0 20%",
        '@media (max-width: 640px)': { 
            padding: "0 0 0 0",
        },
        color: "white"
    },
    emptyDiv: {
        textAlign: "center"
    }
}

export default Radium(Elections)
