import React from 'react'
import { useEffect } from 'react';
import * as XLSX from 'xlsx'
import {useState } from 'react'

const Test = () => {

    const handleNewFile = (e) => {
        var name = e.name;
        console.log(name)
        const reader = new FileReader()
        reader.onload = (evt) => {
            const bstr = evt.target.result
            const wb = XLSX.read(bstr, {type:'binary'})
            console.log(wb)

            const wsname = wb.SheetNames[0]
            console.log(wsname)
            const ws = wb.Sheets[wsname]
            console.log(ws)

            const data = XLSX.utils.sheet_to_json(ws)
             
            // Lecture d'un fichier excel, contenu est dans DATA
            console.log(data)
        }
    }



    return (
        <div>
            <input type="file" id="input" onChange={e => handleNewFile(e.target.files[0])}></input>
            <table id="tbl-data"></table>


        </div>
    )
}

export default Test
