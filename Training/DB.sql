CREATE DATABASE  IF NOT EXISTS `sabretraining` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `sabretraining`;
-- MySQL dump 10.13  Distrib 5.5.16, for Win32 (x86)
--
-- Host: localhost    Database: sabretraining
-- ------------------------------------------------------
-- Server version	5.5.8

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sab_catalog`
--

DROP TABLE IF EXISTS `sab_catalog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sab_catalog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `parent` int(11) NOT NULL,
  `type` enum('l','f') DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  `modified_by` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sab_catalog`
--

LOCK TABLES `sab_catalog` WRITE;
/*!40000 ALTER TABLE `sab_catalog` DISABLE KEYS */;
INSERT INTO `sab_catalog` VALUES (1,'Day 1',0,'f','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(2,'Day 2',0,'f','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(3,'Day 3',0,'f','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(4,'Day 4',0,'f','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(5,'Day 5',0,'f','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(12,'Basic of Javascript',1,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(13,'Object orient Javascript(constructor, prototype)',1,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(14,'Javascript Console in Chrome/firefox',1,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(15,'JSON object',1,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(16,'MVC Pattern applied in JS(Extjs) and some exceptions that JS provide',1,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(17,'Introduction of Extjs4 documentation',1,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(18,'Introduction on basics of Extjs 4',1,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(19,'Ext Singleton with its methods for creating MVC skeleton for Applications',1,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(20,'Border layout and Viewport',1,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(21,'Component model(custom components and views)',2,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(22,'Component Layout',2,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(23,'Slider',2,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(24,'Progress Bar',2,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(25,'Form Components',2,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(26,'Tree Components',2,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(27,'Drag & Drop components',2,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(28,'PHP Mysql DataSource(sample DB code)',3,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(29,'Ext.Store Api config(CRUD)',3,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(30,'Working with Data(Store & Model)',3,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(31,'Visualizing Data into graphs and tables(grid)',3,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(32,'Grid Component',3,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(33,'Grid Filtering/ Search within the Grid Data',4,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(34,'Grid Live Search',4,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(35,'Grid to Hold Huge amount of Data (Grid Buffering Scrolling)',4,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(36,'Different Charts',4,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(37,'Persisting UI State',4,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(38,'Creating & Extending Classes',4,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(39,'Internationalization and Accessibility',4,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(40,'Building Ext And Your Project',5,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(41,'Introduction on Ext.direct and Testing(siesta)',5,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1),(42,'finally, Learning on how to learn extjs4',5,'l','2012-10-22 10:20:39',1,'2012-10-22 10:20:39',1);
/*!40000 ALTER TABLE `sab_catalog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sab_content`
--

DROP TABLE IF EXISTS `sab_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sab_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text,
  `description` text,
  `type` enum('t','u') NOT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  `modified_by` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sab_content`
--

LOCK TABLES `sab_content` WRITE;
/*!40000 ALTER TABLE `sab_content` DISABLE KEYS */;
/*!40000 ALTER TABLE `sab_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'sabretraining'
--

--
-- Dumping routines for database 'sabretraining'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2012-10-29  7:22:27
