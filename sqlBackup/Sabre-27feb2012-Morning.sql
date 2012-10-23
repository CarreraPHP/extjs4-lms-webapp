CREATE DATABASE  IF NOT EXISTS `sabre` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `sabre`;
-- MySQL dump 10.13  Distrib 5.1.58, for debian-linux-gnu (i686)
--
-- Host: localhost    Database: sabre
-- ------------------------------------------------------
-- Server version	5.1.58-1ubuntu1

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
-- Table structure for table `pt_module_meta`
--

DROP TABLE IF EXISTS `pt_module_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_module_meta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `access_userlevel` enum('READ','WRITE','BOTH') NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_date` int(11) NOT NULL,
  `updated_date` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `module_id` (`module_id`),
  CONSTRAINT `pt_module_meta_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `pt_user` (`id`),
  CONSTRAINT `pt_module_meta_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `pt_module` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_module_meta`
--

LOCK TABLES `pt_module_meta` WRITE;
/*!40000 ALTER TABLE `pt_module_meta` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_module_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_project_meta`
--

DROP TABLE IF EXISTS `pt_project_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_project_meta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_date` int(11) NOT NULL,
  `updated_date` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `pt_project_meta_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `pt_project` (`id`),
  CONSTRAINT `pt_project_meta_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `pt_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_project_meta`
--

LOCK TABLES `pt_project_meta` WRITE;
/*!40000 ALTER TABLE `pt_project_meta` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_project_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_module`
--

DROP TABLE IF EXISTS `pt_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `fk_pt_modules_created_by` (`created_by`),
  KEY `fk_pt_modules_updated_by` (`updated_by`),
  CONSTRAINT `fk_pt_modules_created_by` FOREIGN KEY (`created_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pt_modules_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_module`
--

LOCK TABLES `pt_module` WRITE;
/*!40000 ALTER TABLE `pt_module` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_language`
--

DROP TABLE IF EXISTS `pt_language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_language` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `language_name` varchar(100) NOT NULL,
  `language_deac` varchar(300) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_date` int(11) NOT NULL,
  `updated_date` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_language`
--

LOCK TABLES `pt_language` WRITE;
/*!40000 ALTER TABLE `pt_language` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_user_role`
--

DROP TABLE IF EXISTS `pt_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `created_date` int(11) NOT NULL,
  `updated_date` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pt_roles_created_by` (`created_by`),
  KEY `fk_pt_roles_updated_by` (`updated_by`),
  CONSTRAINT `fk_pt_roles_created_by` FOREIGN KEY (`created_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pt_roles_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_user_role`
--

LOCK TABLES `pt_user_role` WRITE;
/*!40000 ALTER TABLE `pt_user_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_project`
--

DROP TABLE IF EXISTS `pt_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(100) NOT NULL,
  `project_desc` text NOT NULL,
  `project_status` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL DEFAULT '0',
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_time` int(11) NOT NULL,
  `updated_time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_project`
--

LOCK TABLES `pt_project` WRITE;
/*!40000 ALTER TABLE `pt_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_team_meta`
--

DROP TABLE IF EXISTS `pt_team_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_team_meta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_date` int(11) NOT NULL,
  `updated_date` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `team_id` (`team_id`),
  CONSTRAINT `pt_team_meta_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `pt_user` (`id`),
  CONSTRAINT `pt_team_meta_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `pt_team` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_team_meta`
--

LOCK TABLES `pt_team_meta` WRITE;
/*!40000 ALTER TABLE `pt_team_meta` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_team_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_course`
--

DROP TABLE IF EXISTS `pt_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` text,
  `category_id` int(11) NOT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` int(11) NOT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sb_courses_category` (`category_id`),
  KEY `fk_pt_courses_created_by` (`created_by`),
  KEY `fk_pt_courses_updated_by` (`updated_by`),
  CONSTRAINT `fk_pt_courses_created_by` FOREIGN KEY (`created_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pt_courses_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sb_courses_category` FOREIGN KEY (`category_id`) REFERENCES `pt_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_course`
--

LOCK TABLES `pt_course` WRITE;
/*!40000 ALTER TABLE `pt_course` DISABLE KEYS */;
INSERT INTO `pt_course` VALUES (1,'home','content common for all users',1,1,1,'2012-02-26 22:42:41',1,'2012-02-26 22:42:41');
/*!40000 ALTER TABLE `pt_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_user_role_meta`
--

DROP TABLE IF EXISTS `pt_user_role_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_user_role_meta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `module_id` int(11) NOT NULL,
  `module_acess_level` enum('READ','WRITE','BOTH') NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_time` int(11) NOT NULL,
  `updated_time` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`,`role_id`,`module_id`),
  KEY `role_id` (`role_id`),
  KEY `module_id` (`module_id`),
  CONSTRAINT `pt_user_role_meta_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `pt_user_role` (`id`),
  CONSTRAINT `pt_user_role_meta_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `pt_module` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_user_role_meta`
--

LOCK TABLES `pt_user_role_meta` WRITE;
/*!40000 ALTER TABLE `pt_user_role_meta` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_user_role_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_content_types`
--

DROP TABLE IF EXISTS `pt_content_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_content_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` int(11) NOT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pt_content_types_created_by` (`created_by`),
  KEY `fk_pt_content_types_updated_by` (`updated_by`),
  CONSTRAINT `fk_pt_content_types_created_by` FOREIGN KEY (`created_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pt_content_types_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_content_types`
--

LOCK TABLES `pt_content_types` WRITE;
/*!40000 ALTER TABLE `pt_content_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_content_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_topics`
--

DROP TABLE IF EXISTS `pt_topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_topics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` text,
  `course_id` int(11) NOT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` int(11) NOT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sb_topics_course` (`course_id`),
  KEY `fk_pt_topics_created_by` (`created_by`),
  KEY `fk_pt_topics_updated_by` (`updated_by`),
  CONSTRAINT `fk_pt_topics_created_by` FOREIGN KEY (`created_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pt_topics_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sb_topics_course` FOREIGN KEY (`course_id`) REFERENCES `pt_course` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_topics`
--

LOCK TABLES `pt_topics` WRITE;
/*!40000 ALTER TABLE `pt_topics` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_category`
--

DROP TABLE IF EXISTS `pt_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `description` text,
  `parent_id` int(11) NOT NULL,
  `path` text,
  `sort_order` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` int(11) NOT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sb_mod_category_parent` (`parent_id`),
  KEY `fk_sb_mod_category_created_by` (`created_by`),
  KEY `fk_sb_mod_category_updated_by` (`updated_by`),
  CONSTRAINT `fk_sb_mod_category_created_by` FOREIGN KEY (`created_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sb_mod_category_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_category`
--

LOCK TABLES `pt_category` WRITE;
/*!40000 ALTER TABLE `pt_category` DISABLE KEYS */;
INSERT INTO `pt_category` VALUES (1,'top','invisible category',0,'0',1,1,'2012-02-26 22:30:15',1,'2012-02-26 22:30:15'),(2,'provider','provider vertical',1,'/1/',1,1,'2012-02-27 12:13:29',1,'2012-02-27 12:13:29');
/*!40000 ALTER TABLE `pt_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_meta_language`
--

DROP TABLE IF EXISTS `pt_meta_language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_meta_language` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_date` int(11) NOT NULL,
  `updated_date` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`,`language_id`),
  KEY `language_id` (`language_id`),
  CONSTRAINT `pt_meta_language_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `pt_project` (`id`),
  CONSTRAINT `pt_meta_language_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `pt_language` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_meta_language`
--

LOCK TABLES `pt_meta_language` WRITE;
/*!40000 ALTER TABLE `pt_meta_language` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_meta_language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_user_access_meta`
--

DROP TABLE IF EXISTS `pt_user_access_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_user_access_meta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `meta_unique` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` int(11) NOT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_access_meta_module` (`module_id`),
  KEY `fk_user_access_meta_created_by` (`created_by`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_user_access_meta`
--

LOCK TABLES `pt_user_access_meta` WRITE;
/*!40000 ALTER TABLE `pt_user_access_meta` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_user_access_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_content`
--

DROP TABLE IF EXISTS `pt_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` text,
  `text` longtext,
  `type_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` int(11) NOT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sb_content_course` (`course_id`),
  KEY `fk_sb_content_topic` (`topic_id`),
  KEY `fk_sb_content_type` (`type_id`),
  KEY `fk_pt_content_created_by` (`created_by`),
  KEY `fk_pt_content_updated_by` (`updated_by`),
  CONSTRAINT `fk_pt_content_created_by` FOREIGN KEY (`created_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pt_content_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sb_content_course` FOREIGN KEY (`course_id`) REFERENCES `pt_course` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sb_content_topic` FOREIGN KEY (`topic_id`) REFERENCES `pt_topics` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sb_content_type` FOREIGN KEY (`type_id`) REFERENCES `pt_content_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_content`
--

LOCK TABLES `pt_content` WRITE;
/*!40000 ALTER TABLE `pt_content` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_log`
--

DROP TABLE IF EXISTS `pt_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_log` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `module_id` int(11) NOT NULL,
  `sub_ids` varchar(45) DEFAULT NULL,
  `operation` enum('C','R','U','D') NOT NULL,
  `php_sessionid` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_date` int(11) NOT NULL,
  `updated_date` int(11) NOT NULL,
  PRIMARY KEY (`log_id`),
  KEY `user_id` (`user_id`),
  KEY `module_id` (`module_id`),
  KEY `fk_pt_log_created_by` (`created_by`),
  KEY `fk_pt_log_updated_by` (`updated_by`),
  CONSTRAINT `fk_pt_log_created_by` FOREIGN KEY (`created_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pt_log_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_log`
--

LOCK TABLES `pt_log` WRITE;
/*!40000 ALTER TABLE `pt_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_user_com`
--

DROP TABLE IF EXISTS `pt_user_com`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_user_com` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `communication_source` enum('T','M','A','F','E') NOT NULL COMMENT 'Telephone,mobile,Adress,Fax,Email',
  `communication_type` enum('H','O') NOT NULL COMMENT 'Home,office',
  `userd_id` int(11) NOT NULL,
  `primary_data` varchar(50) NOT NULL,
  `created_date` int(11) NOT NULL,
  `updated_date` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userd_id` (`userd_id`),
  CONSTRAINT `pt_user_com_ibfk_1` FOREIGN KEY (`userd_id`) REFERENCES `pt_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_user_com`
--

LOCK TABLES `pt_user_com` WRITE;
/*!40000 ALTER TABLE `pt_user_com` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_user_com` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_user`
--

DROP TABLE IF EXISTS `pt_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `screenname` varchar(50) NOT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `created_date` int(25) DEFAULT NULL,
  `updated_date` int(25) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `roles_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_role` (`roles_id`),
  KEY `user_role_2` (`roles_id`),
  CONSTRAINT `pt_user_ibfk_1` FOREIGN KEY (`roles_id`) REFERENCES `pt_user_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_user`
--

LOCK TABLES `pt_user` WRITE;
/*!40000 ALTER TABLE `pt_user` DISABLE KEYS */;
INSERT INTO `pt_user` VALUES (1,'Thameem',NULL,'Ansari','thameem',NULL,NULL,1325651846,1325651846,NULL,NULL,NULL),(2,'Thanalakshmi',NULL,'Senthurpandi','thanalakshmi',NULL,NULL,1325651959,1325651959,NULL,NULL,NULL),(3,'Charles',NULL,'Sundar','charless',NULL,NULL,1325651959,1325651959,NULL,NULL,NULL),(4,'Jegatheesh',NULL,'Pandian','jegatheesh',NULL,NULL,1325651959,1325651959,NULL,NULL,NULL),(5,'Manikandan',NULL,'Surendran','manigandan',NULL,NULL,1325651959,1325651959,NULL,NULL,NULL),(6,'Sasikumar',NULL,'karuppiah','sasikumar',NULL,NULL,1325651959,1325651959,NULL,NULL,NULL),(7,'Kaliraja',NULL,'Ponnuswamy','kaliraja',NULL,NULL,1325651959,1325651959,NULL,NULL,NULL),(8,'Murali',NULL,'Swaminathan','murali',NULL,NULL,1325651959,1325651959,NULL,NULL,NULL),(9,'Sivakarthikeyan',NULL,'Subramanian','sivakarthikeyan',NULL,NULL,1325651959,1325651959,NULL,NULL,NULL),(10,'Udaykumar',NULL,'Palani','udaykumar',NULL,NULL,1325651959,1325651959,NULL,NULL,NULL),(11,'Arulganabathy',NULL,'Arumugam','arulg',NULL,NULL,1325651959,1325651959,NULL,NULL,NULL),(12,'Gopikumar',NULL,'Arunachalam','gopi',NULL,NULL,1325651959,1325651959,NULL,NULL,NULL),(13,'Devaananth',NULL,'Devadoss','deva',NULL,NULL,1325651959,1325651959,NULL,NULL,NULL),(14,'Kathiresan',NULL,'Ganesan','kathir',NULL,NULL,1325651959,1325651959,NULL,NULL,NULL),(15,'Umamahesh',NULL,'Chandran','uma',NULL,'16ad5892d13a0b7c9220684e52a548b1',1325651959,1325651959,NULL,NULL,NULL),(16,'Manimaran',NULL,'Rajalingam','manimaran',NULL,NULL,1325651959,1325651959,NULL,NULL,NULL),(17,'Ramanathan',NULL,'Ravichandran','ramanathan',NULL,NULL,1325651959,1325651959,NULL,NULL,NULL),(18,'Satheeskumar',NULL,'Gurusamy','sathees',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(19,'Suyambulingam',NULL,'Ramasubbu','suyambu',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(20,'Yogesh',NULL,'Surendran','yogesh',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(21,'Nazeer',NULL,'P','nazeer',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(22,'Siva Chidambaram',NULL,'U','sivachidambaram',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(23,'SivaKumar',NULL,'N','sivakumar',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(24,'Selvaraj',NULL,'K','selvraj',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(25,'Josephravi',NULL,'A','josephravi',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(26,'Mani',NULL,'P','mani',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(27,'Presshanna',NULL,'S','presshanna',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(28,'Dineshkumar',NULL,'SaiMurali','dinesh',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(29,'bavithra',NULL,'J','bavithra',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(30,'sathishbabu',NULL,'k','sathishbabu',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(31,'Selvakumar',NULL,'J','selvakumar',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(32,'vandhana',NULL,'D','vandhana',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(33,'selvaraj',NULL,'selvaraj','selvaraj',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(34,'vijay',NULL,'vijay','vijay',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(35,'vijayaragavan',NULL,'Sampath','vijayaragavan',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(36,'pradeep',NULL,'Elangovan','pradeep',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(37,'manikandan',NULL,'manikandan','manikandan.S',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(38,'vinayagamoorthy',NULL,'P','Vinayagamoorthy',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(39,'Ramesh',NULL,'S','Ramesh',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(40,'meenakshi',NULL,'R.K','meenakshi',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(41,'vijayasarathy',NULL,'E','vijayasarathy',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(42,'meganathan',NULL,'P','meganathan',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(43,'prasanna',NULL,'kumar','prasannakumar',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(44,'vinayagamoorthy',NULL,'P','vinayagamoorthy',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL),(45,'Senthamizh',NULL,'Jagan','senthamizhjagan',NULL,NULL,1325651960,1325651960,NULL,NULL,NULL);
/*!40000 ALTER TABLE `pt_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_translation`
--

DROP TABLE IF EXISTS `pt_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_translation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keyword_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `content` varchar(300) NOT NULL,
  `content_desc` text NOT NULL,
  `refrence_url` varchar(200) NOT NULL,
  `refrence_image` varchar(150) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_time` int(11) NOT NULL,
  `updated_time` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `keyword_id` (`keyword_id`,`language_id`),
  KEY `language_id` (`language_id`),
  CONSTRAINT `pt_translation_ibfk_1` FOREIGN KEY (`keyword_id`) REFERENCES `pt_keywords` (`id`),
  CONSTRAINT `pt_translation_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `pt_language` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_translation`
--

LOCK TABLES `pt_translation` WRITE;
/*!40000 ALTER TABLE `pt_translation` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_translation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_keywords`
--

DROP TABLE IF EXISTS `pt_keywords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_keywords` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keyword_name` varchar(100) NOT NULL,
  `keyword_desc` varchar(300) NOT NULL,
  `keyword_status` enum('PENDING','APPROVED') NOT NULL,
  `language_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_date` int(11) NOT NULL,
  `updated_date` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `language_id` (`language_id`),
  CONSTRAINT `pt_keywords_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `pt_language` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_keywords`
--

LOCK TABLES `pt_keywords` WRITE;
/*!40000 ALTER TABLE `pt_keywords` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_keywords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_team`
--

DROP TABLE IF EXISTS `pt_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pt_team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teamname` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_date` int(11) NOT NULL,
  `updated_date` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_team`
--

LOCK TABLES `pt_team` WRITE;
/*!40000 ALTER TABLE `pt_team` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'sabre'
--

--
-- Dumping routines for database 'sabre'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2012-02-27 12:50:08
