-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 18 juin 2021 à 08:22
-- Version du serveur :  5.7.26
-- Version de PHP :  7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
SET FOREIGN_KEY_CHECKS=1;

--
-- Base de données :  `easyvote`
--
DROP DATABASE IF EXISTS easyvote;
CREATE DATABASE easyvote;
USE easyvote;

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `idAdmin` int(11) NOT NULL AUTO_INCREMENT,
  `motdePasseAdmin` varchar(100) NOT NULL,
  `emailAdmin` varchar(50) NOT NULL,
  PRIMARY KEY (`idAdmin`),
  UNIQUE KEY `emailAdmin` (`emailAdmin`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`idAdmin`, `motdePasseAdmin`, `emailAdmin`) VALUES
(1, '$2b$10$hhLBELdHKkgLRAVZpQpshOAE8Te4iQkqfGhqzArJ1HnrHvHkjGeTm', 'admin@email.fr');

-- --------------------------------------------------------

--
-- Structure de la table `region`
--

DROP TABLE IF EXISTS `region`;
CREATE TABLE IF NOT EXISTS `region` (
  `nomRegion` varchar(50) NOT NULL,
  PRIMARY KEY (`nomRegion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `region`
--

INSERT INTO `region` (`nomRegion`) VALUES
('Auvergne-Rhône-Alpes'),
('Bourgogne-Franche-Comté'),
('Bretagne'),
('Centre-Val de Loire'),
('Corse'),
('Grand Est'),
('Hauts-de-France'),
('Ile-de-France'),
('Normandie'),
('Nouvelle-Aquitaine'),
('Occitanie'),
('Pays de la Loire'),
('Provence-Alpes-Côte d’Azur');

-- --------------------------------------------------------

--
-- Structure de la table `departement`
--

DROP TABLE IF EXISTS `departement`;
CREATE TABLE IF NOT EXISTS `departement` (
  `codeDepartement` varchar(2) NOT NULL,
  `nomDepartement` varchar(50) NOT NULL,
  `nomRegion` varchar(50) NOT NULL,
  PRIMARY KEY (`codeDepartement`),
  FOREIGN KEY (`nomRegion`) REFERENCES `region`(`nomRegion`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `departement`
--

INSERT INTO `departement` (`codeDepartement`, `nomDepartement`, `nomRegion`) VALUES
('1', 'Ain', 'Auvergne-Rhône-Alpes'),
('3', 'Allier', 'Auvergne-Rhône-Alpes'),
('2', 'Aisne', 'Hauts-de-France'),
('60', 'Oise', 'Hauts-de-France'),
('4', 'Alpes-de-Haute-Provence', 'Provence-Alpes-Côte d’Azur'),
('6', 'Alpes-Maritimes', 'Provence-Alpes-Côte d’Azur'),
('8', 'Ardennes', 'Grand Est'),
('10', 'Aube', 'Grand Est'),
('11', 'Aude', 'Occitanie'),
('12', 'Aveyron', 'Occitanie'),
('50', 'Manche', 'Normandie'),
('14', 'Calvados', 'Normandie'),
('17', 'Charente-Maritime', 'Nouvelle-Aquitaine'),
('16', 'Charente', 'Nouvelle-Aquitaine'),
('18', 'Cher', 'Centre-Val de Loire'),
('28', 'Eure-et-Loir', 'Centre-Val de Loire'),
('21', 'Côte-d’Or', 'Bourgogne-Franche-Comté'),
('25', 'Doubs', 'Bourgogne-Franche-Comté'),
('22', 'Côtes d’Armor', 'Bretagne'),
('29', 'Finistère', 'Bretagne'),
('2A', '	Corse-du-Sud', 'Corse'),
('2B', 'Haute-Corse', 'Corse'),
('30', 'Gard', 'Occitanie'),
('31', 'Haute-Garonne', 'Occitanie'),
('75', 'Paris', 'Ile-de-France'),
('77', 'Seine-et-Marne', 'Ile-de-France'),
('72', 'Sarthe', 'Pays de la Loire'),
('85', 'Vendée', 'Pays de la Loire');

-- --------------------------------------------------------

--
-- Structure de la table `ville`
--

DROP TABLE IF EXISTS `ville`;
CREATE TABLE IF NOT EXISTS `ville` (
  `codePostal` int(5) NOT NULL,
  `nomVille` varchar(50) NOT NULL,
  `codeDepartement` varchar(2) NOT NULL,
  PRIMARY KEY (`codePostal`),
  FOREIGN KEY (`codeDepartement`) REFERENCES `departement`(`codeDepartement`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `ville`
--

INSERT INTO `ville` (`codePostal`, `nomVille`, `codeDepartement`) VALUES
(75000, 'Paris', '75'),
(75001, 'Paris 1e', '75'),
(75002, 'Paris 2e', '75'),
(75003, 'Paris 3e', '75'),
(75004, 'Paris 4e', '75'),
(75005, 'Paris 5e', '75'),
(75006, 'Paris 6e', '75'),
(75007, 'Paris 7e', '75'),
(75008, 'Paris 8e', '75'),
(75009, 'Paris 9e', '75'),
(75010, 'Paris 10e', '75'),
(75011, 'Paris 11e', '75'),
(75012, 'Paris 12e', '75'),
(75013, 'Paris 13e', '75'),
(75014, 'Paris 14e', '75'),
(75015, 'Paris 15e', '75'),
(75016, 'Paris 16e', '75'),
(75017, 'Paris 17e', '75'),
(75018, 'Paris 18e', '75'),
(75019, 'Paris 19e', '75'),
(75020, 'Paris 20e', '75'),
(60000, 'Beauvais', '60');

-- --------------------------------------------------------

--
-- Structure de la table `adresse`
--

DROP TABLE IF EXISTS `adresse`;
CREATE TABLE IF NOT EXISTS `adresse` (
  `idAdresse` int(11) NOT NULL AUTO_INCREMENT,
  `numRue` int(11) NOT NULL,
  `rue` varchar(75) NOT NULL,
  `codePostal` int(5) NOT NULL,
  PRIMARY KEY (`idAdresse`),
  FOREIGN KEY (`codePostal`) REFERENCES `ville`(`codePostal`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `adresse`
--

INSERT INTO `adresse` (`idAdresse`, `numRue`, `rue`, `codePostal`) VALUES
(1, 1, 'Allée André-Breton', 75001),
(2, 1, 'Rue d’Amiens', 60000),
(3, 1, 'Passage Sainte-Élisabeth', 75003),
(4, 1, 'Allée Célestin Hennion', 75004),
(5, 1, 'Rue Amyot', 75005),
(6, 1, 'Rue André-Mazet', 75006),
(7, 1, 'Rue Albert-de-Lapparent', 75007),
(8, 1, 'Rue Andrieux', 75008),
(9, 1, 'Rue Alfred-Stevens', 75009),
(10, 1, 'Rue Ambroise-Paré', 75010),
(11, 1, 'Rue Amelot', 75011),
(12, 1, 'Rue André-Derain', 75012),
(13, 1, 'Rue Albert Einstein', 75013),
(14, 1, 'Rue Alain', 75014),
(15, 1, 'Rue Alasseur', 75015),
(16, 1, 'Rue Mony', 75016),
(17, 1, 'Rue des Fermiers', 75017),
(18, 1, 'Rue Dejean', 75018),
(19, 1, 'Rue Delesseux', 75019),
(20, 1, 'Rue Delaitre', 75020);

-- --------------------------------------------------------


--
-- Structure de la table `citoyen`
--

DROP TABLE IF EXISTS `citoyen`;
CREATE TABLE IF NOT EXISTS `citoyen` (
  `idCitoyen` int(11) NOT NULL AUTO_INCREMENT,
  `nomCitoyen` varchar(50) NOT NULL,
  `prenomCitoyen` varchar(50) NOT NULL,
  `emailCitoyen` varchar(50) NOT NULL,
  `idAdresse` int(11) NOT NULL,
  PRIMARY KEY (`idCitoyen`),
  UNIQUE KEY `emailCitoyen` (`emailCitoyen`),
  FOREIGN KEY (`idAdresse`) REFERENCES `adresse`(`idAdresse`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `citoyen`
--

INSERT INTO `citoyen` (`idCitoyen`, `nomCitoyen`, `prenomCitoyen`, `emailCitoyen`, `idAdresse`) VALUES
(1, 'BUI', 'Minh-Quan', 'minh-quan.bui@email.com', 1),
(2, 'CHENG', 'Antoine', 'antoine.cheng@email.com', 2),
(3, 'LIN', 'Amaury', 'amaury.lin@email.com', 3),
(4, 'TANG', 'Jean-Franck', 'j-f.tang@email.com', 4),
(5, 'ZHANG', 'Thierry', 'thierry.zhang@email.com', 5);

-- --------------------------------------------------------

--
-- Structure de la table `electeur`
--

DROP TABLE IF EXISTS `electeur`;
CREATE TABLE IF NOT EXISTS `electeur` (
  `idElecteur` int(11) NOT NULL AUTO_INCREMENT,
  `motDePasseElecteur` varchar(100) NOT NULL,
  `premiereConnexion` tinyint(1) NOT NULL DEFAULT '1',
  `idCitoyen` int(11) NOT NULL,
  PRIMARY KEY (`idElecteur`),
  UNIQUE KEY `idCitoyen` (`idCitoyen`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `electeur`
--

INSERT INTO `electeur` (`idElecteur`, `motDePasseElecteur`, `premiereConnexion`, `idCitoyen`) VALUES
(1, '$2b$10$nCSLRrAVQI0lZUxC/JCb8Ok0LEPWKT7RYpVpI/sPt3Wcj4jSZkXeC', 1, 4),
(2, '$2b$10$t.JM1JcdwYuNvjbohqU0PuOH4uDtVgJKIejCD.m0YeImFu4L70xvi', 1, 5),
(3, '$2b$10$Nw5HwU/YmRzjslbcGEbiqeviDjnT4Fwq5hHtYm1nNQhbsmTnak6iG', 1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `election`
--

DROP TABLE IF EXISTS `election`;
CREATE TABLE IF NOT EXISTS `election` (
  `idElection` int(11) NOT NULL AUTO_INCREMENT,
  `titreElection` varchar(50) NOT NULL,
  `dateDebutElection` datetime NOT NULL,
  `dateFinElection` datetime NOT NULL,
  `descriptionElection` varchar(200) NOT NULL,
  PRIMARY KEY (`idElection`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `election`
--

INSERT INTO `election` (`idElection`, `titreElection`, `dateDebutElection`, `dateFinElection`, `descriptionElection`) VALUES
(1, 'Election présidentiel 2022 - 1er tour', '2021-07-01 00:04:00', '2022-07-02 00:04:00', '1er tour de l’élection pour désigner le (la) prochain(e) président(e) de la République Française.'),
(2, 'Election présidentiel 2022 - 2e tour', '2022-04-24 00:04:00', '2022-05-07 00:05:00', '2e tour de l’élection pour désigner le (la) prochain(e) président(e) de la République Française.'),
(3, 'Election régionale Ile-de-France 2021 - 1er tour', '2021-06-20 00:06:00', '2021-06-26 00:06:00', '1er tour de l’élection régionale 2021 en Ile-de-France.'),
(4, 'Election départementale de Oise', '2021-06-20 00:00:00', '2021-06-26 00:00:00', 'Election départementale 2021 de Oise'),
(5, 'Election municipale de Beauvais', '2021-06-20 00:00:00', '2021-06-26 00:00:00', 'Election municipale 2021 de Beauvais'),
(6, 'Election municipale de Paris', '2021-07-20 00:00:00', '2021-07-26 00:00:00', 'Election municipale 2021 de Paris');

-- --------------------------------------------------------

--
-- Structure de la table `candidat`
--

DROP TABLE IF EXISTS `candidat`;
CREATE TABLE IF NOT EXISTS `candidat` (
  `idCandidat` int(11) NOT NULL AUTO_INCREMENT,
  `titreCandidat` varchar(50) NOT NULL,
  `descriptionCandidat` varchar(200) DEFAULT NULL,
  `urlImage` varchar(255) NOT NULL,
  `idElection` int(11) NOT NULL,
  PRIMARY KEY (`idCandidat`),
  FOREIGN KEY (`idElection`) REFERENCES `election`(`idElection`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `candidat`
--

INSERT INTO `candidat` (`idCandidat`, `titreCandidat`, `descriptionCandidat`, `urlImage`, `idElection`) VALUES
(1, 'David Magnier et Claire Marais-Beuil Claire', 'Candidats du Rassemblement national', 'https://www.lobservateurdebeauvais.fr/wp-content/uploads/2021/06/Capture-d’écran-2021-06-14-à-09.43.01.png', 4),
(2, 'Thierry Aury et Dominique Clinckemaillie', 'Candidats de la Gauche départementale', 'https://www.lobservateurdebeauvais.fr/wp-content/uploads/2021/06/Capture-d’écran-2021-06-14-à-09.46.20.png', 4),
(3, 'Xavier BERTRAND', 'Candidat de l’Union Démocratique', 'https://pbs.twimg.com/profile_images/1389200515427414022/qtGDcS-V_400x400.jpg', 5),
(4, 'Sébastien CHENU', 'Candidat du Rassemblement National', 'https://upload.wikimedia.org/wikipedia/commons/e/ec/S%C3%A9bastien_Chenu.jpg', 5),
(5, 'Anne Hidalgo', 'Candidate du Parti  socialiste', 'https://cdn.paris.fr/paris/2020/07/03/huge-dc64cc08aac6ec80b6fb7162599222be.jpg', 6),
(6, 'Rachida Dati', 'Candidate des Républicains', 'https://cdn.paris.fr/paris/2020/10/05/huge-94302caa8dd2962645c8b9ca28e86372.jpg', 6),
(7, 'Emmanuel Macron', 'Candidat de la République En Marche', 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Emmanuel_Macron_%28cropped%29.jpg', 1),
(8, 'Emmanuel Macron', 'Candidat de la République En Marche', 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Emmanuel_Macron_%28cropped%29.jpg', 2),
(9, 'Marine Le Pen', 'Candidate du Rassemblement National', 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Marine_Le_Pen_%282017-03-24%29_01_cropped.jpg', 1),
(10, 'Marine Le Pen', 'Candidate du Rassemblement National', 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Marine_Le_Pen_%282017-03-24%29_01_cropped.jpg', 2),
(11, 'Jean-Luc Mélenchon', 'Candidat de la France Insoumise', 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Jean_Luc_MELENCHON_in_the_European_Parliament_in_Strasbourg%2C_2016_%28cropped%29.jpg', 1),
(12, 'Vote Blanc', NULL, '', 1),
(13, 'Valérie PÉCRESSE', 'Liste d’union à droite', 'https://pbs.twimg.com/profile_images/1392059688687177731/UD3loKNE.jpg', 3),
(14, 'Julien BAYOU', 'Liste d’union à gauche avec des écologiste', 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Julien_Bayou_par_C._Guilhem_%28cropped%29.jpg', 3),
(15, 'Jordan BARDELLA', 'Rassemblement National', 'https://pbs.twimg.com/profile_images/1303731893293199360/kHcksx82_400x400.jpg', 3);

-- --------------------------------------------------------

--
-- Structure de la table `election_regionale`
--

DROP TABLE IF EXISTS `election_regionale`;
CREATE TABLE IF NOT EXISTS `election_regionale` (
  `idElection` int(11) NOT NULL,
  `nomRegion` varchar(50) NOT NULL,
  PRIMARY KEY (`idElection`,`nomRegion`),
  FOREIGN KEY (`idElection`) REFERENCES `election`(`idElection`) ON DELETE CASCADE,
  FOREIGN KEY (`nomRegion`) REFERENCES `region`(`nomRegion`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `candidat`
--

INSERT INTO `election_regionale` (`idElection`, `nomRegion`) VALUES 
(3, 'Ile-de-France'),
(5, 'Ile-de-France');

-- --------------------------------------------------------

--
-- Structure de la table `election_departementale`
--

DROP TABLE IF EXISTS `election_departementale`;
CREATE TABLE IF NOT EXISTS `election_departementale` (
  `idElection` int(11) NOT NULL,
  `codeDepartement` varchar(2) NOT NULL,
  PRIMARY KEY (`idElection`,`codeDepartement`),
  FOREIGN KEY (`idElection`) REFERENCES `election`(`idElection`) ON DELETE CASCADE,
  FOREIGN KEY (`codeDepartement`) REFERENCES `departement`(`codeDepartement`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `candidat`
--

INSERT INTO `election_departementale` (`idElection`, `codeDepartement`) VALUES 
(4, '60');
-- --------------------------------------------------------

--
-- Structure de la table `election_municipale`
--

DROP TABLE IF EXISTS `election_municipale`;
CREATE TABLE IF NOT EXISTS `election_municipale` (
  `idElection` int(11) NOT NULL,
  `codePostal` int(5) NOT NULL,
  PRIMARY KEY (`idElection`,`codePostal`),
  FOREIGN KEY (`idElection`) REFERENCES `election`(`idElection`) ON DELETE CASCADE,
  FOREIGN KEY (`codePostal`) REFERENCES `ville`(`codePostal`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `candidat`
--

INSERT INTO `election_municipale` (`idElection`, `codePostal`) VALUES 
(5, 60000),
(6, 75004);

-- --------------------------------------------------------

--
-- Structure de la table `election_nationale`
--

DROP TABLE IF EXISTS `election_nationale`;
CREATE TABLE IF NOT EXISTS `election_nationale` (
  `idElectionNationale` int(11) NOT NULL AUTO_INCREMENT,
  `idElection` int(11) NOT NULL,
  PRIMARY KEY (`idElectionNationale`),
  FOREIGN KEY (`idElection`) REFERENCES `election`(`idElection`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `election_nationale`(`idElectionNationale`, `idElection`) VALUES 
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Structure de la table `participer`
--

DROP TABLE IF EXISTS `participer`;
CREATE TABLE IF NOT EXISTS `participer` (
  `idElecteur` int(11) NOT NULL,
  `idElection` int(11) NOT NULL,
  PRIMARY KEY (`idElecteur`,`idElection`),
  FOREIGN KEY (`idElecteur`) REFERENCES `electeur`(`idElecteur`) ON DELETE CASCADE,
  FOREIGN KEY (`idElection`) REFERENCES `election`(`idElection`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `participer` (`idElecteur`, `idElection`) VALUES 
('1', '3'),
('2', '1'),
('2', '3'),
('3', '5');

-- --------------------------------------------------------

--
-- Structure de la table `vote`
--

DROP TABLE IF EXISTS `vote`;
CREATE TABLE IF NOT EXISTS `vote` (
  `idVote` int(11) NOT NULL AUTO_INCREMENT,
  `idElection` int(11) NOT NULL,
  `idCandidat` int(11) NOT NULL,
  PRIMARY KEY (`idVote`,`idElection`,`idCandidat`),
  FOREIGN KEY (`idElection`) REFERENCES `candidat`(`idElection`) ON DELETE CASCADE,
  FOREIGN KEY (`idCandidat`) REFERENCES `candidat`(`idCandidat`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `vote` (`idVote`, `idElection`, `idCandidat`) VALUES 
('2', '3', '14'),
('3', '1', '9'),
('4', '3', '13'),
('5', '5', '3');

COMMIT;