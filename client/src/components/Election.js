import React from 'react';
import Chart from "react-google-charts";
import Radium from 'radium';

const Election = () => {
    return (
        <div>
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
                            chartArea:{
                                height: '80%',
                                width: '100%',
                            },
                            legend: { 
                                position: 'top', 
                                alignment: 'center' }
                        }}
                    />
                </div>
                <p>🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔 Nike dro ? 🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔</p>
            </div>
        </div>
    )
}

const styles = {
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
    secondTitle:{
        textAlign: "center",
        paddingBottom: "10px"
    },
    chartContainer: {

    }
}

export default Radium(Election)