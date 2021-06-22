import { useState } from 'react'

const AddElection = () => {

    const [electionType, setElectionType] = useState("")

    const handleChange = (e) => {
        if(electionType !== undefined) {
            setElectionType(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(electionType)
        // AJOUTER LA FONCTION BACK
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="add-election-title">Ajouter une nouvelle élection</h2>

            <label className="add-election-label" style={addElectionLabel}>Type de l'élection : 
                <select id="electionType" value={electionType.value} defaultValue={""} onChange={handleChange}>
                    <option value="" selected="selected">Sélectionner un type</option>
                    <option value="election_nationale">Election nationale</option>
                    <option value="election_regionale">Election régionale</option>
                    <option value="election_departementale">Election départementale</option>
                    <option value="election_municipale">Election municipale</option>
                </select>
            </label>

            {electionType !== "" &&
                <div>
                    {electionType === "election_regionale" &&
                        <label className="add-election-label" style={addElectionLabel}>Nom de la région : 
                            <input type="text" className="add-election-input" style={addElectionInput} required />
                        </label>
                    }

                    {electionType === "election_departementale" &&
                        <label className="add-election-label" style={addElectionLabel}>Code du département : 
                            <input type="text" className="add-election-input" style={addElectionInput} required />
                        </label>
                    }

                    {electionType === "election_municipale" &&
                        <label className="add-election-label" style={addElectionLabel}>Code postal : 
                            <input type="text" className="add-election-input" style={addElectionInput} required />
                        </label>
                    }

                    <label className="add-election-label" style={addElectionLabel}>Titre de l'élection : 
                        <input type="text" className="add-election-input" style={addElectionInput} required />
                    </label>

                    <label className="add-election-label" style={addElectionLabel}>Date de début : 
                        <input type="date" className="add-election-input" style={addElectionInput} required />
                    </label>

                    <label className="add-election-label" style={addElectionLabel}>Date de fin : 
                        <input type="date" className="add-election-input" style={addElectionInput} required />
                    </label>

                    <label className="add-election-label" style={addElectionLabel}>Description de l'élection : 
                        <textarea type="text" className="add-election-input" style={addElectionInput} required></textarea>
                    </label>

                    <input type="submit" className="add-election-submit" style={addElectionSubmit} value="Ajouter" />
                </div>
            }
        </form>
    )
}

const addElectionLabel = {}

const addElectionInput = {}

const addElectionSubmit = {}

export default AddElection