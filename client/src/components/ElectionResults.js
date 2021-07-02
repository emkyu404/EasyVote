import React from 'react'
import Radium from "radium"
import Chart from "react-google-charts";

const ElectionResults = ({election, candidat, votes}) => {
    return (
        <div style={styles.electionDiv}>
            <h2 style={styles.secondTitle}>{election.titreElection}</h2>
            <p>Description : {election.descriptionElection}</p>
            Date de début : {election.dateDebutElection} <br/>
            Date de fin : {election.dateFinElection}<br/>

            <div style={styles.pieChartContainer}>
                <Chart
                    chartType="PieChart"
                    data={votes}
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
            {/* <div style={styles.columnChartContainer}>
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
            </div> */}
        </div>
    )
}

const styles={
    electionDiv: {
        backgroundColor: "white",
        padding: "20px 40px 20px 40px",
        boxShadow: "0 0 10px #999",
        '@media (max-width: 640px)': {
            padding: "20px 20px 20px 20px"
        }
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

export default Radium(ElectionResults)
