import React, { useEffect } from "react";
import Radium from "radium"
import { useLocation } from "react-router-dom";

import ElectionWait from "./ElectionWait";
import ElectionVote from "./ElectionVote";
import ElectionResults from "./ElectionResults";


const Election = ({getElection, election, getCandidats, candidats, getVotes, votes, pageTitle}) => {
    const { state } = useLocation();

    useEffect(() => {
        document.title = pageTitle
    }, [pageTitle])
    
    useEffect(() => {
        async function prepareElection(){
            await getElection(state.URLIdElection)
        }
        prepareElection();
    }, [])

    useEffect(() => {
        async function prepareElection(){
            if(election.started===true){
                await getCandidats(state.URLIdElection)
            }
            if (election.ended===true){
                await getVotes(state.URLIdElection)
            }
        }
        prepareElection();
    }, [election])

    return (
        <div>
            {election.ended===true
            ?
            <div>
                <h1 style={styles.mainTitle}>Résultat du vote</h1>
                <ElectionResults election={election} candidats={candidats} votes={votes}/>
            </div>
            :
            election.started===true
            ?
            <div>
                <h1 style={styles.mainTitle}>Voter pour un candidat</h1>
                <ElectionVote candidats={candidats}/>
            </div>
            :
            <div>
                <h1 style={styles.mainTitle}>En cours de préparation</h1>
                <ElectionWait election={election}/>
            </div>
            }
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
}

export default Radium(Election)
