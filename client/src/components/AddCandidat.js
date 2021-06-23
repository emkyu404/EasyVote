import { useState } from 'react'

const AddCandidat = () => {

    const handleSubmit = async (e) => {
        e.preventDefault()
        // await onAddElection(titreElection, dateDebut, dateFin, descriptionElection, electionType, nomRegion, codeDepartement, codePostal)
    }

    return (
        <form onSubmit={handleSubmit} style={styles.formStyle}>

            <input type="submit" className="add-election-submit" style={addElectionSubmit} value="Ajouter" />  
        </form>
    )
}

const styles = {
    formStyle: {

    },
    addCandidatLabel: {

    },
    addCandidatInput: {

    },
    addCandidatSubmit: {

    },
    addCandidatTextarea: {

    }
}

export default AddCandidat
