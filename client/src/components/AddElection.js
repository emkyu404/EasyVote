import { useState, useEffect } from 'react';
import arrow from '../img/down-arrow.svg';
import Radium from 'radium';

import FileReaderAddElection from './FileReaderAddElection'


const AddElection = ({ addCandidat, onAddElection, idElection, pageTitle}) => {
    useEffect(() => {
        document.title = pageTitle
    }, [pageTitle])

    useEffect(() => {
        listeCandidats.forEach(
            candidat => addCandidat(candidat.titreCandidat, candidat.descriptionCandidat, candidat.urlCandidat)
        )
    }, [idElection])

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

    const [listeCandidats, setListeCandidats] = useState([])
    
    const handleChange = (e) => {
        if (electionType !== undefined) {
            setElectionType(e.target.value)
            var inputs = document.getElementsByClassName("add-election-input")
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].value = "";
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

    const onFileRead = (electionObj, candidatsArray) => {
        try {
            // Changement des informations de l'élection
            document.getElementById('electionType').value = electionObj.electionType
            setElectionType(electionObj.electionType)
            document.getElementById('electionTitle').value = electionObj.titreElection
            setElectionTitle(electionObj.titreElection)
            switch (electionObj.electionType) {
                case 'election_nationale': break;
                case 'election_municipale': document.getElementById('codePostalElection').value = electionObj.codePostal; setCodePostal(electionObj.codePostal); break;
                case 'election_departementale': document.getElementById('codeDepartementElection').value = electionObj.codeDepartement; setCodeDepartement(electionObj.codeDepartement); break;
                case 'election_regionale': document.getElementById('regionElection').value = electionObj.nomRegion; setNomRegion(electionObj.nomRegion); break;
                default: throw 'Erreur';
            }
            document.getElementById('dateDebut').valueAsDate = getDateObjFromString(electionObj.dateDebutElection)
            setDateDebutElection(electionObj.dateDebutElection)
            document.getElementById('dateFin').valueAsDate = getDateObjFromString(electionObj.dateFinElection)
            setDateFinElection(electionObj.dateFinElection)
            document.getElementById('descriptionElection').value = electionObj.descriptionElection
            setDescriptionElection(electionObj.descriptionElection)

            //Changement des informations de la liste des candidats
            setListeCandidats([...listeCandidats].concat(candidatsArray))
        } catch (e) {
            console.log(e)
        }
    }

    function getDateObjFromString(string) {
        var dateTab = string.split('-')
        var newDate = new Date()
        newDate.setFullYear(dateTab[0])
        newDate.setMonth(dateTab[1])
        newDate.setDate(dateTab[2])
        return newDate
    }

    function resetFormCandidat() {
        setCandidatTitle("")
        setDescriptionCandidat("")
        setUrlCandidat("")
        document.getElementById("add-candidat-form").reset()
    }

    function resetFormElection() {
        setElectionTitle("")
        setDateDebutElection("")
        setDateFinElection("")
        setDescriptionElection("")
        setElectionType("")

        setNomRegion("")
        setCodeDepartement("")
        setCodePostal("")
        setListeCandidats([])
        document.getElementById("add-election-form").reset()
    }

    const handleOnAddCandidat = (e) => {
        e.preventDefault()

        var newCandidat = {
            titreCandidat: titreCandidat,
            descriptionCandidat: descriptionCandidat,
            urlCandidat: urlCandidat
        }

        const idx = listeCandidats.findIndex(c => c.titreCandidat === newCandidat.titreCandidat)

        if(idx !== -1 || newCandidat.titreCandidat === "") {
            console.log("candidat doublon")
        } else {
            listeCandidats.push(newCandidat)
        }

        resetFormCandidat()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        var heureDebut = document.getElementById("heureDebut").value
        var heureFin = document.getElementById("heureFin").value

        if (listeCandidats.length >= 2) {
            await onAddElection(titreElection, (dateDebutElection + " " + heureDebut), (dateFinElection + " " + heureFin), descriptionElection, electionType, nomRegion, codeDepartement, codePostal)
            resetFormElection()
        }
        else {
            alert('Ajouter au moins 2 candidats')
        }
        e.target.reset()
    }

    function btnFunction() {
        document.getElementById("myModal").style.display = "block";
    }

    function spanFunction() {
        document.getElementById("myModal").style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == document.getElementById("myModal")) {
            document.getElementById("myModal").style.display = "none";
        }
    }

    return (
        <div>
            <h1 className="add-election-title" style={styles.mainTitle}>Ajouter une nouvelle élection</h1>
            <form id="add-election-form" onSubmit={handleSubmit}>
                <label className="add-election-label" style={styles.selectLabel}>Type de l'élection :</label>
                <select id="electionType" value={electionType.value} defaultValue={""} onChange={handleChange} style={styles.select}>
                    <optgroup style={styles.option}>
                        <option key={0} value="">Sélectionner un type</option>
                        <option key={1} value="election_nationale">Election nationale</option>
                        <option key={2} value="election_regionale">Election régionale</option>
                        <option key={3} value="election_departementale">Election départementale</option>
                        <option key={4} value="election_municipale">Election municipale</option>
                    </optgroup>
                </select>
                

                {electionType !== "" &&
                    <div style={styles.divForm}>
                        {electionType === "election_regionale" &&
                            <div>
                                <label className="add-election-label" style={styles.label}>Nom de la région : </label>
                                <span style={styles.span}><input id="regionElection" type="text" className="add-election-input" style={styles.input} onChange={handleRegionOnChange} required value={nomRegion} /></span>
                            </div>
                        }

                        {electionType === "election_departementale" &&
                            <div>
                                <label className="add-election-label" style={styles.label}>Code du département : </label>
                                <span style={styles.span}><input id="codeDepartementElection" type="text" className="add-election-input" style={styles.input} onChange={handleDepartementOnChange} required value={codeDepartement} /></span>
                            </div>
                        }

                        {electionType === "election_municipale" &&
                            <div>
                                <label className="add-election-label" style={styles.label}>Code postal : </label>
                                <span style={styles.span}><input id="codePostalElection" type="text" className="add-election-input" style={styles.input} onChange={handleCodePostalOnChange} required value={codePostal}/></span>
                            </div>
                        }

                        <label className="add-election-label" style={styles.label}>Titre de l'élection : </label>
                        <span style={styles.span}><input id="electionTitle" type="text" className="add-election-input" style={styles.input} onChange={handleTitreOnChange} required value={titreElection} /></span>

                        <label className="add-election-label" style={styles.label}>Date de début : </label>
                        <span style={styles.span}><input id="dateDebut" type="date" className="add-election-input" style={styles.input} onChange={handleDateDebutOnChange} required value={dateDebutElection} /></span>
                        
                        <label className="add-election-label" style={styles.label}>Heure de début : </label>
                        <span style={styles.span}><input id="heureDebut" type="time" className="add-election-input" style={styles.input} required /></span>
                        
                        <label className="add-election-label" style={styles.label}>Date de fin : </label>
                        <span style={styles.span}><input id="dateFin" type="date" className="add-election-input" style={styles.input} onChange={handleDateFinOnChange} required value={dateFinElection}/></span>
                        
                        <label className="add-election-label" style={styles.label}>Heure de fin : </label>
                        <span style={styles.span}><input id="heureFin" type="time" className="add-election-input" style={styles.input} required /></span>

                        <label className="add-election-label" style={styles.label}>Description de l'élection : </label>
                        <textarea id="descriptionElection" type="text" className="add-election-input" style={styles.textArea} onChange={handleDescriptionOnChange} required value={descriptionElection}></textarea>

                        <input type="submit" className="add-election-submit" style={styles.submit} key="btnSubmitElection" value="Ajouter" />
                        <button type="button" id="myBtn" style={styles.button} key="btnModalOpen" onClick={() => btnFunction()}>Ajouter un candidat</button>
                        {listeCandidats.map((candidat) => <div key={candidat.titreCandidat}> {candidat.titreCandidat} </div>)}

                    </div>
                }
            </form>
            <form id="add-candidat-form" onSubmit={handleOnAddCandidat}>
                <div id="myModal" className="modal" style={styles.modal}>
                    <div className="modalContent" style={styles.modalContent}>
                        <span className="close" onClick={() => spanFunction()} style={styles.close} key="btnModalClose">&times;</span>
                        <h1 className="add-candidat-title" style={styles.mainTitle}>Ajouter un candidat</h1>

                        <label className="add-candidat-label" style={styles.label}>Titre du candidat : </label>
                        <span style={styles.span}><input type="text" id="input-titre-candidat" className="add-candidat-input" style={styles.input} onChange={handleTitreCandidatOnChange} required /></span>

                        <label className="add-candidat-label" style={styles.label}>Description du candidat : </label>
                        <textarea type="text" id="input-description-candidat" className="add-candidat-input" style={styles.textArea} onChange={handleDescriptionCandidatOnChange} ></textarea>

                        <label className="add-candidat-label" style={styles.label}>URL de l'image candidat : </label>
                        <span style={styles.span}><input type="text" id="input-url-candidat" className="add-candidat-input" style={styles.input} onChange={handleUrlOnChange} /></span>           

                        <input type="submit" className="add-candidat-button" style={styles.button} key="btnSubmitCandidat" value="Ajouter un candidat" />
                    </div>
                </div>
            </form>
            <FileReaderAddElection onFileRead={onFileRead} />
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
    selectLabel: {
        marginRight: "15px",
        lineHeight: "30px",
    },
    select: {
        WebkitAppearance: "none",
        MozAppearance: "none",
        border: "1px solid #E5E5E5",
        padding: "15px",
        backgroundColor: "#ffffff",
        backgroundImage: "url(" + arrow + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "95%",
        backgroundSize: "15px",
        transition: "0.5s",
        fontFamily: "Open Sans",
        '@media (min-width: 640px)': {
            fontSize: "1rem"
        },
        '@media (min-width: 960px)': {
            fontSize: "1rem"
        },
        '@media (min-width: 1100px)': {
            fontSize: "1rem"
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
            fontSize: "1rem"
        }
    },
    divForm: {
        backgroundColor: "white",
        padding: "40px 40px 70px 40px",
        boxShadow: "0 0 10px #999",
        margin: "20px 0px 20px 0px",
        '@media (max-width: 960px)':{
            padding: "40px 40px 120px 40px",
        },
        '@media (max-width: 640px)': { 
            padding: "20px 20px 120px 20px"
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
        '@media (max-width: 960px)':{
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
    inputIdElection: {
        display: "none"
    },
    modal: {
        display: "none",
        position: "fixed",
        zIndex: "100",
        paddingTop: "100px",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "rgb(0,0,0)",
        backgroundColor: "rgba(0,0,0,0.4)"
    },
    modalContent: {
        backgroundColor: "white",
        margin: "auto",
        padding: "40px 40px 70px 40px",
        border: "1px solid #888",
        width: "calc(80% - 50px)",
        '@media (max-width: 640px)': { 
            padding: "20px 20px 70px 20px",
            width: "calc(100% - 50px)",
        }
    },
    close: {
        color: "#aaaaaa",
        float: "right",
        fontSize: "28px",
        fontWeight: "bold",
        ':hover': {
            color: "#000",
            textdecoration: "none",
            cursor: "pointer"
        },
        ':focus': {
            color: "#000",
            textDecoration: "none",
            cursor: "pointer"
        }
    }
}

export default Radium(AddElection)