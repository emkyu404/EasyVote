import React from 'react'
import { useState, useEffect } from 'react';
import Radium from "radium"
import Chart from "react-google-charts";
import { Link } from 'react-router-dom';

const ElectionResults = ({election, candidat, votes, currentUser, updateElection}) => {

    useEffect(() => {
        const dateHeureDebut = election.start.split(' ');
        const dateHeureFin = election.end.split(' ');
        setDateDebutElection(dateHeureDebut[0])
        setDateFinElection(dateHeureFin[0])
        setHeureDebut(dateHeureDebut[1])
        setHeureFin(dateHeureFin[1])
      },[election])

    const [titreElection, setElectionTitle] = useState(election.titreElection)
    const [dateDebutElection, setDateDebutElection] = useState("")
    const [dateFinElection, setDateFinElection] = useState("")
    const [descriptionElection, setDescriptionElection] = useState(election.descriptionElection)

    const [heureDebut, setHeureDebut] = useState("")
    const [heureFin, setHeureFin] = useState("")

    const handleTitreOnChange = (e) => {
        setElectionTitle(e.target.value)
    }
    const handleDateDebutOnChange = (e) => {
        setDateDebutElection(e.target.value)
    }
    const handleDateFinOnChange = (e) => {
        setDateFinElection(e.target.value)
    }
    const handleHeureDebutOnChange = (e) => {
        setHeureDebut(e.target.value)
    }
    const handleHeureFinOnChange = (e) => {
        setHeureFin(e.target.value)
    }
    const handleDescriptionOnChange = (e) => {
        setDescriptionElection(e.target.value)
    }

    const handleModification = async (e) => {
        e.preventDefault()
        await updateElection(election.idElection, titreElection, (dateDebutElection + " " + heureDebut), (dateFinElection + " " + heureFin), descriptionElection)
        window.location.replace('/elections')
    }

    return (
        <div style={styles.electionDiv}>

            { (currentUser.idElecteur !== undefined && currentUser.idElecteur !== "") &&
                <div>
                    <h2 style={styles.secondTitle}>{election.titreElection}</h2>
                    <p>Description : {election.descriptionElection}</p>
                    Date de début : {election.dateDebutElection} <br/>
                    Date de fin : {election.dateFinElection}<br/>
                </div>
            }

            {(currentUser.idAdmin !== undefined && currentUser.idAdmin !== "") &&
                <div>
                    <form onSubmit={handleModification}>
                        <label className="update-election-label" style={styles.label}>Titre de l'élection : </label>
                        <span style={styles.span}><input type="text" className="update-election-input" value={titreElection} style={styles.input} onChange={handleTitreOnChange} required /></span>

                        <label className="update-election-label" style={styles.label}>Description de l'élection : </label>
                        <textarea id="descriptionElection" type="text" className="update-election-input" style={styles.textArea} onChange={handleDescriptionOnChange} required value={descriptionElection}></textarea>

                        <label className="update-election-label" style={styles.label}>Date de début : </label>
                        <span style={styles.span}><input type="date" max="9999-12-31" className="update-election-input" value={dateDebutElection} style={styles.input} onChange={handleDateDebutOnChange} required /></span>

                        <label className="add-election-label" style={styles.label}>Heure de début : </label>
                        <span style={styles.span}><input type="time" className="update-election-input" value={heureDebut} style={styles.input} onChange={handleHeureDebutOnChange} required /></span>

                        <label className="update-election-label" style={styles.label}>Date de fin : </label>
                        <span style={styles.span}><input type="date" max="9999-12-31" className="update-election-input" value={dateFinElection} style={styles.input} onChange={handleDateFinOnChange} required /></span>

                        <label className="add-election-label" style={styles.label}>Heure de fin : </label>
                        <span style={styles.span}><input type="time" className="update-election-input" value={heureFin} style={styles.input} onChange={handleHeureFinOnChange} required /></span>

                        <input type="submit" className="update-election-submit" style={styles.submit} key="btnSubmitElection" value="Modifier" />
                    </form>

                    <Link to={{ pathname: `/elections`}} >
                        <button key={"Annuler"} style={Object.assign({},styles.btn, styles.blue)}>Annuler </button>
                    </Link>
                </div>
            }

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
    },
    label: {
        float: "left",
        height: "50px",
        lineHeight: "50px",
        textAlign: "center",
        verticalAlign: "middle",
        '@media (max-width: 640px)': {
            float: "none",
            lineHeight: "30px",
        }
    },
    input: {
        border: "1px solid #E5E5E5",
        padding: "15px",
        width: "100%",
        height: "50px",
        marginBottom: "10px"
    },
    submit: {
        backgroundColor: "#0B6BA8",
        border: "none",
        color: "white",
        padding: "15px",
        textDecoration: "none",
        cursor: "pointer",
        width: "200px",
        float: "right",
        margin: "0px 0px 10px 10px",
        ':hover': {
            backgroundColor: "#074E7B",
            transition: "0.2s"
        },
        '@media (max-width: 960px)': {
            width: "100%",
            marginBottom: "10px"
        },
    },
    button: {
        backgroundColor: "#0B6BA8",
        border: "none",
        color: "white",
        padding: "15px",
        textDecoration: "none",
        cursor: "pointer",
        width: "200px",
        float: "right",
        ':hover': {
            backgroundColor: "#074E7B",
            transition: "0.2s"
        },
        '@media (max-width: 960px)': {
            width: "100%"
        }
    },
    span: {
        display: "block",
        overflow: "hidden",
        paddingLeft: "15px",
        '@media (max-width: 640px)': {
            paddingLeft: "0px"
        }
    },
    textArea: {
        resize: "none",
        border: "1px solid #E5E5E5",
        padding: "15px",
        width: "100%",
        height: "200px",
        marginBottom: "10px"
    },
    btn: {
        font: "400 13.3333px Arial",
        textAlign: "center",
        textDecoration: "none",
        minWidth: "200px",
        padding: "15px",
        border: "none",
        color: "white",
        cursor: "pointer",        
        float: "right",
        marginTop: "15px",
        ':hover':{
            backgroundColor: "#074E7B",
            transition: "0.2s"
        }
    },
    blue : {
        backgroundColor: "#0B6BA8"
    },
}

export default Radium(ElectionResults)
