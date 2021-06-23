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
// app.use((req, res, next) => {
//   if (req.cookies.token && !req.session.user) {
//     res.clearCookie("token");
//   }
//   next();
// });

// var sessionChecker = (req, res, next) => {
//   if (req.session.user && req.cookies.token) {
//     res.redirect("/elections");
//   } else {
//     next();
//   }
// };

// app.get("/", sessionChecker, (req, res) => {
//   res.redirect("/login");
// });

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
                    //nomCitoyen : resultMail[0].nomCitoyen,
                    //prenomCitoyen : resultMail[0].prenomCitoyen,
                    //emailCitoyen :resultMail[0].emailCitoyen,
                    //idAdresse :resultMail[0].idAdresse,
                    //idElecteur :resultPassword[0].idElecteur
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
  return req.body.idCitoyen===req.session.user.idCitoyen
}

app.post("/profile", (req, res) => {
  if(checkSameAccount(req)===true){
    const idCitoyen = req.session.user.idCitoyen

    db.query("SELECT * FROM citoyen WHERE idCitoyen=?", 
    [idCitoyen],
    (err, result) => {
      if (err) {
        console.log(err);
      } 
      else if(result.length ==1){
        req.session.user.nomCitoyen = result[0].nomCitoyen,
        req.session.user.prenomCitoyen = result[0].prenomCitoyen
        req.session.user.emailCitoyen = result[0].emailCitoyen
        req.session.user.idAdresse = result[0].idAdresse

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
  const descriptionElection = req.body.descriptionElection
  const idAdmin = req.session.currentUser.idAdmin
  // const idAdmin = 1 // __________________________________A CHANGER_______________________

  const type = req.body.electionType


  // if (typeof titreElection !== 'string' || titreElection === '' ||
  //     // typeof dateDebut !== 'date' || dateDebut === '' ||
  //     // typeof dateFin !== 'date' || dateFin === '' ||
  //     typeof descriptionElection !== 'string' || descriptionElection === '' ||
  //     typeof idAdmin !== 'number' || idAdmin === 0) {
  //   res.status(400).json({ message: 'bad format' })
  //   return
  // }

  db.query(
    "SELECT idElection FROM election WHERE titreElection=?",
    [titreElection],
    (err, resultIdElection) => {
      if (err){
        console.log(err);
      }
      else{
        if(resultIdElection.length == 0) {
          db.query(
            "INSERT INTO election(idElection, titreElection, dateDebutElection, dateFinElection, descriptionElection, idAdministrateur) VALUES (NULL,?,?,?,?,?)",
            [titreElection, dateDebut, dateFin, descriptionElection, idAdmin],
            (err) => {
              if (err){
                console.log(err);
              } else {
                switch (type) {
                  case 'election_nationale':
                    addElectionNationale(res, titreElection)
                    break;
                  case 'election_regionale':
                    addElectionRegionale(req, res, titreElection)
                    break;
                  case 'election_departementale':
                    addElectionDepartementale(req, res, titreElection)
                    break;
                  case 'election_municipale':
                    addElectionMunicipale(req, res, titreElection)
                    break;
                  default:
                    res.status(401).json({ message: 'Le type d\'élection n\'existe pas' })
                    break;
                }  
                res.status(200).json({ titreElection: titreElection, dateDebut: dateDebut, dateFin: dateFin, descriptionElection: descriptionElection, idAdmin: idAdmin })
              }
            }
          )
        } else {
          res.status(401).json({ message: 'L\'élection existe déjà' })
        }
      }
    }
  )
})

async function addElectionNationale(res, titreElection) {
  db.query(
    "SELECT idElection FROM election WHERE titreElection=?",
    [titreElection],
    (err, resultIdElection) => {
      if(err) {
        console.log(err);
      } else {
        if(resultIdElection.length === 1) {
          const idElection = resultIdElection[0].idElection
          db.query(
            "INSERT INTO election_nationale(`idElection`) VALUES (?)",
            [idElection],
            (error) => {
              if(error) {
                console.log(error);
              } else {
                res.status(200).json({ idElection: idElection })
              }
            }
          )
        } else {
          res.status(401).json({ message: 'L\'élection n\'existe pas' })
        }
      }
    }
  )
}

async function addElectionRegionale(req, res, titreElection) {
  db.query(
    "SELECT idElection FROM election WHERE titreElection=?",
    [titreElection],
    (err, resultIdElection) => {
      if(err) {
        console.log(err);
      } else {
        if(resultIdElection.length === 1) {
          const idElection = resultIdElection[0].idElection
          const nomRegion = req.body.nomRegion
          db.query(
            "INSERT INTO election_regionale(`idElection`, `nomRegion`) VALUES (?,?)",
            [idElection, nomRegion],
            (error) => {
              if(error) {
                console.log(error);
              } else {
                res.status(200).json({ idElection: idElection, nomRegion: nomRegion })
              }
            }
          )
        } else {
          res.status(401).json({ message: 'L\'élection n\'existe pas' })
        }
      }
    }
  )
}

async function addElectionDepartementale(req, res, titreElection) {
  db.query(
    "SELECT idElection FROM election WHERE titreElection=?",
    [titreElection],
    (err, resultIdElection) => {
      if(err) {
        console.log(err);
      } else {
        if(resultIdElection.length === 1) {
          const idElection = resultIdElection[0].idElection
          const codeDepartement = req.body.codeDepartement
          db.query(
            "INSERT INTO election_departementale(`idElection`, `codeDepartement`) VALUES (?,?)",
            [idElection, codeDepartement],
            (error) => {
              if(error) {
                console.log(error);
              } else {
                res.status(200).json({ idElection: idElection, codeDepartement: codeDepartement })
              }
            }
          )
        } else {
          res.status(401).json({ message: 'L\'élection n\'existe pas' })
        }
      }
    }
  )
}

async function addElectionMunicipale(req, res, titreElection) {
  db.query(
    "SELECT idElection FROM election WHERE titreElection=?",
    [titreElection],
    (err, resultIdElection) => {
      if(err) {
        console.log(err);
      } else {
        if(resultIdElection.length === 1) {
          const idElection = resultIdElection[0].idElection
          const codePostal = req.body.codePostal
          db.query(
            "INSERT INTO election_municipale(`idElection`, `codePostal`) VALUES (?,?)",
            [idElection, codePostal],
            (error) => {
              if(error) {
                console.log(error);
              } else {
                res.status(200).json({ idElection: idElection, codePostal: codePostal })
              }
            }
          )
        } else {
          res.status(401).json({ message: 'L\'élection n\'existe pas' })
        }
      }
    }
  )
}

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});

module.exports = app