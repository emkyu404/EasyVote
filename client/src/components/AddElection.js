import { useState, useEffect } from 'react';
import arrow from '../img/down-arrow.svg';
import Radium from 'radium';

import FileReaderAddElection from './FileReaderAddElection'
import DialogComponent from './DialogComponent';


const AddElection = ({ addCandidat, onAddElection, idElection, pageTitle }) => {
    useEffect(() => {
        document.title = pageTitle
    }, [pageTitle])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        listeCandidats.forEach(
            candidat => addCandidat(candidat.titreCandidat, candidat.descriptionCandidat, candidat.urlCandidat)
        )
    }, [idElection])// eslint-disable-line react-hooks/exhaustive-deps

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

    const [heureDebut, setHeureDebut] = useState("")
    const [heureFin, setHeureFin] = useState("")

    const [listeCandidats, setListeCandidats] = useState([])

    const [numberOfCalls, setNumberOfCalls] = useState(0)

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
    const handleHeureDebutOnChange = (e) => {
        setHeureDebut(e.target.value)
    }
    const handleHeureFinOnChange = (e) => {
        setHeureFin(e.target.value)
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
                default: throw new Error("Votre type d'élection n'est pas reconnue");
            }
            document.getElementById('dateDebut').valueAsDate = getDateObjFromString(electionObj.dateDebutElection)
            setDateDebutElection(electionObj.dateDebutElection)

            document.getElementById('heureDebut').value = electionObj.heureDebutElection
            setHeureDebut(electionObj.heureDebutElection)

            document.getElementById('dateFin').valueAsDate = getDateObjFromString(electionObj.dateFinElection)
            setDateFinElection(electionObj.dateFinElection)

            document.getElementById('heureFin').value = electionObj.heureFinElection
            setHeureDebut(electionObj.heureFinElection)

            document.getElementById('descriptionElection').value = electionObj.descriptionElection
            setDescriptionElection(electionObj.descriptionElection)

            //Changement des informations de la liste des candidats
            candidatsArray.forEach(candidat => {
                duplicateCandidat(candidat)
            })
        } catch (e) {
            throw e;
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

    function duplicateCandidat(newCandidat) {
        const idx = listeCandidats.findIndex(c => c.titreCandidat === newCandidat.titreCandidat)

        if (idx !== -1 || newCandidat.titreCandidat === "") {
            console.log("candidat doublon")
        } else {
            listeCandidats.push(newCandidat)
        }
    }

    const handleOnAddCandidat = (e) => {
        e.preventDefault()

        var newCandidat = {
            titreCandidat: titreCandidat,
            descriptionCandidat: descriptionCandidat,
            urlCandidat: urlCandidat
        }

        duplicateCandidat(newCandidat)

        resetFormCandidat()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (listeCandidats.length >= 0) {
            handleValidSubmit()
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

    window.onclick = function (event) {
        if (event.target === document.getElementById("myModal")) {
            document.getElementById("myModal").style.display = "none";
        }
    }

    const handleValidSubmit = () => {
        setNumberOfCalls(numberOfCalls+1)
    }

    const handleAddElection = async ()=> {
        await onAddElection(titreElection, (dateDebutElection + " " + heureDebut), (dateFinElection + " " + heureFin), descriptionElection, electionType, nomRegion, codeDepartement, codePostal)
    }

    function deleteCandidat(titreCandidat) {
        const newList = listeCandidats.filter((candidat) => candidat.titreCandidat !== titreCandidat);
        setListeCandidats(newList);
    }

    return (
        <div>
            <h1 className="add-election-title" style={styles.mainTitle}>Ajouter une nouvelle élection</h1>
            <FileReaderAddElection onFileRead={onFileRead} />
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
                        <h2 style={styles.secondTitle}>Formulaire d'ajout d'une élection</h2>
                        {electionType === "election_regionale" &&
                            <div>
                                <label className="add-election-label" maxLength="50" style={styles.label}>Nom de la région : </label>
                                <span style={styles.span}><input id="regionElection" type="text" className="add-election-input" style={styles.input} onChange={handleRegionOnChange} required value={nomRegion} /></span>
                            </div>
                        }

                        {electionType === "election_departementale" &&
                            <div>
                                <label className="add-election-label" style={styles.label}>Code du département : </label>
                                <span style={styles.span}><input id="codeDepartementElection" type="text" maxLength="2" className="add-election-input" style={styles.input} onChange={handleDepartementOnChange} required value={codeDepartement} /></span>
                            </div>
                        }

                        {electionType === "election_municipale" &&
                            <div>
                                <label className="add-election-label" style={styles.label}>Code postal : </label>
                                <span style={styles.span}><input id="codePostalElection" type="text" maxLength="5" className="add-election-input" style={styles.input} onChange={handleCodePostalOnChange} required value={codePostal} /></span>
                            </div>
                        }

                        <label className="add-election-label" style={styles.label}>Titre de l'élection : </label>
                        <span style={styles.span}><input id="electionTitle" type="text" maxLength="50" className="add-election-input" style={styles.input} onChange={handleTitreOnChange} required value={titreElection} /></span>

                        <label className="add-election-label" style={styles.label}>Date de début : </label>
                        <span style={styles.span}><input id="dateDebut" type="date" max="9999-12-31" className="add-election-input" style={styles.input} onChange={handleDateDebutOnChange} required value={dateDebutElection} /></span>

                        <label className="add-election-label" style={styles.label}>Heure de début : </label>
                        <span style={styles.span}><input id="heureDebut" type="time" className="add-election-input" style={styles.input} onChange={handleHeureDebutOnChange} required /></span>

                        <label className="add-election-label" style={styles.label}>Date de fin : </label>
                        <span style={styles.span}><input id="dateFin" type="date" max="9999-12-31" className="add-election-input" style={styles.input} onChange={handleDateFinOnChange} required value={dateFinElection} /></span>

                        <label className="add-election-label" style={styles.label}>Heure de fin : </label>
                        <span style={styles.span}><input id="heureFin" type="time" className="add-election-input" style={styles.input} onChange={handleHeureFinOnChange} required /></span>

                        <label className="add-election-label" style={styles.label}>Description de l'élection : </label>
                        <textarea id="descriptionElection" type="text" maxLength="200" className="add-election-input" style={styles.textArea} onChange={handleDescriptionOnChange} required value={descriptionElection}></textarea>

                        <button type="button" id="myBtn" style={styles.button} key="btnModalOpen" onClick={() => btnFunction()}>Ajouter un candidat</button>

                        {listeCandidats.length > 0 &&
                            <div style={styles.divCandidat}>
                                <h2 style={styles.secondTitle}>Liste des candidats</h2>
                                <div className="list-candidat-added" style={styles.listeCandidats}>
                                    <table style={styles.table}>
                                        <thead>
                                            <tr>
                                                <th style={Object.assign({}, styles.th, styles.title)}>Titre</th>
                                                <th style={Object.assign({}, styles.th, styles.description)}>Description</th>
                                                <th style={Object.assign({}, styles.th, styles.image)}>Image</th>
                                                <th style={Object.assign({}, styles.th, styles.delete)}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listeCandidats.map((candidat) =>
                                                <tr key={candidat.titreCandidat} style={styles.tr}>
                                                    <td style={Object.assign({}, styles.th, styles.title)}>{candidat.titreCandidat}</td>
                                                    <td style={Object.assign({}, styles.td, styles.description)}>{candidat.descriptionCandidat}</td>
                                                    <td style={Object.assign({}, styles.td, styles.image)}>{candidat.urlCandidat}</td>
                                                    <td style={Object.assign({}, styles.td, styles.delete)}><p onClick={() => deleteCandidat(candidat.titreCandidat)} style={styles.hoverable} key={candidat.titreCandidat}> ❌ </p></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <input type="submit" className="add-election-submit" style={styles.submit} key="btnSubmitElection" value="Ajouter" />
                            </div>
                        }
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
                        <textarea type="text" id="input-description-candidat" className="add-candidat-input" style={styles.textArea} onChange={handleDescriptionCandidatOnChange} required ></textarea>

                        <label className="add-candidat-label" style={styles.label}>URL de l'image candidat : </label>
                        <span style={styles.span}><input type="text" id="input-url-candidat" className="add-candidat-input" style={styles.input} onChange={handleUrlOnChange} /></span>

                        <input type="submit" className="add-candidat-button" style={styles.button} key="btnSubmitCandidat" value="Ajouter un candidat" />
                    </div>
                </div>
            </form>

            <DialogComponent
                dialogText={"Souhaitez-vous ajouter l'élection '"+titreElection+ "' à la base de données ?"}
                dialogTitle={"Ajout d'une élection à la base de données"}
                openOnRender={false}
                handleClickYes={handleAddElection}
                handleClickNo={() => {}}
                handleClickBehavior={() => {}}
                yesNo={true}
                numberOfCall={numberOfCalls}
            />
        </div>
    )
}

const styles = {
    divCandidat: {
        marginTop: "60px",
    },
    table: {
        tableLayout: "fixed",
        border: "1px solid #eee",
        borderCollapse: "collapse",
        width: "100%",
        marginBottom: "25px",
        display: "block",
        overflow: "auto"
    },
    th: {
        border: "1px solid #eee",
        borderCollapse: "collapse",
        backgroundColor: "#fafafa",
        padding: "5px 20px 5px 20px"
    },
    td: {
        border: "1px solid #eee",
        borderCollapse: "collapse",
        padding: "5px 20px 5px 20px"
    },
    title: {
        minWidth: "200px"
    },
    description: {
        minWidth: "400px",
        width: "100%"
    },
    image: {
        maxWidth: "250px",
        overflow: "auto"
    },
    delete: {
        width: "15px",
        padding: "5px",
    },
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
        '@media (max-width: 640px)': {
            padding: "20px 20px 70px 20px"
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
    },
    secondTitle: {
        textAlign: "center",
        paddingBottom: "10px"
    },
    hoverable: {
        ':hover': {
            cursor: "pointer"
        }
    },
}

export default Radium(AddElection)