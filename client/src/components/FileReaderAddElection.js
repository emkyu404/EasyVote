import React from 'react'
import * as XLSX from 'xlsx'
import { useToasts } from 'react-toast-notifications'

const FileReaderAddElection = ({onFileRead}) => {

    const {addToast} = useToasts()
    let candidatsArray = []
    let election = {}

    function convertDateFormat(string){
        let date = string.split(' ')
        let stringTab = date[0].split('/')
        let newString = '20'+stringTab[2] + '-' + stringTab[0] + '-' + stringTab[1]
        console.log(newString)
        return newString
    }

    const handleNewFile = (e) => {
        var name = e.name;
        console.log(name)
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

                const wsname2 = wb.SheetNames[1]
                if(wsname2 !== "Election"){
                    throw 'Format incorrect, la lecture du fichier à échouer'
                }
                const ws2 = wb.Sheets[wsname2]
                const data2 = XLSX.utils.sheet_to_json(ws2, {raw: false})

                console.log(data2)
                let newElection

                data2.forEach(element => {
                    let dateDebut = convertDateFormat(element.dateDebut)
                    let dateFin = convertDateFormat(element.dateFin)
                    newElection = {titreElection: element.Titre, dateDebutElection: dateDebut, dateFinElection: dateFin, descriptionElection : element.description}
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
        
    }



    return (
        <div>
            <input type="file" id="input" onChange={e => handleNewFile(e.target.files[0])}></input>
            <table id="tbl-data"></table>
        </div>
    )
}

export default FileReaderAddElection
