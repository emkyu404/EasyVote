const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const session = require('express-session')

app.use(cors());
app.use(express.json());
app.use(session({ secret: 'EZSTONKS', saveUninitialized: false, resave: false }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "easyvote",
});

app.get("/citizens", (req, res) => {
  console.log("test");
  db.query("SELECT * FROM citoyen", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email
  const password = req.body.password

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
                req.session.currentUser = {
                  idCitoyen : resultPassword[0].idCitoyen,
                  nomCitoyen : resultMail[0].nomCitoyen,
                  prenomCitoyen : resultMail[0].prenomCitoyen,
                  emailCitoyen :resultMail[0].emailCitoyen,
                  idAdresse :resultMail[0].idAdresse,
                  idElecteur :resultPassword[0].idElecteur
                }
                res.send(req.session.currentUser)
              }
              else {
                res.json({message : "Compte introuvable ou mot de passe incorrect"})
              }
            }
          }
        )
      }
      else {
        res.json({message : "Email introuvable"})
      }
    }
  }) 
});


app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
