import { useState } from 'react'

const AddCandidat = ({ onAddCandidat, idElectionChoisi }) => {

    const [titreCandidat, setCandidatTitle] = useState("")
    const [descriptionCandidat, setDescriptionCandidat] = useState("")
    const [urlCandidat, setUrlCandidat] = useState("")

    const handleTitreOnChange = (e) => {
        setCandidatTitle(e.target.value)
    }

    const handleUrlOnChange = (e) => {
        setUrlCandidat(e.target.value)
    }

    const handleDescriptionOnChange = (e) => {
        setDescriptionCandidat(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await onAddCandidat(titreCandidat, descriptionCandidat, urlCandidat, idElectionChoisi)
    }

    return (
        <div>
            <h1 className="add-candidat-title" style={styles.mainTitle}>Ajouter une nouvelle élection</h1>
            <form onSubmit={handleSubmit} style={styles.formStyle}>

                <label className="add-candidat-label" style={styles.label}>Titre du candidat : </label>
                <span style={styles.span}><input type="text" className="add-candidat-input" style={styles.input} onBlur={handleTitreOnChange} required /></span>    

                <label className="add-candidat-label" style={styles.label}>Description du candidat : </label>
                <textarea type="text" className="add-candidat-input" style={styles.textArea} onBlur={handleDescriptionOnChange} required></textarea>

                <label className="add-candidat-label" style={styles.label}>URL de l'image candidat : </label>
                <span style={styles.span}><input type="text" className="add-candidat-input" style={styles.input} onBlur={handleUrlOnChange} required /></span>           

                <input type="submit" className="add-candidat-submit" style={styles.submit} value="Ajouter" />
            </form>
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
    divForm: {
        backgroundColor: "white",
        padding: "40px 40px 70px 40px",
        boxShadow: "0 0 10px #999",
        margin: "20px 0px 20px 0px",
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
    },
    inputIdElection: {
        display: "none"
    }
}

export default AddCandidat
