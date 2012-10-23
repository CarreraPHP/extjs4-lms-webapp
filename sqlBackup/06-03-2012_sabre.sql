-- phpMyAdmin SQL Dump
-- version 3.3.3
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 06, 2012 at 08:08 PM
-- Server version: 5.5.17
-- PHP Version: 5.3.9-ZS5.6.0

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sabre`
--

-- --------------------------------------------------------

--
-- Table structure for table `pt_category`
--

DROP TABLE IF EXISTS `pt_category`;
CREATE TABLE IF NOT EXISTS `pt_category` (
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
  KEY `fk_sb_mod_category_updated_by` (`updated_by`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `pt_category`
--

INSERT INTO `pt_category` (`id`, `name`, `description`, `parent_id`, `path`, `sort_order`, `created_by`, `created_date`, `updated_by`, `updated_date`) VALUES
(1, 'top', 'invisible category', 0, '0', 1, 1, '2012-02-26 22:30:15', 1, '2012-02-26 22:30:15'),
(2, 'provider', 'provider vertical', 1, '/1/', 1, 1, '2012-02-27 12:13:29', 1, '2012-02-27 12:13:29'),
(3, 'foundation', 'foundation vertical', 2, '/1/2/', 1, 1, '2012-02-27 14:42:45', 1, '2012-02-27 14:42:51'),
(4, 'foundation - client specific', 'foundation client specific vertical', 2, '/1/2/', 2, 1, '2012-02-27 14:46:54', 1, '2012-02-27 14:46:54'),
(5, 'refresher training', 'refresher training vertical', 2, '/1/2/', 3, 1, '2012-02-27 14:48:45', 1, '2012-02-27 14:48:45'),
(6, 'refresher training - client specification', 'refresher training client specification vertical', 2, '/1/2/', 4, 1, '2012-02-27 14:50:20', 1, '2012-02-27 14:50:20'),
(7, 'payer', 'payer vertical', 1, '/1/', 2, 1, '2012-02-27 15:33:37', 1, '2012-02-27 15:33:37'),
(9, 'foundation', 'foundation vertical', 7, '/1/7/', 2, 1, '2012-02-27 19:25:30', 1, '2012-02-27 19:25:30'),
(10, 'foundation - client specific', 'foundation client specific vertical', 7, '/1/7/', 3, 1, '2012-02-27 19:25:30', 1, '2012-02-27 19:25:30'),
(11, 'refresher training', 'refresher training vertical', 7, '/1/7/', 4, 1, '2012-02-27 19:26:30', 1, '2012-02-27 19:26:30'),
(12, 'refresher training - client specification', 'refresher training client specification vertical', 7, '/1/7/', 5, 1, '2012-02-27 19:27:30', 1, '2012-02-27 19:27:30'),
(13, 'LVA', 'LVA Vertical', 1, '/1/', 3, 1, '2012-02-28 11:54:49', 1, '2012-02-28 11:54:49');

-- --------------------------------------------------------

--
-- Table structure for table `pt_content`
--

DROP TABLE IF EXISTS `pt_content`;
CREATE TABLE IF NOT EXISTS `pt_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(145) DEFAULT NULL,
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
  KEY `fk_pt_content_updated_by` (`updated_by`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `pt_content`
--

INSERT INTO `pt_content` (`id`, `name`, `description`, `text`, `type_id`, `topic_id`, `course_id`, `sort_order`, `created_by`, `created_date`, `updated_by`, `updated_date`) VALUES
(1, 'foundation Content1', 'foundation Content1', NULL, 1, 1, 10, 1, 1, '2012-02-28 13:31:07', 1, '2012-02-28 13:31:07'),
(2, 'foundation Content2', 'foundation Content2', NULL, 2, 1, 10, 2, 1, '2012-02-28 14:40:07', 1, '2012-02-28 14:40:07'),
(3, 'content1', 'foundation topic 2 content', NULL, 1, 2, 10, 1, 1, '2012-02-28 15:25:47', 1, '2012-02-28 15:25:47'),
(4, 'payer foundation content1', ' payer foundation topic content', NULL, 2, 3, 6, 1, 1, '2012-02-28 15:58:47', 1, '2012-02-28 15:58:47'),
(5, 'payer foundation content2', ' payer foundation topic content2', NULL, 2, 4, 6, 1, 1, '2012-02-28 16:04:47', 1, '2012-02-28 16:04:47'),
(6, 'payer foundation client specification content1', ' payer foundation client specification topic content', NULL, 2, 5, 7, 1, 1, '2012-02-28 16:04:47', 1, '2012-02-28 16:04:47'),
(8, 'payer foundation client specification content2', ' payer foundation client specification topic content', NULL, 2, 6, 7, 1, 1, '2012-02-28 16:04:47', 1, '2012-02-28 16:04:47'),
(9, 'payer refresher training content1', 'payer refresher training content1', NULL, 2, 7, 8, 1, 1, '2012-02-28 16:58:02', 1, '2012-02-28 16:58:02'),
(10, 'payer refresher training content2', 'payer refresher training content2', NULL, 2, 8, 8, 1, 1, '2012-02-28 16:59:02', 1, '2012-02-28 16:59:02'),
(11, 'payer refresher training client specification content1', 'payer refresher training client specification content2', NULL, 2, 9, 9, 1, 1, '2012-02-28 17:01:02', 1, '2012-02-28 17:01:02'),
(12, 'payer refresher training client specification content2', 'payer refresher training client specification content2', NULL, 2, 10, 9, 1, 1, '2012-02-28 17:01:02', 1, '2012-02-28 17:01:02');

-- --------------------------------------------------------

--
-- Table structure for table `pt_content_types`
--

DROP TABLE IF EXISTS `pt_content_types`;
CREATE TABLE IF NOT EXISTS `pt_content_types` (
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
  KEY `fk_pt_content_types_updated_by` (`updated_by`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `pt_content_types`
--

INSERT INTO `pt_content_types` (`id`, `name`, `description`, `sort_order`, `created_by`, `created_date`, `updated_by`, `updated_date`) VALUES
(1, 'HTML', 'content are displayed as HTML markups', 1, 1, '2012-02-28 12:37:45', 1, '2012-02-28 12:37:45'),
(2, 'PDF', 'Adobe acrobat doc file', 2, 1, '2012-02-28 12:37:45', 1, '2012-02-28 12:37:45'),
(3, 'IMAGE', 'image files', 3, 1, '2012-02-28 12:37:45', 1, '2012-02-28 12:37:45');

-- --------------------------------------------------------

--
-- Table structure for table `pt_course`
--

DROP TABLE IF EXISTS `pt_course`;
CREATE TABLE IF NOT EXISTS `pt_course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) DEFAULT NULL,
  `description` text,
  `category_id` int(11) NOT NULL,
  `path` varchar(45) DEFAULT NULL,
  `sort_order` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` int(11) NOT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sb_courses_category` (`category_id`),
  KEY `fk_pt_courses_created_by` (`created_by`),
  KEY `fk_pt_courses_updated_by` (`updated_by`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `pt_course`
--

INSERT INTO `pt_course` (`id`, `name`, `description`, `category_id`, `path`, `sort_order`, `created_by`, `created_date`, `updated_by`, `updated_date`) VALUES
(1, 'Home', 'content common for all users', 1, '/1/', 1, 1, '2012-02-26 22:42:41', 1, '2012-02-26 22:42:41'),
(2, 'foundation Course', 'foundation Course vertical', 3, '/1/2/3', 1, 1, '2012-02-28 11:37:42', 1, '2012-02-28 11:37:42'),
(3, 'foundation - client specific course', 'foundation - client specific course vertical', 4, '/1/2/4', 1, 1, '2012-02-28 11:42:02', 1, '2012-02-28 11:42:02'),
(4, 'refresher training course', 'refresher training course vertical', 5, '/1/2/5', 1, 1, '2012-02-28 11:43:02', 1, '2012-02-28 11:43:02'),
(5, 'refresher training - client specification Course', 'refresher training - client specification Course vertical', 6, '/1/2/6', 1, 1, '2012-02-28 11:46:10', 1, '2012-02-28 11:46:10'),
(6, 'foundation Course', 'foundation Course vertical', 9, '/1/7/9', 1, 1, '2012-02-28 11:48:10', 1, '2012-02-28 11:48:10'),
(7, 'foundation - client specific course', 'foundation - client specific course vertical', 10, '/1/7/10', 1, 1, '2012-02-28 11:49:10', 1, '2012-02-28 11:49:10'),
(8, 'refresher training course', 'refresher training course vertical', 11, '/1/7/11', 1, 1, '2012-02-28 11:51:10', 1, '2012-02-28 11:51:10'),
(9, 'refresher training - client specification Course', 'refresher training - client specification Course vertical', 12, '/1/7/12', 1, 1, '2012-02-28 11:52:40', 1, '2012-02-28 11:52:40'),
(10, 'LVA Course', 'LVA Course vertical', 13, '/1/13/', 1, 1, '2012-02-28 11:57:40', 1, '2012-02-28 11:57:40');

-- --------------------------------------------------------

--
-- Table structure for table `pt_keywords`
--

DROP TABLE IF EXISTS `pt_keywords`;
CREATE TABLE IF NOT EXISTS `pt_keywords` (
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
  KEY `language_id` (`language_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `pt_keywords`
--


-- --------------------------------------------------------

--
-- Table structure for table `pt_language`
--

DROP TABLE IF EXISTS `pt_language`;
CREATE TABLE IF NOT EXISTS `pt_language` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `language_name` varchar(100) NOT NULL,
  `language_deac` varchar(300) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_date` int(11) NOT NULL,
  `updated_date` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `pt_language`
--


-- --------------------------------------------------------

--
-- Table structure for table `pt_log`
--

DROP TABLE IF EXISTS `pt_log`;
CREATE TABLE IF NOT EXISTS `pt_log` (
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
  KEY `fk_pt_log_updated_by` (`updated_by`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `pt_log`
--


-- --------------------------------------------------------

--
-- Table structure for table `pt_meta_language`
--

DROP TABLE IF EXISTS `pt_meta_language`;
CREATE TABLE IF NOT EXISTS `pt_meta_language` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_date` int(11) NOT NULL,
  `updated_date` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`,`language_id`),
  KEY `language_id` (`language_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `pt_meta_language`
--


-- --------------------------------------------------------

--
-- Table structure for table `pt_module`
--

DROP TABLE IF EXISTS `pt_module`;
CREATE TABLE IF NOT EXISTS `pt_module` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `parent` varchar(15) NOT NULL,
  `description` text NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `fk_pt_modules_created_by` (`created_by`),
  KEY `fk_pt_modules_updated_by` (`updated_by`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `pt_module`
--

INSERT INTO `pt_module` (`id`, `name`, `parent`, `description`, `created_by`, `updated_by`, `created_date`, `updated_date`) VALUES
(1, 'Category', '', 'Category Module', 1, 1, '2012-03-02 15:29:51', '2012-03-02 15:28:55'),
(2, 'Course', '', 'module Course', 1, 1, '2012-03-02 15:26:54', '2012-03-02 15:26:54'),
(3, 'Topics', '', 'topics module', 1, 1, '2012-03-02 15:27:45', '2012-03-02 15:27:45'),
(4, 'Content', '', 'Content module', 1, 1, '2012-03-02 15:29:59', '2012-03-02 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `pt_module_meta`
--

DROP TABLE IF EXISTS `pt_module_meta`;
CREATE TABLE IF NOT EXISTS `pt_module_meta` (
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
  KEY `module_id` (`module_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `pt_module_meta`
--


-- --------------------------------------------------------

--
-- Table structure for table `pt_project`
--

DROP TABLE IF EXISTS `pt_project`;
CREATE TABLE IF NOT EXISTS `pt_project` (
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `pt_project`
--


-- --------------------------------------------------------

--
-- Table structure for table `pt_project_meta`
--

DROP TABLE IF EXISTS `pt_project_meta`;
CREATE TABLE IF NOT EXISTS `pt_project_meta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_date` int(11) NOT NULL,
  `updated_date` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`,`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `pt_project_meta`
--


-- --------------------------------------------------------

--
-- Table structure for table `pt_team`
--

DROP TABLE IF EXISTS `pt_team`;
CREATE TABLE IF NOT EXISTS `pt_team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teamname` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_date` int(11) NOT NULL,
  `updated_date` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `pt_team`
--


-- --------------------------------------------------------

--
-- Table structure for table `pt_team_meta`
--

DROP TABLE IF EXISTS `pt_team_meta`;
CREATE TABLE IF NOT EXISTS `pt_team_meta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_date` int(11) NOT NULL,
  `updated_date` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `team_id` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `pt_team_meta`
--


-- --------------------------------------------------------

--
-- Table structure for table `pt_topics`
--

DROP TABLE IF EXISTS `pt_topics`;
CREATE TABLE IF NOT EXISTS `pt_topics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(145) DEFAULT NULL,
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
  KEY `fk_pt_topics_updated_by` (`updated_by`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Dumping data for table `pt_topics`
--

INSERT INTO `pt_topics` (`id`, `name`, `description`, `course_id`, `sort_order`, `created_by`, `created_date`, `updated_by`, `updated_date`) VALUES
(1, 'LVA Topics1', 'foundation Topics', 10, 1, 1, '2012-02-28 13:16:42', 1, '2012-02-28 13:16:42'),
(2, 'LVA Topics2', 'foundation Topics2', 10, 1, 1, '2012-02-28 13:17:42', 1, '2012-02-28 13:17:42'),
(3, 'Payer Foundation Topic 1', 'Payer Foundation Topic 1', 6, 1, 1, '2012-02-28 15:29:25', 1, '2012-02-28 15:29:25'),
(4, 'Payer Foundation Topic 2', 'Payer Foundation Topic 2', 6, 2, 1, '2012-02-28 15:29:59', 1, '2012-02-28 15:29:59'),
(5, 'Payer Foundation - Client Specific Topic 1', 'Payer Foundation Client Specific Topic 1', 7, 1, 1, '2012-02-28 15:29:25', 1, '2012-02-28 15:29:25'),
(6, 'Payer Foundation Client Specific Topic 2', 'Payer Foundation Client Specific Topic 2', 7, 2, 1, '2012-02-28 15:29:59', 1, '2012-02-28 15:29:59'),
(7, 'Payer refresher training course Topic 1', 'Payer refresher training course Topic 1', 8, 1, 1, '2012-02-28 15:29:25', 1, '2012-02-28 15:29:25'),
(8, 'Payer refresher training course Topic 2', 'Payer refresher training course Topic 2', 8, 2, 1, '2012-02-28 15:29:59', 1, '2012-02-28 15:29:59'),
(9, 'refresher training client Specification Topic 1', 'Payer refresher training client Specification course Topic 1', 9, 1, 1, '2012-02-28 15:39:25', 1, '2012-02-28 15:39:25'),
(10, 'Payer refresher training client Specification course Topic 2', 'refresher training client Specification Topic 2', 9, 2, 1, '2012-02-28 15:39:59', 1, '2012-02-28 15:39:59'),
(11, 'Provider Foundation Topic 1', 'Provider Foundation course Topic 1', 2, 1, 1, '2012-02-28 15:39:25', 1, '2012-02-28 15:39:25'),
(12, 'Provider Foundation course Topic 2', 'Provider Foundation Topic 2', 2, 2, 1, '2012-02-28 15:39:59', 1, '2012-02-28 15:39:59'),
(13, 'Provider Foundation client specification Topic 1', 'Provider Foundation client specification course Topic 1', 3, 1, 1, '2012-02-28 15:39:25', 1, '2012-02-28 15:39:25'),
(14, 'Provider Foundation client specification course Topic 2', 'Provider Foundation client specification Topic 2', 3, 2, 1, '2012-02-28 15:49:59', 1, '2012-02-28 15:49:59'),
(15, 'Provider refresher training Topic 1', 'Provider refresher training course Topic 1', 4, 1, 1, '2012-02-28 15:53:25', 1, '2012-02-28 15:53:25'),
(16, 'Provider refresher training Topic 2', 'Provider refresher training Topic 2', 4, 2, 1, '2012-02-28 15:53:59', 1, '2012-02-28 15:53:59'),
(17, 'Provider refresher training client specification Topic 1', 'Provider refresher training client specification course Topic 1', 5, 1, 1, '2012-02-28 15:53:25', 1, '2012-02-28 15:53:25'),
(18, 'Provider refresher training client specification Topic 2', 'Provider refresher training client specification Topic 2', 5, 2, 1, '2012-02-28 15:53:59', 1, '2012-02-28 15:53:59');

-- --------------------------------------------------------

--
-- Table structure for table `pt_translation`
--

DROP TABLE IF EXISTS `pt_translation`;
CREATE TABLE IF NOT EXISTS `pt_translation` (
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
  KEY `language_id` (`language_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `pt_translation`
--


-- --------------------------------------------------------

--
-- Table structure for table `pt_user`
--

DROP TABLE IF EXISTS `pt_user`;
CREATE TABLE IF NOT EXISTS `pt_user` (
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
  KEY `user_role_2` (`roles_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=46 ;

--
-- Dumping data for table `pt_user`
--

INSERT INTO `pt_user` (`id`, `first_name`, `middle_name`, `last_name`, `screenname`, `user_email`, `password`, `created_date`, `updated_date`, `created_by`, `updated_by`, `roles_id`) VALUES
(1, 'Thameem', NULL, 'Ansari', 'thameem', NULL, NULL, 1325651846, 1325651846, NULL, NULL, NULL),
(2, 'Thanalakshmi', NULL, 'Senthurpandi', 'thanalakshmi', NULL, NULL, 1325651959, 1325651959, NULL, NULL, NULL),
(3, 'Charles', NULL, 'Sundar', 'charless', NULL, NULL, 1325651959, 1325651959, NULL, NULL, NULL),
(4, 'Jegatheesh', NULL, 'Pandian', 'jegatheesh', NULL, NULL, 1325651959, 1325651959, NULL, NULL, NULL),
(5, 'Manikandan', NULL, 'Surendran', 'manigandan', NULL, NULL, 1325651959, 1325651959, NULL, NULL, NULL),
(6, 'Sasikumar', NULL, 'karuppiah', 'sasikumar', NULL, NULL, 1325651959, 1325651959, NULL, NULL, NULL),
(7, 'Kaliraja', NULL, 'Ponnuswamy', 'kaliraja', NULL, NULL, 1325651959, 1325651959, NULL, NULL, NULL),
(8, 'Murali', NULL, 'Swaminathan', 'murali', NULL, NULL, 1325651959, 1325651959, NULL, NULL, NULL),
(9, 'Sivakarthikeyan', NULL, 'Subramanian', 'sivakarthikeyan', NULL, NULL, 1325651959, 1325651959, NULL, NULL, NULL),
(10, 'Udaykumar', NULL, 'Palani', 'udaykumar', NULL, NULL, 1325651959, 1325651959, NULL, NULL, NULL),
(11, 'Arulganabathy', NULL, 'Arumugam', 'arulg', NULL, NULL, 1325651959, 1325651959, NULL, NULL, NULL),
(12, 'Gopikumar', NULL, 'Arunachalam', 'gopi', NULL, NULL, 1325651959, 1325651959, NULL, NULL, NULL),
(13, 'Devaananth', NULL, 'Devadoss', 'deva', NULL, NULL, 1325651959, 1325651959, NULL, NULL, NULL),
(14, 'Kathiresan', NULL, 'Ganesan', 'kathir', NULL, NULL, 1325651959, 1325651959, NULL, NULL, NULL),
(15, 'Umamahesh', NULL, 'Chandran', 'uma', NULL, '16ad5892d13a0b7c9220684e52a548b1', 1325651959, 1325651959, NULL, NULL, NULL),
(16, 'Manimaran', NULL, 'Rajalingam', 'manimaran', NULL, NULL, 1325651959, 1325651959, NULL, NULL, NULL),
(17, 'Ramanathan', NULL, 'Ravichandran', 'ramanathan', NULL, NULL, 1325651959, 1325651959, NULL, NULL, NULL),
(18, 'Satheeskumar', NULL, 'Gurusamy', 'sathees', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(19, 'Suyambulingam', NULL, 'Ramasubbu', 'suyambu', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(20, 'Yogesh', NULL, 'Surendran', 'yogesh', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(21, 'Nazeer', NULL, 'P', 'nazeer', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(22, 'Siva Chidambaram', NULL, 'U', 'sivachidambaram', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(23, 'SivaKumar', NULL, 'N', 'sivakumar', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(24, 'Selvaraj', NULL, 'K', 'selvraj', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(25, 'Josephravi', NULL, 'A', 'josephravi', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(26, 'Mani', NULL, 'P', 'mani', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(27, 'Presshanna', NULL, 'S', 'presshanna', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(28, 'Dineshkumar', NULL, 'SaiMurali', 'dinesh', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(29, 'bavithra', NULL, 'J', 'bavithra', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(30, 'sathishbabu', NULL, 'k', 'sathishbabu', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(31, 'Selvakumar', NULL, 'J', 'selvakumar', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(32, 'vandhana', NULL, 'D', 'vandhana', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(33, 'selvaraj', NULL, 'selvaraj', 'selvaraj', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(34, 'vijay', NULL, 'vijay', 'vijay', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(35, 'vijayaragavan', NULL, 'Sampath', 'vijayaragavan', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(36, 'pradeep', NULL, 'Elangovan', 'pradeep', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(37, 'manikandan', NULL, 'manikandan', 'manikandan.S', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(38, 'vinayagamoorthy', NULL, 'P', 'Vinayagamoorthy', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(39, 'Ramesh', NULL, 'S', 'Ramesh', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(40, 'meenakshi', NULL, 'R.K', 'meenakshi', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(41, 'vijayasarathy', NULL, 'E', 'vijayasarathy', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(42, 'meganathan', NULL, 'P', 'meganathan', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(43, 'prasanna', NULL, 'kumar', 'prasannakumar', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(44, 'vinayagamoorthy', NULL, 'P', 'vinayagamoorthy', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL),
(45, 'Senthamizh', NULL, 'Jagan', 'senthamizhjagan', NULL, NULL, 1325651960, 1325651960, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pt_user_access_meta`
--

DROP TABLE IF EXISTS `pt_user_access_meta`;
CREATE TABLE IF NOT EXISTS `pt_user_access_meta` (
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `pt_user_access_meta`
--


-- --------------------------------------------------------

--
-- Table structure for table `pt_user_com`
--

DROP TABLE IF EXISTS `pt_user_com`;
CREATE TABLE IF NOT EXISTS `pt_user_com` (
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
  KEY `userd_id` (`userd_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `pt_user_com`
--


-- --------------------------------------------------------

--
-- Table structure for table `pt_user_role`
--

DROP TABLE IF EXISTS `pt_user_role`;
CREATE TABLE IF NOT EXISTS `pt_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `created_date` int(11) NOT NULL,
  `updated_date` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pt_roles_created_by` (`created_by`),
  KEY `fk_pt_roles_updated_by` (`updated_by`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `pt_user_role`
--


-- --------------------------------------------------------

--
-- Table structure for table `pt_user_role_meta`
--

DROP TABLE IF EXISTS `pt_user_role_meta`;
CREATE TABLE IF NOT EXISTS `pt_user_role_meta` (
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
  KEY `module_id` (`module_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `pt_user_role_meta`
--


--
-- Constraints for dumped tables
--

--
-- Constraints for table `pt_category`
--
ALTER TABLE `pt_category`
  ADD CONSTRAINT `fk_sb_mod_category_created_by` FOREIGN KEY (`created_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_sb_mod_category_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `pt_content`
--
ALTER TABLE `pt_content`
  ADD CONSTRAINT `fk_pt_content_created_by` FOREIGN KEY (`created_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pt_content_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_sb_content_course` FOREIGN KEY (`course_id`) REFERENCES `pt_course` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_sb_content_topic` FOREIGN KEY (`topic_id`) REFERENCES `pt_topics` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_sb_content_type` FOREIGN KEY (`type_id`) REFERENCES `pt_content_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `pt_content_types`
--
ALTER TABLE `pt_content_types`
  ADD CONSTRAINT `fk_pt_content_types_created_by` FOREIGN KEY (`created_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pt_content_types_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `pt_course`
--
ALTER TABLE `pt_course`
  ADD CONSTRAINT `fk_pt_courses_created_by` FOREIGN KEY (`created_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pt_courses_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_sb_courses_category` FOREIGN KEY (`category_id`) REFERENCES `pt_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `pt_keywords`
--
ALTER TABLE `pt_keywords`
  ADD CONSTRAINT `pt_keywords_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `pt_language` (`id`);

--
-- Constraints for table `pt_log`
--
ALTER TABLE `pt_log`
  ADD CONSTRAINT `fk_pt_log_created_by` FOREIGN KEY (`created_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pt_log_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `pt_meta_language`
--
ALTER TABLE `pt_meta_language`
  ADD CONSTRAINT `pt_meta_language_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `pt_project` (`id`),
  ADD CONSTRAINT `pt_meta_language_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `pt_language` (`id`);

--
-- Constraints for table `pt_module`
--
ALTER TABLE `pt_module`
  ADD CONSTRAINT `fk_pt_modules_created_by` FOREIGN KEY (`created_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pt_modules_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `pt_module_meta`
--
ALTER TABLE `pt_module_meta`
  ADD CONSTRAINT `pt_module_meta_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `pt_user` (`id`),
  ADD CONSTRAINT `pt_module_meta_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `pt_module` (`id`);

--
-- Constraints for table `pt_project_meta`
--
ALTER TABLE `pt_project_meta`
  ADD CONSTRAINT `pt_project_meta_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `pt_project` (`id`),
  ADD CONSTRAINT `pt_project_meta_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `pt_user` (`id`);

--
-- Constraints for table `pt_team_meta`
--
ALTER TABLE `pt_team_meta`
  ADD CONSTRAINT `pt_team_meta_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `pt_user` (`id`),
  ADD CONSTRAINT `pt_team_meta_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `pt_team` (`id`);

--
-- Constraints for table `pt_topics`
--
ALTER TABLE `pt_topics`
  ADD CONSTRAINT `fk_pt_topics_created_by` FOREIGN KEY (`created_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pt_topics_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_sb_topics_course` FOREIGN KEY (`course_id`) REFERENCES `pt_course` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `pt_translation`
--
ALTER TABLE `pt_translation`
  ADD CONSTRAINT `pt_translation_ibfk_1` FOREIGN KEY (`keyword_id`) REFERENCES `pt_keywords` (`id`),
  ADD CONSTRAINT `pt_translation_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `pt_language` (`id`);

--
-- Constraints for table `pt_user`
--
ALTER TABLE `pt_user`
  ADD CONSTRAINT `pt_user_ibfk_1` FOREIGN KEY (`roles_id`) REFERENCES `pt_user_role` (`id`);

--
-- Constraints for table `pt_user_com`
--
ALTER TABLE `pt_user_com`
  ADD CONSTRAINT `pt_user_com_ibfk_1` FOREIGN KEY (`userd_id`) REFERENCES `pt_user` (`id`);

--
-- Constraints for table `pt_user_role`
--
ALTER TABLE `pt_user_role`
  ADD CONSTRAINT `fk_pt_roles_created_by` FOREIGN KEY (`created_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pt_roles_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `pt_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `pt_user_role_meta`
--
ALTER TABLE `pt_user_role_meta`
  ADD CONSTRAINT `pt_user_role_meta_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `pt_user_role` (`id`),
  ADD CONSTRAINT `pt_user_role_meta_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `pt_module` (`id`);
