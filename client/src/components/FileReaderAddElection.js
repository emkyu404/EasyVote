import React from 'react'
import * as XLSX from 'xlsx'
import { useToasts } from 'react-toast-notifications'
import { Link } from 'react-router-dom'
import Radium from 'radium'

const FileReaderAddElection = ({onFileRead}) => {

    const {addToast} = useToasts()
    let candidatsArray = []
    let election = {}

    function convertDateFormat(string){
        let date = string.split(' ')
        let stringTab = date[0].split('/')
        let newString = '20'+stringTab[2] + '-' + transformTwoNumbersFormat(stringTab[0]) + '-' + transformTwoNumbersFormat(stringTab[1])
        return newString
    }

    function convertHoursFormat(string){
        let hours = string.split(' ')
        let stringHours = hours[1].split(':')
        let newString = transformTwoNumbersFormat(stringHours[0])+":"+stringHours[1]
        return newString
    }

    function transformTwoNumbersFormat(string){
        return parseInt(string) < 10 ? "0"+string: string
    }

    function verifyFileExtension(fileName){
        var tab = fileName.split('.')
        return tab[1] === 'xlsx'
    }

    const handleNewFile = (e) => {
        try{
            var name = e.name
            if(!verifyFileExtension(name)){
                throw 'Format du fichier incorrect. Veuillez vérifier que le fichier lu a pour extension .xlsx'
            }
            const reader = new FileReader()
            reader.onload = (evt) => {
                try{
                    const bstr = evt.target.result
                    const wb = XLSX.read(bstr, {type:'binary'})
                    if(wb.SheetNames.length !== 2){
                        throw 'Format incorrect, la lecture du fichier à échouer'
                    }
                    const wsname = wb.SheetNames[0]
                    if(wsname !== "Candidats"){
                        throw 'Format incorrect, la lecture du fichier à échouer'
                    }
                    const ws = wb.Sheets[wsname]
                    const data = XLSX.utils.sheet_to_json(ws, {raw: false})
                    // Lecture d'un fichier excel, contenu est dans DATA
                    let newCandidatsArray = []
                    data.forEach(element => {
                        let newElement = {titreCandidat:element.Titre, descriptionCandidat:element.Description, urlCandidat:element.URL}
                        newCandidatsArray.push(newElement)
                    });
                    candidatsArray = newCandidatsArray

                    // Lecture de la seconde feuille du fichier excel
                    const wsname2 = wb.SheetNames[1]
                    if(wsname2 !== "Election"){
                        throw 'Format incorrect, la lecture du fichier à échouer'
                    }
                    const ws2 = wb.Sheets[wsname2]
                    const data2 = XLSX.utils.sheet_to_json(ws2, {raw: false})

                    let newElection

                    data2.forEach(element => {
                        let dateDebut = convertDateFormat(element.dateDebut)
                        let dateFin = convertDateFormat(element.dateFin)
                        let heureDebut = convertHoursFormat(element.dateDebut)
                        let heureFin = convertHoursFormat(element.dateFin)
                        newElection = {titreElection: element.Titre, dateDebutElection: dateDebut, heureDebutElection: heureDebut, dateFinElection: dateFin, heureFinElection: heureFin, descriptionElection : element.description}
                        let typeElection = element.échelle.toUpperCase()
                        switch(typeElection){
                            case 'NATIONALE' : newElection = {...newElection, electionType: 'election_nationale', nomRegion:null, codeDepartement:null, codePostal:null}; break;
                            case 'REGIONALE' : newElection = {...newElection, electionType: 'election_regionale', nomRegion:element.zone, codeDepartement:null, codePostal:null}; break;
                            case 'MUNICIPALE' : newElection = {...newElection, electionType: 'election_municipale', nomRegion:null, codeDepartement:null, codePostal:element.zone}; break;
                            case 'DEPARTEMENTALE': newElection = {...newElection, electionType: 'election_departementale', nomRegion:null, codeDepartement:element.zone, codePostal:null}; break;
                            default : throw 'Format incorrection concernant l\'échelle de l\'élection'; break;
                        }
                    })
                    election = newElection
                    console.log(election)

                    // Appel de la fonction dans le component AddElection qui permet d'initialiser les states en fonction des données lu sur le fichier excel.
                    onFileRead(election,candidatsArray)

                    addToast("Lecture du fichier réalisé avec succès",{
                        appearance: 'success',
                        autoDismiss: true,
                    })
                }catch(e){
                    addToast("Erreur : " + e, {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                }
            }
            reader.readAsBinaryString(e)
        }catch(e){
            addToast("Erreur : " + e, {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    }
    
    const emulateClickOnInput = () => {
        document.getElementById('input').click()
    }



    return (
        <div style={styles.mainDivContainer}>
            <h2 style={styles.secondTitle}>Importer une éléction à partir d'un fichier</h2>
            <p>Initialisation du formulaire avec la lecture d'un fichier (.xlsx)</p>
            <Link to="/files/Easy_Vote_Formulaire_Election.xlsx" target="_blank" download><button style={styles.button} key="download">Télécharger le modèle</button></Link>
            <input type="file" id="input" name="file" onChange={e => handleNewFile(e.target.files[0])} style={styles.inputStyle}></input>
            <button onClick={emulateClickOnInput} style={styles.button} key="upload">Lecture d'un fichier</button>
        </div>
    )
}

const styles = {
    mainDivContainer : {
        backgroundColor: "white",
        padding: "40px 40px 40px 40px",
        boxShadow: "0 0 10px #999",
        margin: "20px 0px 20px 0px",
        '@media (max-width: 640px)': { 
            padding: "20px 20px 20px 20px",
        }
    },
    button: {
        backgroundColor: "#0B6BA8",
        border: "none",
        color: "white",
        padding: "15px",
        textDecoration: "none",
        cursor: "pointer",
        width: "200px",
        margin: "20px 20px 0px 0px",
        ':hover': {
            backgroundColor: "#074E7B",
            transition: "0.2s"
        },
        '@media (max-width: 960px)':{
            width: "100%"
        }
    },
    secondTitle:{
        textAlign: "center",
        paddingBottom: "10px"
    },
    inputStyle : {
        display: "none"
    }
}

export default Radium(FileReaderAddElection)
