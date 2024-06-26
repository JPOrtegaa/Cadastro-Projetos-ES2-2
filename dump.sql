-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: es2-projeto1-final
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Genero`
--

DROP TABLE IF EXISTS `Genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Genero` (
  `idGenero` int NOT NULL AUTO_INCREMENT,
  `nomeGenero` varchar(45) NOT NULL,
  PRIMARY KEY (`idGenero`),
  UNIQUE KEY `idGenero_UNIQUE` (`idGenero`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Genero`
--

LOCK TABLES `Genero` WRITE;
/*!40000 ALTER TABLE `Genero` DISABLE KEYS */;
INSERT INTO `Genero` VALUES (3,'Masculino'),(4,'Feminino'),(5,'Outro');
/*!40000 ALTER TABLE `Genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Profissional`
--

DROP TABLE IF EXISTS `Profissional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Profissional` (
  `idProfissional` int NOT NULL AUTO_INCREMENT,
  `nomeProfissional` varchar(45) NOT NULL,
  `dataNascimento` date NOT NULL,
  `especialidadeProfissional` varchar(45) NOT NULL,
  `enderecoProfissional` varchar(45) NOT NULL,
  `Genero_idGenero` int NOT NULL,
  `Raca_idRaca` int NOT NULL,
  PRIMARY KEY (`idProfissional`,`Genero_idGenero`,`Raca_idRaca`),
  UNIQUE KEY `idProfissional_UNIQUE` (`idProfissional`),
  KEY `fk_Profissional_Genero1_idx` (`Genero_idGenero`),
  KEY `fk_Profissional_Raca1_idx` (`Raca_idRaca`),
  CONSTRAINT `fk_Profissional_Genero1` FOREIGN KEY (`Genero_idGenero`) REFERENCES `Genero` (`idGenero`),
  CONSTRAINT `fk_Profissional_Raca1` FOREIGN KEY (`Raca_idRaca`) REFERENCES `Raca` (`idRaca`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Profissional`
--

LOCK TABLES `Profissional` WRITE;
/*!40000 ALTER TABLE `Profissional` DISABLE KEYS */;
-- INSERT INTO `Profissional` VALUES (4,'Jose','2002-01-15','front-ender','Rua San Martin',5,2);
/*!40000 ALTER TABLE `Profissional` ENABLE KEYS */;

insert into Profissional (nomeProfissional, dataNascimento, especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) values ('Horton Ainslee', '1996-02-13', 'Designer', '77 Northview Pass', 3, 5);
insert into Profissional (nomeProfissional, dataNascimento, especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) values ('Bonnibelle Giovannini', '1991-03-16', 'Administrador de banco de dados', '9761 Rowland Lane', 4, 1);
insert into Profissional (nomeProfissional, dataNascimento, especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) values ('Maureen MacNeilly', '2000-09-04', 'Administrador de banco de dados', '83 Dwight Way', 3, 2);
insert into Profissional (nomeProfissional, dataNascimento, especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) values ('Nanice Normavell', '2000-09-23', 'Desenvolvedor', '2 Village Lane', 3, 3);
insert into Profissional (nomeProfissional, dataNascimento, especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) values ('Emelen Winkle', '1998-06-06', 'Desenvolvedor', '474 Ryan Place', 4, 2);
insert into Profissional (nomeProfissional, dataNascimento, especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) values ('Halette Bulbeck', '1986-06-30', 'Designer', '043 East Road', 4, 3);
insert into Profissional (nomeProfissional, dataNascimento, especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) values ('Querida Randals', '1999-04-23', 'Outro', '9 Stang Drive', 4, 5);
insert into Profissional (nomeProfissional, dataNascimento, especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) values ('Donny Sabater', '2001-05-09', 'Analista de Sistemas', '78170 Porter Avenue', 3, 4);
insert into Profissional (nomeProfissional, dataNascimento, especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) values ('Abbye Strooband', '1992-07-26', 'Outro', '77024 Mcguire Way', 3, 3);
insert into Profissional (nomeProfissional, dataNascimento, especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) values ('Weider Rudwell', '1985-02-01', 'Administrador de banco de dados', '395 Northridge Pass', 3, 4);
insert into Profissional (nomeProfissional, dataNascimento, especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) values ('Quintin Fairall', '1989-11-19', 'Outro', '689 Lyons Circle', 5, 1);
insert into Profissional (nomeProfissional, dataNascimento, especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) values ('Kaja Ivanyushin', '1994-09-23', 'Outro', '01 Elgar Street', 4, 3);
insert into Profissional (nomeProfissional, dataNascimento, especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) values ('Lurleen MacCarlich', '1994-09-19', 'Desenvolvedor', '80 Grim Plaza', 4, 5);
insert into Profissional (nomeProfissional, dataNascimento, especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) values ('Hatty Kynastone', '1981-02-04', 'Designer', '4 Rowland Park', 5, 2);
insert into Profissional (nomeProfissional, dataNascimento, especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) values ('Leighton Filler', '1997-03-21', 'Outro', '81 Fairfield Avenue', 5, 4);
insert into Profissional (nomeProfissional, dataNascimento, especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) values ('Arri Roden', '1989-09-06', 'Desenvolvedor', '63804 Merrick Road', 3, 4);
insert into Profissional (nomeProfissional, dataNascimento, especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) values ('Ingeberg Dunnet', '1982-08-30', 'Designer', '94525 Center Alley', 4, 3);
insert into Profissional (nomeProfissional, dataNascimento, especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) values ('Talbert Gallear', '1980-05-13', 'Designer', '5733 Loftsgordon Parkway', 5, 3);
insert into Profissional (nomeProfissional, dataNascimento, especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) values ('Silvain Gorrissen', '1992-12-14', 'Designer', '6334 Ridgeview Pass', 3, 3);
insert into Profissional (nomeProfissional, dataNascimento, especialidadeProfissional, enderecoProfissional, Genero_idGenero, Raca_idRaca) values ('Dionysus Ladd', '1993-04-30', 'Outro', '08 Kedzie Point', 4, 4);

UNLOCK TABLES;

--
-- Table structure for table `Projeto`
--

DROP TABLE IF EXISTS `Projeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Projeto` (
  `idProjeto` int NOT NULL AUTO_INCREMENT,
  `nomeProjeto` varchar(100) NOT NULL,
  `nomeCliente` varchar(100) NOT NULL,
  `objetivoProjeto` varchar(500) NOT NULL,
  `dataInicio` date NOT NULL,
  `dataTermino` date NOT NULL,
  `valorProjeto` float NOT NULL,
  `Time_idTime` int NOT NULL,
  PRIMARY KEY (`idProjeto`,`Time_idTime`),
  UNIQUE KEY `idProjeto_UNIQUE` (`idProjeto`),
  KEY `fk_Projeto_Time_idx` (`Time_idTime`),
  CONSTRAINT `fk_Projeto_Time` FOREIGN KEY (`Time_idTime`) REFERENCES `Time` (`idTime`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Projeto`
--

LOCK TABLES `Projeto` WRITE;
/*!40000 ALTER TABLE `Projeto` DISABLE KEYS */;
-- INSERT INTO `Projeto` VALUES (5,'projeto1','cliente1','objetivo1','2024-08-15','2024-09-20',425.22,8),(7,'projeto2','cliente2','objetivo3','2024-08-12','2024-09-21',425.55,12);
/*!40000 ALTER TABLE `Projeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Raca`
--

DROP TABLE IF EXISTS `Raca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Raca` (
  `idRaca` int NOT NULL AUTO_INCREMENT,
  `nomeRaca` varchar(45) NOT NULL,
  PRIMARY KEY (`idRaca`),
  UNIQUE KEY `idRaca_UNIQUE` (`idRaca`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Raca`
--

LOCK TABLES `Raca` WRITE;
/*!40000 ALTER TABLE `Raca` DISABLE KEYS */;
INSERT INTO `Raca` VALUES (1,'Branca'),(2,'Preta'),(3,'Amarela'),(4,'Parda'),(5,'Indigena');
/*!40000 ALTER TABLE `Raca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Time`
--

DROP TABLE IF EXISTS `Time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Time` (
  `idTime` int NOT NULL AUTO_INCREMENT,
  `nomeTime` varchar(45) NOT NULL,
  PRIMARY KEY (`idTime`),
  UNIQUE KEY `idTime_UNIQUE` (`idTime`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Time`
--

LOCK TABLES `Time` WRITE;
/*!40000 ALTER TABLE `Time` DISABLE KEYS */;
INSERT INTO `Time` VALUES (8,'Sem Time');
/*!40000 ALTER TABLE `Time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Time_Profissional`
--

DROP TABLE IF EXISTS `Time_Profissional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Time_Profissional` (
  `Time_idTime` int NOT NULL,
  `Profissional_idProfissional` int NOT NULL,
  PRIMARY KEY (`Time_idTime`,`Profissional_idProfissional`),
  KEY `fk_Time_has_Profissional_Profissional1_idx` (`Profissional_idProfissional`),
  KEY `fk_Time_has_Profissional_Time1_idx` (`Time_idTime`),
  CONSTRAINT `fk_Time_has_Profissional_Profissional1` FOREIGN KEY (`Profissional_idProfissional`) REFERENCES `Profissional` (`idProfissional`),
  CONSTRAINT `fk_Time_has_Profissional_Time1` FOREIGN KEY (`Time_idTime`) REFERENCES `Time` (`idTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Time_Profissional`
--

LOCK TABLES `Time_Profissional` WRITE;
/*!40000 ALTER TABLE `Time_Profissional` DISABLE KEYS */;
-- INSERT INTO `Time_Profissional` VALUES (12,4);
/*!40000 ALTER TABLE `Time_Profissional` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-08 21:43:53
