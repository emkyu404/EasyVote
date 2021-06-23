import { useState } from 'react'

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
        <form onSubmit={handleSubmit} style={styles.formStyle}>
            <h2 className="add-election-title">Ajouter une nouvelle élection</h2>

            <label className="add-election-label" style={styles.addElectionLabel}>Type de l'élection : 
                <select id="electionType" value={electionType.value} defaultValue={""} onChange={handleChange}>
                    <option value="">Sélectionner un type</option>
                    <option value="election_nationale">Election nationale</option>
                    <option value="election_regionale">Election régionale</option>
                    <option value="election_departementale">Election départementale</option>
                    <option value="election_municipale">Election municipale</option>
                </select>
            </label>

            {electionType !== "" &&
                <div>
                    {electionType === "election_regionale" &&
                        <label className="add-election-label" style={styles.addElectionLabel}>Nom de la région : 
                            <input type="text" className="add-election-input" style={styles.addElectionInput} onBlur={handleRegionOnChange} required />
                        </label>
                    }

                    {electionType === "election_departementale" &&
                        <label className="add-election-label" style={styles.addElectionLabel}>Code du département : 
                            <input type="text" className="add-election-input" style={styles.addElectionInput} onBlur={handleDepartementOnChange} required />
                        </label>
                    }

                    {electionType === "election_municipale" &&
                        <label className="add-election-label" style={styles.addElectionLabel}>Code postal : 
                            <input type="text" className="add-election-input" style={styles.addElectionInput} onBlur={handleCodePostalOnChange} required />
                        </label>
                    }

                    <label className="add-election-label" style={styles.addElectionLabel}>Titre de l'élection : 
                        <input type="text" className="add-election-input" style={styles.addElectionInput} onBlur={handleTitreOnChange} required />
                    </label>

                    <label className="add-election-label" style={styles.addElectionLabel}>Date de début : 
                        <input type="date" className="add-election-input" style={styles.addElectionInput} onBlur={handleDateDebutOnChange} required />
                    </label>

                    <label className="add-election-label" style={styles.addElectionLabel}>Date de fin : 
                        <input type="date" className="add-election-input" style={styles.addElectionInput} onBlur={handleDateFinOnChange} required />
                    </label>

                    <label className="add-election-label" style={styles.addElectionLabel}>Description de l'élection : 
                        <textarea type="text" className="add-election-input" style={styles.addElectionTextarea} onBlur={handleDescriptionOnChange} required></textarea>
                    </label>

                    <input type="submit" className="add-election-submit" style={styles.addElectionSubmit} value="Ajouter" />
                </div>
            }
        </form>
    )
}

const styles = {
    formStyle: {

    },
    addElectionLabel: {

    },
    addElectionInput: {

    },
    addElectionSubmit: {

    },
    addElectionTextarea: {

    }
}

export default AddElection