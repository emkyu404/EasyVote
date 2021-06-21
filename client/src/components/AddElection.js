import { useState } from 'react'

const AddElection = () => {

    const [electionType, setElectionType] = useState("")

    const handleChange = (e) => {
        if(electionType !== "null") {
            setElectionType(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(electionType)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Ajouter une nouvelle élection</h2>

            <label className="add-election-label" style={addElectionLabel}>Type de l'élection : 
                <select id="electionType" value={electionType.value} defaultValue={"null"} onChange={handleChange}>
                    <option value="">Sélectionner un type</option>
                    <option value="election_nationale">Election nationale</option>
                    <option value="election_regionale">Election régionale</option>
                    <option value="election_departementale">Election départementale</option>
                    <option value="election_municipale">Election municipale</option>
                </select>
            </label>

            {/* if elections */}
            <label className="add-election-label" style={addElectionLabel}>Titre de l'élection : 
                <input type="text" required />
            </label>

            <label className="add-election-label" style={addElectionLabel}>Titre de l'élection : 
                <input type="text" required />
            </label>

            <label className="add-election-label" style={addElectionLabel}>Date de début : 
                <input type="date" required />
            </label>

            <label className="add-election-label" style={addElectionLabel}>Date de fin : 
                <input type="date" required />
            </label>

            <label className="add-election-label" style={addElectionLabel}>Description de l'élection : 
                <textarea type="text" required></textarea>
            </label>

            <input type="submit" value="Ajouter" />
        </form>
    )
}

const addElectionLabel = {}

export default AddElection