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
                <ElectionResults election={election} candidats={candidats} votes={votes} currentUser={currentUser} updateElection={updateElection} />
            </div>
            :
            election.started===true
            ?
            <div>
                <ElectionVote election={election} candidats={candidats} addVote={addVote} URLIdElection={state.URLIdElection} participer={participer} getParticiper={getParticiper} currentUser={currentUser} updateElection={updateElection} />
            </div>
            :
            (election.started===false && election.ended===false) 
            ?
            <div>
                <ElectionWait election={election} currentUser={currentUser} updateElection={updateElection} />
            </div>
            :
            <div>
            </div>
            }
        
        </div>
    )
}

export default Radium(Election)
