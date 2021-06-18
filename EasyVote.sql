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


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `easyvote`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `idAdmin` int(11) NOT NULL AUTO_INCREMENT,
  `motdePasseAdmin` varchar(50) NOT NULL,
  `emailAdmin` varchar(50) NOT NULL,
  PRIMARY KEY (`idAdmin`),
  UNIQUE KEY `emailAdmin` (`emailAdmin`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`idAdmin`, `motdePasseAdmin`, `emailAdmin`) VALUES
(1, 'admin', 'admin@email.fr');

-- --------------------------------------------------------

--
-- Structure de la table `adresse`
--

DROP TABLE IF EXISTS `adresse`;
CREATE TABLE IF NOT EXISTS `adresse` (
  `idAdresse` int(11) NOT NULL AUTO_INCREMENT,
  `numRue` int(11) NOT NULL,
  `rue` varchar(75) NOT NULL,
  `codePostal` int(11) NOT NULL,
  PRIMARY KEY (`idAdresse`),
  KEY `codePostal_1` (`codePostal`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `adresse`
--

INSERT INTO `adresse` (`idAdresse`, `numRue`, `rue`, `codePostal`) VALUES
(1, 1, 'Allée André-Breton', 75001),
(2, 1, 'Passage Sainte-Anne', 75002),
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
  KEY `idElection` (`idElection`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
  KEY `idAdresse` (`idAdresse`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

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
-- Structure de la table `departement`
--

DROP TABLE IF EXISTS `departement`;
CREATE TABLE IF NOT EXISTS `departement` (
  `codeDepartement` varchar(3) NOT NULL,
  `nomDepartement` varchar(50) NOT NULL,
  `nomRegion` varchar(50) NOT NULL,
  PRIMARY KEY (`codeDepartement`),
  KEY `nomRegion` (`nomRegion`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `departement`
--

INSERT INTO `departement` (`codeDepartement`, `nomDepartement`, `nomRegion`) VALUES
('1', 'Ain', 'Auvergne-Rhône-Alpes'),
('3', 'Allier', 'Auvergne-Rhône-Alpes'),
('2', 'Aisne', 'Hauts-de-France'),
('60', 'Oise', 'Hauts-de-France'),
('4', 'Alpes-de-Haute-Provence', 'Provence-Alpes-Côte d\'Azur'),
('6', 'Alpes-Maritimes', 'Provence-Alpes-Côte d\'Azur'),
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
('21', 'Côte-d\'Or', 'Bourgogne-Franche-Comté'),
('25', 'Doubs', 'Bourgogne-Franche-Comté'),
('22', 'Côtes d\'Armor', 'Bretagne'),
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
-- Structure de la table `electeur`
--

DROP TABLE IF EXISTS `electeur`;
CREATE TABLE IF NOT EXISTS `electeur` (
  `idElecteur` int(11) NOT NULL AUTO_INCREMENT,
  `motDePasseElecteur` varchar(50) NOT NULL,
  `premiereConnexion` tinyint(1) NOT NULL DEFAULT '1',
  `idCitoyen` int(11) NOT NULL,
  PRIMARY KEY (`idElecteur`),
  UNIQUE KEY `idCitoyen` (`idCitoyen`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `electeur`
--

INSERT INTO `electeur` (`idElecteur`, `motDePasseElecteur`, `premiereConnexion`, `idCitoyen`) VALUES
(1, 'tang', 1, 4),
(2, 'zhang', 1, 5);

-- --------------------------------------------------------

--
-- Structure de la table `election`
--

DROP TABLE IF EXISTS `election`;
CREATE TABLE IF NOT EXISTS `election` (
  `idElection` int(11) NOT NULL AUTO_INCREMENT,
  `titreElection` varchar(50) NOT NULL,
  `dateFinElection` datetime NOT NULL,
  `dateDebutElection` datetime NOT NULL,
  `descriptionElection` varchar(200) NOT NULL,
  `idAdmin` int(11) NOT NULL,
  PRIMARY KEY (`idElection`),
  KEY `idAdmin` (`idAdmin`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `election_departementale`
--

DROP TABLE IF EXISTS `election_departementale`;
CREATE TABLE IF NOT EXISTS `election_departementale` (
  `idElection` int(11) NOT NULL,
  `codeDepartement` int(11) NOT NULL,
  PRIMARY KEY (`idElection`),
  KEY `codeDepartement` (`codeDepartement`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `election_municipale`
--

DROP TABLE IF EXISTS `election_municipale`;
CREATE TABLE IF NOT EXISTS `election_municipale` (
  `idElection` int(11) NOT NULL,
  `codePostal` int(11) NOT NULL,
  PRIMARY KEY (`idElection`),
  KEY `codePostal` (`codePostal`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `election_nationale`
--

DROP TABLE IF EXISTS `election_nationale`;
CREATE TABLE IF NOT EXISTS `election_nationale` (
  `idElection` int(11) NOT NULL,
  PRIMARY KEY (`idElection`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `election_regionale`
--

DROP TABLE IF EXISTS `election_regionale`;
CREATE TABLE IF NOT EXISTS `election_regionale` (
  `idElection` int(11) NOT NULL,
  `nomRegion` varchar(50) NOT NULL,
  PRIMARY KEY (`idElection`),
  KEY `nomRegion` (`nomRegion`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `participer`
--

DROP TABLE IF EXISTS `participer`;
CREATE TABLE IF NOT EXISTS `participer` (
  `idElecteur` int(11) NOT NULL,
  `idElection` int(11) NOT NULL,
  PRIMARY KEY (`idElecteur`,`idElection`),
  KEY `idElection` (`idElection`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `région`
--

DROP TABLE IF EXISTS `région`;
CREATE TABLE IF NOT EXISTS `région` (
  `nomRegion` varchar(50) NOT NULL,
  PRIMARY KEY (`nomRegion`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `région`
--

INSERT INTO `région` (`nomRegion`) VALUES
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
-- Structure de la table `ville`
--

DROP TABLE IF EXISTS `ville`;
CREATE TABLE IF NOT EXISTS `ville` (
  `codePostal` int(11) NOT NULL,
  `nomVille` varchar(50) NOT NULL,
  `codeDepartement` varchar(3) NOT NULL,
  PRIMARY KEY (`codePostal`),
  KEY `codeDepartement` (`codeDepartement`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `ville`
--

INSERT INTO `ville` (`codePostal`, `nomVille`, `codeDepartement`) VALUES
(75000, 'Paris', '75'),
(75015, 'Paris Vaugirard 15e arrondissement', '75'),
(75020, 'Paris Ménilmontant 20e arrondissement', '75'),
(75018, 'Paris Butte-Montmartre 18e arrondissement', '75'),
(75019, 'Paris Buttes-Chaumont 19e arrondissement', '75'),
(75013, 'Paris Gobelins 13e arrondissement', '75'),
(75017, 'Paris Batignolles-Monceaux 17e arrondissement', '75'),
(75016, 'Paris Passy 16e arrondissement', '75'),
(75011, 'Paris Popincourt 11e arrondissement', '75'),
(75012, 'Paris Reuilly 12e arrondissement', '75'),
(75014, 'Paris Observatoire 14e arrondissement', '75'),
(75010, 'Paris Entrepôt 10e arrondissement', '75'),
(60000, 'Beauvais', '60');

-- --------------------------------------------------------

--
-- Structure de la table `voter`
--

DROP TABLE IF EXISTS `voter`;
CREATE TABLE IF NOT EXISTS `voter` (
  `idElection` int(11) NOT NULL,
  `idCandidat` int(11) NOT NULL,
  PRIMARY KEY (`idElection`,`idCandidat`),
  KEY `idCandidat` (`idCandidat`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
