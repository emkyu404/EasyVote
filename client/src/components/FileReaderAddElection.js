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
            <p style={styles.titleStyle}>Initialisation du formulaire avec la lecture d'un fichier (.xlsx)</p>
            <Link to="/files/Easy_Vote_Formulaire_Election.xlsx" target="_blank" download><div style={styles.buttonStyle}key="download"><p style={styles.buttonTextStyle} key="downloadText">Télécharger le modèle</p></div></Link>
            <input type="file" id="input" name="file" onChange={e => handleNewFile(e.target.files[0])} style={styles.inputStyle}></input>
            <a><div onClick={emulateClickOnInput} style={styles.buttonStyle} key="upload"><p style={styles.buttonTextStyle} key="uploadText">Lecture d'un fichier</p></div></a>
        </div>
    )
}

const styles = {
    mainDivContainer : {
        display:"flex",
        marginTop : "20px",
        marginBottom : "20px",
        padding : "20px",
        boxShadow: "0 0 10px #999",
        backgroundColor:"#fff",
        width : "100%",
        flexDirection : "row",
        justifyContent : "space-evenly",
        flexWrap : "wrap"
    },

    titleStyle : {
        padding : "15px 0 15px 0",
        width : "50%",
        minWidth : "fit-content",
        margin : "10px",
        flex : "2"
    },

    buttonStyle : {
        margin : "10px",
        backgroundColor: "#0B6BA8",
        border: "none",
        color: "white",
        padding: "15px",
        textDecoration: "none",
        cursor: "pointer",
        width: "200px",
        flex: "1",
        ':hover': {
            backgroundColor: "#074E7B",
            transition: "0.2s"
        }
    },

    inputStyle : {
        width: "0.1px",
        height: "0.1px",
        opacity: "0",
        overflow: "hidden",
        position: "absolute",
        zIndex: "-1"
    },

    buttonTextStyle : {
        position : "relative",
        width : "100%",
        textAlign : "center",
        margin : "auto",
        fontSize : "14px"
    }


}

export default Radium(FileReaderAddElection)
