import React from 'react'
import * as XLSX from 'xlsx'
import { useToasts } from 'react-toast-notifications'

const Test = () => {

    const {addToast} = useToasts()
    let candidatsArray = []
    let election = {}

    const handleNewFile = (e) => {
        var name = e.name;
        console.log(name)
        const reader = new FileReader()
        reader.onload = (evt) => {
            try{
                const bstr = evt.target.result
                const wb = XLSX.read(bstr, {type:'binary'})
                if(wb.SheetNames.length != 2){
                    throw 'Format incorrect, la lecture du fichier à échouer'
                }
                const wsname = wb.SheetNames[0]
                if(wsname != "Candidats"){
                    throw 'Format incorrect, la lecture du fichier à échouer'
                }
                const ws = wb.Sheets[wsname]
                const data = XLSX.utils.sheet_to_json(ws, {raw: false})
                // Lecture d'un fichier excel, contenu est dans DATA
                let newCandidatsArray = []
                data.forEach(element => {
                    let newElement = {Titre:element.Titre, Description:element.Description, url:element.URL}
                    newCandidatsArray.push(newElement)
                    console.log(newCandidatsArray)
                });
                candidatsArray = newCandidatsArray
                console.log(candidatsArray)

                const wsname2 = wb.SheetNames[1]
                if(wsname2 != "Election"){
                    throw 'Format incorrect, la lecture du fichier à échouer'
                }
                const ws2 = wb.Sheets[wsname2]
                const data2 = XLSX.utils.sheet_to_json(ws2, {raw: false})

                console.log(data2)
                let newElection

                data2.forEach(element => {
                    newElection = {titreElection: element.Titre, dateDebutElection: element.dateDebut, dateFinElection: element.dateFin, descriptionElection : element.description, electionType: element.échelle}
                    console.log(element.échelle)
                    let typeElection = element.échelle.toUpperCase()
                    console.log(typeElection)
                    switch(typeElection){
                        case 'NATIONALE' : newElection = {...newElection, electionType: 'election_nationale', nomRegion:null, codeDepartement:null, codePostal:null}; break;
                        case 'REGIONALE' : newElection = {...newElection, electionType: 'election_regionale', nomRegion:element.zone, codeDepartement:null, codePostal:null}; break;
                        case 'MUNICIPALE' : newElection = {...newElection, electionType: 'election_municipale', nomRegion:null, codeDepartement:null, codePostal:element.zone}; break;
                        case 'DEPARTEMENTALE': newElection = {...newElection, electionType: 'election_departementale', nomRegion:null, codeDepartement:element.zone, codePostal:null}; break;
                        default : throw 'Format incorrection concernant l\'échelle de l\'élection'; break;
                    }
                })
                election = newElection
                console.log(newElection)

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
            //Lecture de la seconde feuille
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

export default Test
