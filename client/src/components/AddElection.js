import { useState } from 'react';
import arrow from '../img/down-arrow.svg';
import Radium from 'radium';

const AddElection = ({ idElection, getIdElection, onAddCandidat, onAddElection }) => {

    const [titreElection, setElectionTitle] = useState("")
    const [dateDebutElection, setDateDebutElection] = useState("")
    const [dateFinElection, setDateFinElection] = useState("")
    const [descriptionElection, setDescriptionElection] = useState("")
    const [electionType, setElectionType] = useState("")

    const [nomRegion, setNomRegion] = useState("")
    const [codeDepartement, setCodeDepartement] = useState("")
    const [codePostal, setCodePostal] = useState("")

    const [titreCandidat, setCandidatTitle] = useState("")
    const [descriptionCandidat, setDescriptionCandidat] = useState("")
    const [urlCandidat, setUrlCandidat] = useState("")

    const [showAddCandidat, setShowAddCandidat] = useState(false)
    const [listeCandidats, setListeCandidats] = useState([])

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
        setDateDebutElection(e.target.value)
    }
    const handleDateFinOnChange = (e) => {
        setDateFinElection(e.target.value)
    }
    const handleDescriptionOnChange = (e) => {
        setDescriptionElection(e.target.value)
    }

    const handleTitreCandidatOnChange = (e) => {
        setCandidatTitle(e.target.value)
    }

    const handleUrlOnChange = (e) => {
        setUrlCandidat(e.target.value)
    }

    const handleDescriptionCandidatOnChange = (e) => {
        setDescriptionCandidat(e.target.value)
    }

    const handleOnClickShow = (e) => {
        e.preventDefault()
        setShowAddCandidat(!showAddCandidat)
    }

    function containsObject(obj, list) {
        var x;
        for (x in list) {
            if (list.hasOwnProperty(x) && list[x] === obj) {
                return true;
            }
        }
        return false;
    }

    const handleOnAddCandidat = (e) => {
        e.preventDefault()

        const newCandidat = {
            titreCandidat: titreCandidat,
            descriptionCandidat: descriptionCandidat,
            urlCandidat: urlCandidat
        }

        if(listeCandidats.indexOf(newCandidat) === -1) {
            setListeCandidats([...listeCandidats].concat(newCandidat))
        }
        setCandidatTitle("")
        setDescriptionCandidat("")
        setUrlCandidat("")
        setShowAddCandidat(false)
        
    }

    const addCandidat = async (e, titreCandidat, descriptionCandidat, urlCandidat, idElection) => {
        e.preventDefault()
        await onAddCandidat(titreCandidat, descriptionCandidat, urlCandidat, idElection)
    }

    // A REGLER (NE RECUPERE PAS L ID ELECTION IMMEDIATEMENT, DOIT VALIDER 2 FOIS LE FORM)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(listeCandidats.length >= 2) {
            await onAddElection(titreElection, dateDebutElection, dateFinElection, descriptionElection, electionType, nomRegion, codeDepartement, codePostal, titreElection, dateDebutElection, dateFinElection);
            await getIdElection(titreElection, dateDebutElection, dateFinElection);

            listeCandidats.forEach(
                candidat => addCandidat(e, candidat.titreCandidat, candidat.descriptionCandidat, candidat.urlCandidat, idElection)
            )
            
            alert("Ajout")
        }
        else {
            alert('Ajouter au moins 2 candidats')
        }
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
                
                        {/* Ajouter un candidat */}
                        {!showAddCandidat &&
                            <input type="button" className="add-candidat-button" style={styles.button} onClick={handleOnClickShow} value="Ajouter un candidat" />
                        }

                        {showAddCandidat &&
                            <input type="button" className="add-candidat-button" style={styles.button} onClick={handleOnClickShow} value="Annuler" />
                        }

                        {showAddCandidat && 
                            <div>
                                <h1 className="add-candidat-title" style={styles.mainTitle}>Ajouter un candidat</h1>

                                <label className="add-candidat-label" style={styles.label}>Titre du candidat : </label>
                                <span style={styles.span}><input type="text" className="add-candidat-input" style={styles.input} onBlur={handleTitreCandidatOnChange} required /></span>    

                                <label className="add-candidat-label" style={styles.label}>Description du candidat : </label>
                                <textarea type="text" className="add-candidat-input" style={styles.textArea} onBlur={handleDescriptionCandidatOnChange} required></textarea>

                                <label className="add-candidat-label" style={styles.label}>URL de l'image candidat : </label>
                                <span style={styles.span}><input type="text" className="add-candidat-input" style={styles.input} onBlur={handleUrlOnChange} required /></span>           

                                {(titreCandidat !== "" && descriptionCandidat !== "" && urlCandidat !== "") &&
                                    <input type="button" className="add-candidat-button" style={styles.button} onClick={handleOnAddCandidat} value="Ajouter un candidat" />
                                }
                            </div>
                        }
                        {/* Fin ajouter un candidat */}

                        {listeCandidats.map((candidat) => <div> {candidat.titreCandidat} </div> )}

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
    button: {
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

export default Radium(AddElection)