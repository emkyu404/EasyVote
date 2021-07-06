import React, { useEffect } from "react";
import Radium from "radium"
import { useLocation } from "react-router-dom";

import ElectionWait from "./ElectionWait";
import ElectionVote from "./ElectionVote";
import ElectionResults from "./ElectionResults";


const Election = ({getElection, election, getCandidats, candidats, getVotes, votes, addVote, participer, getParticiper, pageTitle, currentUser, updateElection}) => {
    const { state } = useLocation();

    useEffect(() => {
        document.title = pageTitle
    }, [pageTitle])
    
    useEffect(() => {
        async function prepareElection(){
            await getElection(state.URLIdElection)
        }
        prepareElection();
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        async function prepareElection(){
            if(election.started===true){
                await getCandidats(state.URLIdElection)
                await getParticiper(state.URLIdElection)
            }
            if (election.ended===true){
                await getVotes(state.URLIdElection)
            }
        }
        prepareElection();
    }, [election])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            {election.ended===true
            ?
            <div>
                {/* {(currentUser.idAdmin !== undefined && currentUser.idAdmin !== 0) &&
                    <h1 style={styles.mainTitle}>Modifier l'élection</h1>
                } */}
                <ElectionResults election={election} candidats={candidats} votes={votes} currentUser={currentUser} updateElection={updateElection} />
            </div>
            :
            election.started===true
            ?
            <div>
                {/* {(currentUser.idAdmin !== undefined && currentUser.idAdmin !== 0) &&
                    <h1 style={styles.mainTitle}>Modifier l'élection</h1>
                } */}
                <ElectionVote election={election} candidats={candidats} addVote={addVote} URLIdElection={state.URLIdElection} participer={participer} getParticiper={getParticiper} currentUser={currentUser} updateElection={updateElection} />
            </div>
            :
            (election.started===false && election.ended===false) 
            ?
            <div>
                {/* {(currentUser.idAdmin !== undefined && currentUser.idAdmin !== 0) &&
                    <h1 style={styles.mainTitle}>Modifier l'élection</h1>
                } */}
                <ElectionWait election={election} currentUser={currentUser} updateElection={updateElection} />
            </div>
            :
            <div>
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
