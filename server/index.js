const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const session = require('express-session')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')

//Permet l'utilisation des cookies
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(session({ key : 'token', secret: 'EZSTONKS', saveUninitialized: false, resave: false, cookie: { expires: 600000 } }));
app.use(cookieParser());
app.use((req, res, next) => {
  if (req.cookies.token && !req.session.user) {
    res.clearCookie("token");
  }
  next();
});

var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.token) {
    res.redirect("/elections");
  } else {
    next();
  }
};

app.get("/", sessionChecker, (req, res) => {
  res.redirect("/login");
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "easyvote",
});

app.get("/token", (req, res) => {
  if(req.session.user){
    res.json(req.session.user)
  }
  else{
    res.json({message : "Pas de token"})
  }
})

app.post("/disconnect", (req, res) => {
  req.session.destroy()
  res.clearCookie("token");
  res.status(200).json({message: "Vous êtes déconnecté"})
});

app.post("/login", (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (checkConnected(req)===false){
    db.query(
      "SELECT * FROM citoyen WHERE emailCitoyen=?",
      [email],
    (err, resultMail) => {
      if (err){
        console.log(err);
      }
      else{
        if(resultMail.length ==1){
          db.query(
            "SELECT * FROM electeur WHERE idCitoyen=? AND motDePasseElecteur=?",
            [resultMail[0].idCitoyen, password],
            (err, resultPassword) => {
              if (err){
                console.log(err);
              }
              else{
                if(resultPassword.length ==1){
                  req.session.user = {
                    idCitoyen : resultPassword[0].idCitoyen,
                    nomCitoyen : resultMail[0].nomCitoyen,
                    prenomCitoyen : resultMail[0].prenomCitoyen,
                    emailCitoyen :resultMail[0].emailCitoyen,
                    idAdresse :resultMail[0].idAdresse,
                    idElecteur :resultPassword[0].idElecteur
                  }
                  res.json(req.session.user)
                }
                else {
                  res.json({message : "Email ou mot de passe incorrect"})
                }
              }
            }
          )
        }
        else {
          res.json({message : "Email ou mot de passe incorrect"})
        }
      }
    }) 
  }
  else{
    res.json({message : "Vous êtes déjà connecté"})
  }
});

app.post("/loginAdmin", (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if(checkConnected(req)===false){

    db.query(
      "SELECT * FROM admin WHERE emailAdmin=? AND motDePasseAdmin=?",
      [email, password],
    (err, result) => {
      if (err){
        console.log(err);
      }
      else{
        if(result.length ==1){
          req.session.user = {
            idAdmin : result[0].idAdmin,
            emailAdmin :result[0].emailAdmin,
          }
          res.json(req.session.user)
        }
        else {
          res.json({message : "Email ou mot de passe incorrect"})
        }
      }
    })
  }
  else{
    res.json({message : "Vous êtes déjà connecté"})
  }
});

function checkConnected(req){
  if(typeof req.session.user !== "undefined"){
    return true
  }
  return false
}

function checkSameAccount(req){
  return req.idCitoyen===req.session.user.idCitoyen
}

app.get("/profile", (req, res) => {
  if(checkSameAccount(req)===true){
    const idCitoyen = req.session.idCitoyen

    db.query("SELECT * FROM citoyen WHERE idCitoyen=?", 
    [idCitoyen],
    (err, result) => {
      if (err) {
        console.log(err);
      } 
      else if(result.length ==1){
        req.session.user = {
          nomCitoyen : result[0].nomCitoyen,
          prenomCitoyen : result[0].prenomCitoyen,
          emailCitoyen :result[0].emailCitoyen,
          idAdresse :result[0].idAdresse,
        }
        console.log(req.session.user + "Modif")
        res.json(req.session.user)
      }
      else {
        res.json({message : "Compte introuvable"})
      }
    });
  }
});

app.post('/addElection', (req, res) => {
  const titreElection = req.body.titreElection
  const dateDebut = req.body.dateDebut
  const dateFin = req.body.dateFin
  const descriptionEleciton = req.body.descriptionEleciton
  const idAdmin = req.session.currentUser.idAdmin

  const type = req.body.electionType

  if (typeof titreElection !== 'string' || titreElection === '' ||
      typeof dateDebut !== 'date' || dateDebut === '' ||
      typeof dateFin !== 'date' || dateFin === '' ||
      typeof descriptionEleciton !== 'string' || descriptionEleciton === '' ||
      typeof idAdmin !== 'int' || idAdmin === '') {
    res.status(400).json({ message: 'bad format' })
    return
  }

  const sqlVerifElection = db.query({
    text: "SELECT idElection FROM election WHERE titreElection=$1",
    values: [titreElection] 
  })

  if(sqlVerifElection.rowCount === 0) {
    db.query({
      text: 'INSERT INTO election(`idElection`, `titreElection`,`dateDebutElection`, `dateFinElection`, `descriptionElection`, `idAdministrateur`) '
      + 'VALUES (NULL,$1,$2,$3,$4,$5)',
      values: [titreElection, dateDebut, dateFin, descriptionEleciton, idAdmin]
    })
    res.status(200).json({ titreElection: titreElection, dateDebut: dateDebut, dateFin: dateFin, descriptionEleciton: descriptionEleciton, idAdmin: idAdmin })
  }else {
    res.status(401).json({ message: 'L\'élection existe déjà' })
  }

  const sqlGetElection = db.query({
    text: "SELECT idElection FROM election WHERE titreElection=$1",
    values: [titreElection] 
  })
  
  if(sqlGetElection.rowCount === 1) {
    const idElection = sqlGetElection.rows[0].idElection
    switch (type) {
      case 'election_regionale':
        console.log('election_regionale');
        const nomRegion = req.body.nomRegion
        db.query({
          text: "INSERT INTO election_regionale(`idElection`, `nomRegion`) VALUES ($1,$2)",
          values: [idElection, nomRegion] 
        })
        break;
      case 'election_departementale':
        console.log('election_departementale');
        const codeDepartement = req.body.codeDepartement
        db.query({
          text: "INSERT INTO election_departementale(`idElection`, `codeDepartement`) VALUES ($1,$2)",
          values: [idElection, codeDepartement] 
        })
        break;
      case 'election_municipale':
        console.log('election_municipale');
        const codePostal = req.body.codePostal
        db.query({
          text: "INSERT INTO election_municipale(`idElection`, `codePostal`) VALUES ($1,$2)",
          values: [idElection, codePostal] 
        })
        break;
      default:
        console.log("election_nationale");
        db.query({
          text: "INSERT INTO election_nationale(`idElection`) VALUES ($1)",
          values: [idElection] 
        })
        break;
    }
  }
})

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});

module.exports = app