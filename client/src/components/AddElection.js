import { useState } from 'react';
import arrow from '../img/down-arrow.svg';
import Radium from 'radium';

const AddElection = ({ onAddElection }) => {

    const [titreElection, setElectionTitle] = useState("")
    const [dateDebut, setDateDebut] = useState("")
    const [dateFin, setDateFin] = useState("")
    const [descriptionElection, setDescriptionElection] = useState("")
    const [electionType, setElectionType] = useState("")

    const [nomRegion, setNomRegion] = useState("")
    const [codeDepartement, setCodeDepartement] = useState("")
    const [codePostal, setCodePostal] = useState("")

    const handleChange = (e) => {
        if(electionType !== undefined) {
            setElectionType(e.target.value)
            var inputs = document.getElementsByClassName("add-election-input")
            for (var i=0; i<inputs.length; i++) {
                inputs[i].value="";
            }
        }
        
    }
    const handleRegionOnChange = (e) => {
        setNomRegion(e.target.value)
    }
    const handleDepartementOnChange = (e) => {
        setCodeDepartement(e.target.value)
    }
    const handleCodePostalOnChange = (e) => {
        setCodePostal(e.target.value)
    }
    const handleTitreOnChange = (e) => {
        setElectionTitle(e.target.value)
    }
    const handleDateDebutOnChange = (e) => {
        setDateDebut(e.target.value)
        console.log(dateDebut)
    }
    const handleDateFinOnChange = (e) => {
        setDateFin(e.target.value)
        console.log(dateFin)
    }
    const handleDescriptionOnChange = (e) => {
        setDescriptionElection(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await onAddElection(titreElection, dateDebut, dateFin, descriptionElection, electionType, nomRegion, codeDepartement, codePostal)
    }

    return (
        <div>
            <h1 className="add-election-title" style={styles.mainTitle}>Ajouter une nouvelle élection</h1>
            <form onSubmit={handleSubmit}>
                <label className="add-election-label">Type de l'élection : 
                <select id="electionType" value={electionType.value} defaultValue={""} onChange={handleChange} style={styles.select}>
                    <optgroup style={styles.option}>
                    <option value="">Sélectionner un type</option>
                    <option value="election_nationale">Election nationale</option>
                    <option value="election_regionale">Election régionale</option>
                    <option value="election_departementale">Election départementale</option>
                    <option value="election_municipale">Election municipale</option>
                    </optgroup>
                </select>
                </label>

                {electionType !== "" &&
                    <div style={styles.divForm}>
                        {electionType === "election_regionale" &&
                            <div>
                            <label className="add-election-label" style={styles.label}>Nom de la région : </label>
                            <span style={styles.span}><input type="text" className="add-election-input" style={styles.input} onBlur={handleRegionOnChange} required /></span>
                            </div>
                        }

                        {electionType === "election_departementale" &&
                            <div>
                            <label className="add-election-label" style={styles.label}>Code du département : </label>
                            <span style={styles.span}><input type="text" className="add-election-input" style={styles.input} onBlur={handleDepartementOnChange} required /></span>
                            </div>
                        }

                        {electionType === "election_municipale" &&
                            <div>
                            <label className="add-election-label" style={styles.label}>Code postal : </label>
                            <span style={styles.span}><input type="text" className="add-election-input" style={styles.input} onBlur={handleCodePostalOnChange} required /></span>
                            </div>
                        }
                       
                        <label className="add-election-label" style={styles.label}>Titre de l'élection : </label>
                        <span style={styles.span}><input type="text" className="add-election-input" style={styles.input} onBlur={handleTitreOnChange} required /></span>
                        
                        <label className="add-election-label" style={styles.label}>Date de début : </label>
                        <span style={styles.span}><input type="date" className="add-election-input" style={styles.input} onBlur={handleDateDebutOnChange} required /></span>
                        
                        <label className="add-election-label" style={styles.label}>Date de fin : </label>
                        <span style={styles.span}><input type="date" className="add-election-input" style={styles.input} onBlur={handleDateFinOnChange} required /></span>
                        

                        <label className="add-election-label" style={styles.label}>Description de l'élection : </label>
                        <textarea type="text" className="add-election-input" style={styles.textArea} onBlur={handleDescriptionOnChange} required></textarea>
                
                        <input type="submit" className="add-election-submit" style={styles.submit} value="Ajouter" />
                    </div>
                    
                }
            </form>
            <hr style={styles.rounded}></hr>
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
    select: {
        WebkitAppearance: "none",
        MozAppearance: "none",
        border: "1px solid #E5E5E5",
        padding: "15px",
        marginLeft: "15px",
        backgroundColor : "#ffffff",
        backgroundImage : "url("+arrow+")",
        backgroundRepeat : "no-repeat",
        backgroundPosition : "95%",
        backgroundSize : "15px",
        transition: "0.5s",
        fontFamily: "Open Sans",
        '@media (min-width: 640px)': { 
            fontSize: "1rem"
        },
        '@media (min-width: 960px)': { 
            fontSize: "1rem"
        },
        '@media (min-width: 1100px)': { 
            fontSize: "1.5rem"
        },
        ':hover': {
            border: "1px solid #0B6BA8",
        },
        ':focus': {
            border: "1px solid #0B6BA8",
        }
    },
    option: {
        fontFamily: "Open Sans",
        '@media (min-width: 640px)': { 
            fontSize: "1rem"
        },
        '@media (min-width: 960px)': { 
            fontSize: "1rem"
        },
        '@media (min-width: 1100px)': { 
            fontSize: "1.5rem"
        }
    },
    divForm: {
        backgroundColor: "white",
        padding: "40px 40px 70px 40px",
        boxShadow: "0 0 10px #999",
        margin: "20px 0px 20px 0px"
    },
    rounded: {
        borderTop: "5px solid #0B6BA8",
        margin: "50px",
        borderRadius: "5px"
    },
    label: {
        float: "left",
        height: "50px",
        lineHeight: "50px",
        textAlign: "center",
        verticalAlign: "middle",
        '@media (max-width: 400px)': { 
            float: "none"
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
        minWidth: "200px",
        float: "right"
    },
    span: {
        display: "block",
        overflow: "hidden",
        paddingLeft: "15px",
        '@media (max-width: 400px)': { 
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
    }
}

export default Radium(AddElection)