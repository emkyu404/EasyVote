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
app.use(session({ key : 'token', secret: 'EZSTONKS', saveUninitialized: false, resave: false, cookie: { expires: 33300000 } }));
app.use(cookieParser());
app.use((req, res, next) => {
  if (req.cookies.token && !req.session.user) {
    res.clearCookie("token");
  }
  next();
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "easyvote",
  multipleStatements: true
});

function currentTime(){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  return dateTime
}

app.get('/currentDate', (req, res) => {
  res.json(currentTime());
});

app.get("/token", (req, res) => {
  if(req.session.user){
    res.json(req.session.user)
  }
  else{
    res.json({message : "Pas de token"})
  }
})

app.get("/disconnect", (req, res) => {
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
            "SELECT electeur.idCitoyen, citoyen.nomCitoyen, electeur.idElecteur FROM electeur INNER JOIN citoyen on electeur.idCitoyen=citoyen.idCitoyen WHERE electeur.idCitoyen=?",
            [resultMail[0].idCitoyen, password],
            (err, resultPassword) => {
              if (err){
                console.log(err);
                res.json({message : "Impossible de se connecter"})
              }
              else{
                if(resultPassword.length ==1){
                  req.session.user = {
                    idCitoyen : resultPassword[0].idCitoyen,
                    nomCitoyen : resultPassword[0].nomCitoyen,
                    idElecteur : resultPassword[0].idElecteur
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
        res.json({message : "Impossible de se connecter"})
      }
      else{
        if(result.length == 1){
          req.session.user = {
            idAdmin : result[0].idAdmin
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
  if(req.session.user){
    return req.body.idCitoyen===req.session.user.idCitoyen
  }
  return false
}

app.post("/profile", (req, res) => {
  if(checkSameAccount(req)===true){
    const idCitoyen = req.session.user.idCitoyen

    db.query("SELECT * FROM citoyen ci INNER JOIN adresse ad ON ci.idAdresse=ad.idAdresse INNER JOIN ville vi ON ad.codePostal=vi.codePostal INNER JOIN departement de ON vi.codeDepartement=de.codeDepartement WHERE ci.idCitoyen=?", 
    [idCitoyen],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({message : "Impossible de récupérer votre profil"})
      } 
      
      else if(result.length ==1){
        req.session.user.nomCitoyen = result[0].nomCitoyen,
        req.session.user.prenomCitoyen = result[0].prenomCitoyen
        req.session.user.emailCitoyen = result[0].emailCitoyen
        req.session.user.numRue = result[0].numRue
        req.session.user.rue = result[0].rue
        req.session.user.codePostal = result[0].codePostal
        req.session.user.nomVille = result[0].nomVille
        req.session.user.codeDepartement = result[0].codeDepartement
        req.session.user.nomDepartement = result[0].nomDepartement
        req.session.user.nomRegion = result[0].nomRegion

        res.json(req.session.user)
      }
      else {
        res.json({message : "Profil introuvable"})
      }
    });
  }
  else {
    res.json({message : "Vous n'êtes pas connecté"})
  }
});

app.post('/getElections', (req, res) => {
  if(checkSameAccount(req)===true){
    const idCitoyen = req.session.user.idCitoyen

    db.query("SET lc_time_names = 'fr_FR'; SELECT el.idElection, el.titreElection, el.descriptionElection, DATE_FORMAT(el.dateDebutElection,'%W %e %M %Y à %HH%m') as dateDebutElection , DATE_FORMAT(el.dateDebutElection,'%Y-%c-%e %H:%m:%s') as 'start', DATE_FORMAT(el.dateFinElection,'%W %e %M %Y à %HH%m') as dateFinElection, DATE_FORMAT(el.dateFinElection,'%Y-%c-%e %H:%m:%s') as 'end', em.codePostal, ed.codeDepartement, er.nomRegion FROM Election el LEFT JOIN election_departementale ed on el.idElection=ed.idElection LEFT JOIN election_municipale em on el.idElection=em.idElection LEFT JOIN election_regionale er on el.idElection=er.idElection WHERE em.codePostal IN (SELECT vi.codePostal FROM citoyen ci INNER JOIN adresse ad ON ci.idAdresse=ad.idAdresse INNER JOIN ville vi ON ad.codePostal=vi.codePostal INNER JOIN departement de ON vi.codeDepartement=de.codeDepartement WHERE ci.idCitoyen=?) OR ed.codeDepartement IN (SELECT de.codeDepartement FROM citoyen ci INNER JOIN adresse ad ON ci.idAdresse=ad.idAdresse INNER JOIN ville vi ON ad.codePostal=vi.codePostal INNER JOIN departement de ON vi.codeDepartement=de.codeDepartement WHERE ci.idCitoyen=?) OR er.nomRegion IN (SELECT de.nomRegion FROM citoyen ci INNER JOIN adresse ad ON ci.idAdresse=ad.idAdresse INNER JOIN ville vi ON ad.codePostal=vi.codePostal INNER JOIN departement de ON vi.codeDepartement=de.codeDepartement WHERE ci.idCitoyen=?) OR el.idElection IN (SELECT en.idElection FROM election_nationale en)",
    [idCitoyen, idCitoyen, idCitoyen],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({message : "Impossible de récupérer les élections"})
      } 
      else if(result.length != 0){
        res.json(result[1])
      }
      else {
        res.json({message : "Vous ne pouvez accèder à aucune élection"})
      }
    });
  }
});

app.post('/getElection', (req, res) => {
  const idElection = req.body.idElection
  db.query("SET lc_time_names = 'fr_FR';SELECT el.idElection, el.titreElection, DATE_FORMAT(el.dateDebutElection,'%W %e %M %Y à %HH%m') as dateDebutElection, DATE_FORMAT(dateDebutElection,'%Y-%c-%e %H:%m:%s') as 'start', DATE_FORMAT(el.dateFinElection,'%W %e %M %Y à %HH%m') as dateFinElection, DATE_FORMAT(dateFinElection,'%Y-%c-%e %H:%m:%s') as 'end', el.descriptionElection, count(pa.idElection)as 'nbVotes' FROM Election el INNER JOIN  Participer pa WHERE el.idElection = ?",
  [idElection],
  (err, result) => {
    if (err) {
      console.log(err);
      res.json({message : "Impossible de récupérer l'élection"})
    } 
    else if(result.length != 0){
      const currentDate = currentTime()
      let results = JSON.parse(JSON.stringify(result[1]))
      if (results[0].start < currentDate){
        results[0].started=true
      }
      else{
        results[0].started=false
      }
      if (results[0].end < currentDate){
        results[0].ended=true
      }
      else{
        results[0].ended=false
      }
      res.json(results[0])
    }
    else {
      res.json({message : "Élection introuvable"})
    }
  })
});

app.post('/getCandidats', (req, res) => {
  const idElection = req.body.idElection

  db.query("SELECT * FROM candidat WHERE idElection = ?",
  [idElection],
  (err, result) => {
    if (err) {
      console.log(err);
      res.json({message : "Impossible de récupérer les candidats"})
    } 
    else if(result.length != 0){
      res.json(result)
    }
    else {
      res.json({message : "Il n'y a aucun candidats"})
    }
  });
});

app.post('/addVote', (req, res) => {
  if(checkSameAccount(req)===true){
    const idElecteur = req.body.idElecteur
    const idElection = req.body.idElection
    const idCandidat = req.body.idCandidat

    db.query("INSERT INTO participer (idElecteur, idElection) VALUES(?, ?);INSERT INTO vote (idElection, idCandidat) VALUES(?, ?)",
    [idElecteur, idElection, idElection, idCandidat],
    (err, result) => {
      if (err) {
        if(err.code==="ER_DUP_ENTRY"){
          res.json({message : "Vous avez déjà voté dans cette élection"})
        }
        else {
          console.log(err);
          res.json({message : "Impossible d'ajouter le vote"})
        }
      } 
      else if(result[0].affectedRows===1 && result[1].affectedRows===1){
        res.json({success : "Vote ajouté"})
      }
    });
  }
});

app.post('/getVotes', (req, res) => {
  const idElection = req.body.idElection

  db.query("SELECT ca.titreCandidat, COUNT(vo.idVote) as 'votes' FROM vote vo inner join candidat ca on vo.idCandidat=ca.idCandidat WHERE vo.idElection=? GROUP BY vo.idCandidat;",
  [idElection],
  (err, result) => {
    if (err) {
      console.log(err);
      res.json({message : "Impossible de récupérer les votes"})
    } 
    else if(result.length != 0){
      res.json(result)
    }
    else {
      res.json({message : "Il n'y a aucun votes"})
    }
  });
});

app.post('/getParticiper', (req, res) => {
  const idElecteur = req.body.idElecteur
  const idElection = req.body.idElection

  db.query("SELECT * FROM `participer` WHERE idElecteur=? AND idElection=?;",
  [idElecteur, idElection],
  (err, result) => {
    
    if (err) {
      console.log(err);
      res.json({message : "Impossible de récupérer la participation"})
    } 
    else if(result.length != 0){
      res.json(true)
    }
    else {
      res.json(false)
    }
  });
});

app.post('/addElection', (req, res) => {
  const titreElection = req.body.titreElection
  const dateDebutElection = req.body.dateDebutElection
  const dateFinElection = req.body.dateFinElection
  const descriptionElection = req.body.descriptionElection

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
    "SELECT idElection FROM election WHERE titreElection=? AND dateDebutElection=? AND dateFinElection=?",
    [titreElection, dateDebutElection, dateFinElection],
    (err, resultIdElection) => {
      if (err){
        console.log(err);
      }
      else{
        if(resultIdElection.length === 0) {
          db.query(
            "INSERT INTO election(titreElection, dateDebutElection, dateFinElection, descriptionElection) VALUES (?,?,?,?); SELECT * FROM election WHERE idElection=LAST_INSERT_ID();",
            [titreElection, dateDebutElection, dateFinElection, descriptionElection],
            (err, result) => {
              if (err){
                console.log(err);
              } else {
                switch (type) {
                  case 'election_nationale':
                    addElectionNationale(res, titreElection, dateDebutElection, dateFinElection)
                    break;
                  case 'election_regionale':
                    addElectionRegionale(req, res, titreElection, dateDebutElection, dateFinElection)
                    break;
                  case 'election_departementale':
                    addElectionDepartementale(req, res, titreElection, dateDebutElection, dateFinElection)
                    break;
                  case 'election_municipale':
                    addElectionMunicipale(req, res, titreElection, dateDebutElection, dateFinElection)
                    break;
                  default:
                    res.status(401).json({ message: 'Le type d\'élection n\'existe pas' })
                    break;
                }  
                res.status(200).json(result)
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

async function addElectionNationale(res, titreElection, dateDebutElection, dateFinElection) {
  db.query(
    "SELECT idElection FROM election WHERE titreElection=? AND dateDebutElection=? AND dateFinElection=?",
    [titreElection, dateDebutElection, dateFinElection],
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
                res.status(200)
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

async function addElectionRegionale(req, res, titreElection, dateDebutElection, dateFinElection) {
  db.query(
    "SELECT idElection FROM election WHERE titreElection=? AND dateDebutElection=? AND dateFinElection=?",
    [titreElection, dateDebutElection, dateFinElection],
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
                res.status(200)
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

async function addElectionDepartementale(req, res, titreElection, dateDebutElection, dateFinElection) {
  db.query(
    "SELECT idElection FROM election WHERE titreElection=? AND dateDebutElection=? AND dateFinElection=?",
    [titreElection, dateDebutElection, dateFinElection],
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
                res.status(200)
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

async function addElectionMunicipale(req, res, titreElection, dateDebutElection, dateFinElection) {
  db.query(
    "SELECT idElection FROM election WHERE titreElection=? AND dateDebutElection=? AND dateFinElection=?",
    [titreElection, dateDebutElection, dateFinElection],
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
                res.status(200)
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

app.post('/addCandidat', (req, res) => {
  const titreCandidat = req.body.titreCandidat
  const descriptionCandidat = req.body.descriptionCandidat
  const urlImage = req.body.urlImage
  const idElection = req.body.idElection

  db.query(
    "SELECT idCandidat FROM candidat WHERE titreCandidat=? AND idElection=?",
    [titreCandidat, idElection],
    (err, resultIdCandidat) => {
      if (err) {
        console.log(err);
      }
      else {
        if(resultIdCandidat.length === 0) {
          db.query(
            "INSERT INTO `candidat`(`idCandidat`, `titreCandidat`, `descriptionCandidat`, `urlImage`, `idElection`) VALUES (NULL,?,?,?,?)",
            [titreCandidat, descriptionCandidat, urlImage, idElection],
            (err) => {
              if (err){
                console.log(err);
              }
              else {
                res.status(200).json({ titreCandidat: titreCandidat, descriptionCandidat: descriptionCandidat, urlImage: urlImage, idElection: idElection })
              }
            }
          )
        }
      }
    }
  )
});

function parseElection (req, res, next) {
  const idElection = parseInt(req.params.idElection)

  // si idElection n'est pas un nombre (NaN = Not A Number), alors on s'arrête
  if (isNaN(idElection)) {
    res.status(400).json({ message: 'idElection should be a number' })
    return
  }
  // on affecte req.livreId pour l'exploiter dans toutes les routes qui en ont besoin
  req.idElection = idElection

  next()
}

app.route('/election/:idElection')

  /**
   * Cette route modifie une élection.
   */
  .put(parseElection, (req, res) => {
    updateElection(req, res)
  })  

  /**
   * Cette route supprime une élection.
   */
  .delete(parseElection, (req, res) => {
    deleteElection(req, res)
  })

  async function deleteElection(req, res) {
    db.query(
      "DELETE FROM `election` WHERE `idElection` = ?",
      [req.idElection],
      (err) => {
        if (err) {
          res.status(401).json({ message: "Suppression de l'élection" })
        }
        else {
          res.status(200).json({ delete: "Suppression réussie" })
        }
      }
    )
  }

  async function updateElection(req, res) {
    const titreElection = req.body.titreElection
    const dateDebutElection = req.body.dateDebutElection
    const dateFinElection = req.body.dateFinElection
    const descriptionElection = req.body.descriptionElection

    db.query(
      "UPDATE `election` SET `titreElection` = ?, `dateDebutElection` = ?, `dateFinElection` = ?, `descriptionElection` = ? WHERE `idElection` = ?",
      [titreElection, dateDebutElection, dateFinElection, descriptionElection, req.idElection],
      (err) => {
        if (err) {
          console.log(err);
        }
        else {
          res.status(200).json({ message: "Modification réussie" })
        }
      }
    )
  }
  
app.post('/changePassword', (req, res) => {
  const newPassword = req.body.newPassword
  const userId = req.body.userId

  db.query("UPDATE electeur SET motDePasseElecteur=? WHERE idElecteur = ?",
  [newPassword,userId],
  (err, result) => {
    if (err) {
      res.json({message : "Le changement de mot de passe à échouer"})
    } 
    else {
      res.json({message : "Changement de mot de passe effectué"})
    }
  });
});


app.post('/')

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});

module.exports = app