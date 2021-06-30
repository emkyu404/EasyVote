import React, { useEffect} from "react";
import Radium from "radium"
import Chart from "react-google-charts";
import { useLocation } from "react-router-dom";

import Candidats from "./Candidats";

const Election = ({getElection, election, getCandidats, candidats}) => {
    const { state } = useLocation();
    
    useEffect(() => {
        async function prepareElection(){
            await getElection(state.URLIdElection)
            await getCandidats(state.URLIdElection)
        }
        prepareElection();
    }, [])

    return (
        <div>
            {election.ended===true 
            ?
            <div>
                <h1 style={styles.mainTitle}>Résultat du vote</h1>
                <div style={styles.electionDiv}>
                    <h2 style={styles.secondTitle}>{election.titreElection}</h2>
                    <p>Description : {election.descriptionElection}</p>
                    Date de début : {election.dateDebutElection} <br/>
                    Date de fin : {election.dateFinElection}<br/>

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
            </div>
            :
            <Candidats candidats={candidats}/>
            }
        </div>
    )
}

const styles = {
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
