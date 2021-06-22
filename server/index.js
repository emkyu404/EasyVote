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
  const type = req.body.electionType
  // const autor = req.body.auteur
  // const description = req.body.resume

  // console.log(req.body)

  // if (typeof name !== 'string' || name === '' ||
  //     typeof autor !== 'string' || autor === '' ||
  //     typeof description !== 'string' || description === '') {
  //   res.status(400).json({ message: 'bad format' })
  //   return
  // }

  // const sqlVerifLivre = db.query({
  //   text: "SELECT idElection FROM election WHERE titreElection=$1",
  //   values: [name, autor] 
  // })

  // if(sqlVerifLivre.rowCount == 0) {
  //   await client.query({
  //     text: 'INSERT INTO public.livre(IdLivre, Nom, Auteur, Resume) VALUES (DEFAULT, $1, $2, $3);',
  //     values: [name, autor, description] 
  //   })
  //   res.status(200).json({ nom: name, auteur: autor, resume: description })
  // }else {
  //   res.status(401).json({ message: 'Le livre existe déjà' })
  // }
})

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});

module.exports = app