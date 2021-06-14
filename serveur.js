const express = require('express')
const PORT = 5000
const app = express()

app.listen(5000,()=>{
    console.log('le serveur est sur le port : ', PORT)
})

app.get('/api/test', (_,res)=>{
    res.send({
        msg: 'test'
    })
})