import { useState, useEffect } from 'react';
import arrow from '../img/down-arrow.svg';
import Radium from 'radium';

import FileReaderAddElection from './FileReaderAddElection'


const AddElection = ({addCandidat, onAddElection, idElection }) => {

    useEffect(()=>{
        listeCandidats.forEach(
            candidat => addCandidat(candidat.titreCandidat, candidat.descriptionCandidat, candidat.urlCandidat)
        )
      },[idElection])

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

    const onFileRead = (electionObj, candidatsArray) => {

        // Changement des informations de l'élection
        document.getElementById('electionType').value=electionObj.electionType
        setElectionType(electionObj.electionType)
        document.getElementById('electionTitle').value=electionObj.titreElection
        setElectionTitle(electionObj.titreElection)

        //Changement des informations de la liste des candidats
        setListeCandidats([...listeCandidats].concat(candidatsArray))
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

    function resetFormCandidat() {
        setCandidatTitle("")
        document.getElementById("input-titre-candidat").value = ""
        setDescriptionCandidat("")
        document.getElementById("input-description-candidat").value = ""
        setUrlCandidat("")
        document.getElementById("input-url-candidat").value = ""
        spanFunction()
    }

    const handleOnAddCandidat = (e) => {
        e.preventDefault()

        const newCandidat = {
            titreCandidat: titreCandidat,
            descriptionCandidat: descriptionCandidat,
            urlCandidat: urlCandidat
        }

        setListeCandidats([...listeCandidats].concat(newCandidat))
        resetFormCandidat()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(listeCandidats.length >= 0) {        // Remettre à 2
            await onAddElection(titreElection, dateDebutElection, dateFinElection, descriptionElection, electionType, nomRegion, codeDepartement, codePostal)
            listeCandidats.forEach(
                candidat => addCandidat(candidat.titreCandidat, candidat.descriptionCandidat, candidat.urlCandidat)
            )
        }
        else {
            alert('Ajouter au moins 2 candidats')
        }
    }

    function btnFunction() {
        document.getElementById("myModal").style.display = "block";
    }

    function spanFunction() {
        document.getElementById("myModal").style.display = "none";
    }

    // window.onclick = function(event) {
    // if (event.target == document.getElementById("myModal")) {
    //     document.getElementById("myModal").style.display = "none";
    // }
    // }

    return (
        <div>
            <h1 className="add-election-title" style={styles.mainTitle}>Ajouter une nouvelle élection</h1>
            <form onSubmit={handleSubmit}>
                <label className="add-election-label">Type de l'élection : 
                <select id="electionType" value={electionType.value} defaultValue={""} onChange={handleChange} style={styles.select}>
                    <optgroup style={styles.option}>
                        <option key={0} value="">Sélectionner un type</option>
                        <option key={1} value="election_nationale">Election nationale</option>
                        <option key={2} value="election_regionale">Election régionale</option>
                        <option key={3} value="election_departementale">Election départementale</option>
                        <option key={4} value="election_municipale">Election municipale</option>
                    </optgroup>
                </select>
                </label>

                {electionType !== "" &&
                    <div style={styles.divForm}>
                        {electionType === "election_regionale" &&
                            <div>
                            <label className="add-election-label" style={styles.label}>Nom de la région : </label>
                            <span style={styles.span}><input id="regionElection" type="text" className="add-election-input" style={styles.input} onBlur={handleRegionOnChange} required /></span>
                            </div>
                        }

                        {electionType === "election_departementale" &&
                            <div>
                            <label className="add-election-label" style={styles.label}>Code du département : </label>
                            <span style={styles.span}><input id="codeDepartementElection" type="text" className="add-election-input" style={styles.input} onBlur={handleDepartementOnChange} required /></span>
                            </div>
                        }

                        {electionType === "election_municipale" &&
                            <div>
                            <label className="add-election-label" style={styles.label}>Code postal : </label>
                            <span style={styles.span}><input id="codePostalElection" type="text" className="add-election-input" style={styles.input} onBlur={handleCodePostalOnChange} required /></span>
                            </div>
                        }
                       
                        <label className="add-election-label" style={styles.label}>Titre de l'élection : </label>
                        <span style={styles.span}><input id="electionTitle" type="text" className="add-election-input" style={styles.input} onChange={handleTitreOnChange} required /></span>
                        
                        <label className="add-election-label" style={styles.label}>Date de début : </label>
                        <span style={styles.span}><input id="dateDebut" type="date" className="add-election-input" style={styles.input} onBlur={handleDateDebutOnChange} required /></span>
                        
                        <label className="add-election-label" style={styles.label}>Date de fin : </label>
                        <span style={styles.span}><input id="dateFin" type="date" className="add-election-input" style={styles.input} onBlur={handleDateFinOnChange} required /></span>
                        

                        <label className="add-election-label" style={styles.label}>Description de l'élection : </label>
                        <textarea id="descriptionElection" type="text" className="add-election-input" style={styles.textArea} onBlur={handleDescriptionOnChange} required></textarea>

                        <input type="submit" className="add-election-submit" style={styles.submit} key="btnSubmitElection" value="Ajouter" />
                        <button type= "button" id="myBtn" style={styles.button} key="btnModalOpen" onClick={ () => btnFunction()}>Open Modal</button>
                        {listeCandidats.map((candidat) => <div key={candidat.titreCandidat}> {candidat.titreCandidat} </div> )} 
                    </div>
                }
            </form>
            <form onSubmit={handleOnAddCandidat}>  
                <div id="myModal" className="modal" style={styles.modal}>
                    <div className="modalContent" style={styles.modalContent}>
                        <span className="close" onClick={ () => spanFunction()} style={styles.close} key="btnModalClose">&times;</span>
                        <h1 className="add-candidat-title" style={styles.mainTitle}>Ajouter un candidat</h1>

                        <label className="add-candidat-label" style={styles.label}>Titre du candidat : </label>
                        <span style={styles.span}><input type="text" id="input-titre-candidat" className="add-candidat-input" style={styles.input} onChange={handleTitreCandidatOnChange} required /></span>    

                        <label className="add-candidat-label" style={styles.label}>Description du candidat : </label>
                        <textarea type="text" id="input-description-candidat" className="add-candidat-input" style={styles.textArea} onChange={handleDescriptionCandidatOnChange} required></textarea>

                        <label className="add-candidat-label" style={styles.label}>URL de l'image candidat : </label>
                        <span style={styles.span}><input type="text" id="input-url-candidat" className="add-candidat-input" style={styles.input} onChange={handleUrlOnChange} required /></span>           

                        <input type="submit" className="add-candidat-button" style={styles.button} key="btnSubmitCandidat" value="Ajouter un candidat" />
                    </div>
                </div>    
            </form>
            <FileReaderAddElection onFileRead={onFileRead}/>   
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
        float: "right",
        marginLeft: "10px",
        ':hover':{
            backgroundColor: "#074E7B",
             transition: "0.2s"
        }
    },
    button: {
        backgroundColor: "#0B6BA8",
        border: "none",
        color: "white",
        padding: "15px",
        textDecoration: "none",
        cursor: "pointer",
        minWidth: "200px",
        float: "right",
        marginLeft: "10px",
        ':hover':{
            backgroundColor: "#074E7B",
             transition: "0.2s"
        }
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
      width: "80%"
    },
    close: {
      color: "#aaaaaa",
      float: "right",
      fontSize: "28px",
      fontWeight: "bold",
      ':hover':{
        color: "#000",
        textdecoration: "none",
        cursor: "pointer"
      },
      ':focus':{
        color: "#000",
        textDecoration: "none",
        cursor: "pointer"
      }
    }
}

export default Radium(AddElection)