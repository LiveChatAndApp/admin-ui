-- MySQL dump 10.14  Distrib 5.5.60-MariaDB, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: oa
-- ------------------------------------------------------
-- Server version	5.5.60-MariaDB

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
-- Table structure for table `acl`
--

DROP TABLE IF EXISTS `acl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `pid` bigint(20) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `orders` bigint(20) DEFAULT NULL,
  `label` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl`
--

LOCK TABLES `acl` WRITE;
/*!40000 ALTER TABLE `acl` DISABLE KEYS */;
INSERT INTO `acl` VALUES (1,-1,'PERMISSION',1,'權限管理'),(2,1,'ACL_GROUP',1,'權限組列表'),(3,1,'ACL_USER',1,'成員列表'),(4,1,'ACL_CREATE_GROUP',1,'創建組功能'),(5,-1,'DEPOSIT',1,'存款明細'),(6,-1,'SYSCONFIG',1,'系統管理'),(7,-1,'COMAPNY',1,'公司信息');
/*!40000 ALTER TABLE `acl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_group`
--

DROP TABLE IF EXISTS `acl_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_group` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `creator` varchar(100) DEFAULT NULL,
  `updater` varchar(100) DEFAULT NULL,
  `ctime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lvl` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `utime` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_group`
--

LOCK TABLES `acl_group` WRITE;
/*!40000 ALTER TABLE `acl_group` DISABLE KEYS */;
INSERT INTO `acl_group` VALUES (1,'administratar',1,'god',NULL,'2018-08-24 02:38:59',1,-1,NULL),(5,'mygod',1,'znikang','znikang','2018-09-23 12:36:53',2,1,'2018-09-23 20:37:03'),(6,'level3',1,'znikang','znikang','2018-09-23 12:40:04',3,5,'2018-09-23 20:40:14');
/*!40000 ALTER TABLE `acl_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_group_auth`
--

DROP TABLE IF EXISTS `acl_group_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_group_auth` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `gid` varchar(100) DEFAULT NULL,
  `acl_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_group_auth`
--

LOCK TABLES `acl_group_auth` WRITE;
/*!40000 ALTER TABLE `acl_group_auth` DISABLE KEYS */;
INSERT INTO `acl_group_auth` VALUES (1,'1','1'),(2,'1','2'),(3,'1','3'),(4,'1','4'),(5,'1','5'),(6,'1','6'),(7,'1','7'),(8,'5','5'),(9,'5','6'),(10,'5','7'),(11,'6','6'),(12,'6','7');
/*!40000 ALTER TABLE `acl_group_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acl_user`
--

DROP TABLE IF EXISTS `acl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acl_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `bid` varchar(100) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `operator` varchar(100) DEFAULT NULL,
  `ctime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `group_id` int(11) DEFAULT NULL,
  `utime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acl_user`
--

LOCK TABLES `acl_user` WRITE;
/*!40000 ALTER TABLE `acl_user` DISABLE KEYS */;
INSERT INTO `acl_user` VALUES (1,'znikang','62c8ad0a15d9d1ca38d5dee762a16e01','1',1,NULL,'2018-09-12 08:16:16',1,'2018-08-23 09:11:16'),(2,'leo','46F94C8DE14FB36680850768FF1B7F2A','1',1,NULL,'2018-09-12 08:16:16',1,'2018-08-23 09:11:16'),(4,'admin','62C8AD0A15D9D1CA38D5DEE762A16E01',NULL,1,NULL,'2018-09-17 06:55:56',1,'2018-09-17 14:56:15');
/*!40000 ALTER TABLE `acl_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `balance`
--

DROP TABLE IF EXISTS `balance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `balance` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,0) DEFAULT NULL,
  `beforeBalance` decimal(10,0) DEFAULT NULL,
  `afterBalance` decimal(10,0) DEFAULT NULL,
  `cardBCID` bigint(20) DEFAULT NULL,
  `opUID` bigint(20) DEFAULT NULL,
  `opLoginName` varchar(100) DEFAULT NULL,
  `opTime` timestamp NULL DEFAULT NULL,
  `opRemark` varchar(100) DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `commapnyID` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `balance`
--

LOCK TABLES `balance` WRITE;
/*!40000 ALTER TABLE `balance` DISABLE KEYS */;
/*!40000 ALTER TABLE `balance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bankcardinfo`
--

DROP TABLE IF EXISTS `bankcardinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bankcardinfo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `companyname` varchar(100) DEFAULT NULL,
  `bankname` varchar(100) DEFAULT NULL,
  `cardname` varchar(100) DEFAULT NULL,
  `cardnumber` varchar(100) DEFAULT NULL,
  `loginname` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `usbtype` int(11) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bankcardinfo`
--

LOCK TABLES `bankcardinfo` WRITE;
/*!40000 ALTER TABLE `bankcardinfo` DISABLE KEYS */;
INSERT INTO `bankcardinfo` VALUES (1,'APGAME','山東分行','徐小坡','1234567890121234','1234567890121234','1234qwer',1,'2018-08-22 02:38:36'),(2,'APGAME','山東分行','徐小坡','6214835786932523','6214835786932523','1234qwer',1,'2018-08-22 06:56:03');
/*!40000 ALTER TABLE `bankcardinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bankinfo`
--

DROP TABLE IF EXISTS `bankinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bankinfo` (
  `bankcode` varchar(100) NOT NULL,
  `bankname` varchar(100) DEFAULT NULL,
  `bankfullname` varchar(100) DEFAULT NULL,
  `bankenglishname` varchar(100) DEFAULT NULL,
  `sortno` int(11) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `notice` varchar(100) DEFAULT NULL,
  `telphone` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`bankcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bankinfo`
--

LOCK TABLES `bankinfo` WRITE;
/*!40000 ALTER TABLE `bankinfo` DISABLE KEYS */;
INSERT INTO `bankinfo` VALUES ('3123123','aaaa','daadasdadasda','dasdadasda',1,'http://sasdasd','dasdad','qweqeqwe','dasdasdsd'),('abcd','q1qeee','q1qweee','qdddd',1,NULL,'1q','1q','1q');
/*!40000 ALTER TABLE `bankinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `bossname` varchar(100) DEFAULT NULL,
  `telphone` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `englishname` varchar(100) DEFAULT NULL,
  `level` varchar(100) DEFAULT NULL,
  `adduid` varchar(100) DEFAULT NULL,
  `ctime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `utime` datetime DEFAULT NULL,
  `depositrate` decimal(10,0) DEFAULT NULL,
  `payrate` decimal(10,0) DEFAULT NULL,
  `paycount` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'中文',1,'mygod','1345678','q','english',NULL,NULL,'2018-09-14 10:10:13',NULL,1,1,NULL);
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `control_event`
--

DROP TABLE IF EXISTS `control_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `control_event` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` varchar(100) DEFAULT NULL,
  `ctime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `dotimes` int(11) DEFAULT NULL,
  `nextexctime` datetime DEFAULT NULL,
  `companyId` bigint(20) DEFAULT NULL,
  `memo` varchar(500) DEFAULT NULL,
  `ordersn` varchar(100) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `control_event`
--

LOCK TABLES `control_event` WRITE;
/*!40000 ALTER TABLE `control_event` DISABLE KEYS */;
INSERT INTO `control_event` VALUES (1,'3','2018-09-20 07:34:30',9,'2018-09-20 15:27:43',1,'1212321','2018092010080332311289938668E8016',1),(2,'3','2018-09-20 07:37:23',4,'2018-09-20 15:24:09',1,'1212321','20180920100717621FF7796DB8EDCB6B9',1),(3,'3','2018-09-20 07:37:25',4,'2018-09-20 15:24:36',1,'1212321','2018092000132141025CBED35A1919EEE',1),(4,'3','2018-09-20 07:39:19',3,'2018-09-20 15:20:39',1,'1212321','201809200000589040E1FE15024129F9E',1),(5,'3','2018-09-20 07:39:21',2,'2018-09-20 15:20:29',1,'1212321','20180919235958499E183385120D8EFB7',1),(6,'3','2018-09-20 08:22:19',1,'2018-09-20 16:22:07',1,'','20180919235958499E183385120D8EFB7',0),(7,'3','2018-09-20 08:25:23',1,'2018-09-20 16:25:09',1,'','20180919235958499E183385120D8EFB7',0),(8,'3','2018-09-20 08:27:49',1,'2018-09-20 16:27:43',1,'','20180919235958499E183385120D8EFB7',0);
/*!40000 ALTER TABLE `control_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `depositBankCard`
--

DROP TABLE IF EXISTS `depositBankCard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `depositBankCard` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `bankInfoCode` varchar(100) DEFAULT NULL,
  `cardNumber` varchar(100) DEFAULT NULL,
  `cardName` varchar(100) DEFAULT NULL,
  `cardType` tinyint(4) DEFAULT NULL,
  `companyId` bigint(20) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `remark` text,
  `createUID` bigint(20) DEFAULT NULL,
  `ctime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lastModifyUID` int(11) DEFAULT NULL,
  `lastModifyTime` datetime DEFAULT NULL,
  `iPPort` varchar(100) DEFAULT NULL,
  `loginName` varchar(100) DEFAULT NULL,
  `passwordLogin` varchar(100) DEFAULT NULL,
  `passwordShield` varchar(100) DEFAULT NULL,
  `usbType` tinyint(4) DEFAULT NULL,
  `depositStart` decimal(10,0) DEFAULT NULL,
  `depositEnd` decimal(10,0) DEFAULT NULL,
  `feeRatio` decimal(10,0) DEFAULT NULL,
  `companyName` varchar(100) DEFAULT NULL,
  `companyNameEN` varchar(100) DEFAULT NULL,
  `balance` decimal(10,0) DEFAULT NULL,
  `lastUpdateBalanceTime` datetime DEFAULT NULL,
  `lastClientActiveTime` datetime DEFAULT NULL,
  `companyPName` varchar(100) DEFAULT NULL,
  `companyPNameEN` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `depositBankCard`
--

LOCK TABLES `depositBankCard` WRITE;
/*!40000 ALTER TABLE `depositBankCard` DISABLE KEYS */;
INSERT INTO `depositBankCard` VALUES (7,'招商銀行','4444555566667777','收款王',1,1,1,'',NULL,'2018-09-18 07:03:45',NULL,NULL,NULL,'','',NULL,NULL,100,20000,NULL,'中文',NULL,NULL,NULL,NULL,NULL,NULL),(8,'招商銀行','3333222211110000','張大川',1,1,1,'',NULL,'2018-09-18 08:02:14',NULL,NULL,NULL,'','',NULL,NULL,23,1454,NULL,'中文',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `depositBankCard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `depositRecord`
--

DROP TABLE IF EXISTS `depositRecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `depositRecord` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `orderNo` varchar(100) DEFAULT NULL,
  `feeRatio` decimal(10,6) DEFAULT NULL,
  `feeTotal` decimal(10,6) DEFAULT NULL,
  `beforeBalance` decimal(10,6) DEFAULT NULL,
  `afterBalance` decimal(10,6) DEFAULT NULL,
  `companyId` bigint(20) DEFAULT NULL,
  `remark` text,
  `ctime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `noticeStatus` tinyint(4) DEFAULT NULL,
  `noticeLastTime` datetime DEFAULT NULL,
  `noticeTimes` int(11) DEFAULT NULL,
  `companyName` varchar(100) DEFAULT NULL,
  `companyNameEN` varchar(100) DEFAULT NULL,
  `depositTime` datetime DEFAULT NULL,
  `depositBankCardID` int(11) DEFAULT NULL,
  `depositBankTypeCode` varchar(100) DEFAULT NULL,
  `depositBankName` varchar(100) DEFAULT NULL,
  `depositAccountName` varchar(100) DEFAULT NULL,
  `depositCardNumber` varchar(100) DEFAULT NULL,
  `depositAmount` decimal(10,6) DEFAULT NULL,
  `clientBankTypeCode` varchar(100) DEFAULT NULL,
  `clientBankName` varchar(100) DEFAULT NULL,
  `clientAccountName` varchar(100) DEFAULT NULL,
  `clientCardNumber` varchar(100) DEFAULT NULL,
  `clientProgramSource` varchar(100) DEFAULT NULL,
  `postScript` varchar(100) DEFAULT NULL,
  `transtype` varchar(100) DEFAULT NULL,
  `companyPName` varchar(100) DEFAULT NULL,
  `companyPNameEN` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `depositRecord`
--

LOCK TABLES `depositRecord` WRITE;
/*!40000 ALTER TABLE `depositRecord` DISABLE KEYS */;
INSERT INTO `depositRecord` VALUES (12,'20180918170821049CA5ED61330B8955E',NULL,NULL,NULL,15.010000,NULL,NULL,'2018-09-20 07:55:03',1,NULL,NULL,'中文',NULL,'2018-09-19 13:33:49',NULL,NULL,'招商銀行','收款王','4444555566667777',15.010000,NULL,NULL,'張大山',NULL,NULL,'84180','支付寶',NULL,NULL),(13,'201809181709338004E18D16E43FC567E',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-18 09:09:11',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','收款王','4444555566667777',16.000000,NULL,NULL,'張大山',NULL,NULL,'18920','支付寶',NULL,NULL),(14,'2018091817113730266A00F5105FBF0A2',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-18 09:11:14',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','收款王','4444555566667777',15.020000,NULL,NULL,'張大山',NULL,NULL,'73764','支付寶',NULL,NULL),(15,'20180919124451845BC9BE05FAB35146F',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 04:44:26',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','收款王','4444555566667777',15.320000,NULL,NULL,'張大山',NULL,NULL,'52837','支付寶',NULL,NULL),(16,'20180919184837205E677D241A65D390E',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 10:48:11',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','收款王','4444555566667777',111.030000,NULL,NULL,'張大山',NULL,NULL,'33263','支付寶',NULL,NULL),(17,'20180919185428551DF796B48E256B62B',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 10:54:02',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','張大川','3333222211110000',111.010000,NULL,NULL,'張大山',NULL,NULL,'30772','支付寶',NULL,NULL),(18,'20180919190239955A5AC36B5B4621F14',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 11:02:13',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','收款王','4444555566667777',111.010000,NULL,NULL,'張大山',NULL,NULL,'17809','支付寶',NULL,NULL),(19,'201809192250231119956C34CC848FAEE',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 14:49:56',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','張大川','3333222211110000',111.020000,NULL,NULL,'張大山',NULL,NULL,'73189','支付寶',NULL,NULL),(20,'2018091922515223911D2554CFA498309',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 14:51:25',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','收款王','4444555566667777',111.010000,NULL,NULL,'張大山',NULL,NULL,'15297','支付寶',NULL,NULL),(21,'20180919225402798D1C6F8EABC6E24B8',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 14:53:36',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','張大川','3333222211110000',111.010000,NULL,NULL,'張大山',NULL,NULL,'36187','支付寶',NULL,NULL),(22,'201809192258011175F8304175C6568E0',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 14:57:34',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','張大川','3333222211110000',111.020000,NULL,NULL,'張大山',NULL,NULL,'48392','支付寶',NULL,NULL),(23,'201809192303462845892B0F154D3432A',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 15:03:19',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','張大川','3333222211110000',111.190000,NULL,NULL,'張大山',NULL,NULL,'22093','支付寶',NULL,NULL),(24,'20180919230531378F2E96E56DC212C28',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 15:05:04',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','收款王','4444555566667777',111.010000,NULL,NULL,'張大山',NULL,NULL,'09690','支付寶',NULL,NULL),(25,'20180919230618404A1649455C572D1FD',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 15:05:51',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','張大川','3333222211110000',111.010000,NULL,NULL,'張大山',NULL,NULL,'55276','支付寶',NULL,NULL),(26,'2018091923082738939C22E20C20CC109',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 15:08:00',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','收款王','4444555566667777',111.010000,NULL,NULL,'張大山',NULL,NULL,'97869','支付寶',NULL,NULL),(27,'201809192309346532A2DE400E488EB64',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 15:09:07',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','收款王','4444555566667777',111.010000,NULL,NULL,'張大山',NULL,NULL,'69858','支付寶',NULL,NULL),(28,'201809192310325424C7EE063D4F2613B',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 15:10:05',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','張大川','3333222211110000',111.050000,NULL,NULL,'張大山',NULL,NULL,'27205','支付寶',NULL,NULL),(29,'20180919231631520E0E73FB11C47F8BA',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 15:16:04',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','張大川','3333222211110000',111.010000,NULL,NULL,'張大山',NULL,NULL,'15749','支付寶',NULL,NULL),(30,'2018091923180316519BEEEF9EF69EE12',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 15:17:36',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','張大川','3333222211110000',111.010000,NULL,NULL,'張大山',NULL,NULL,'06972','支付寶',NULL,NULL),(31,'201809192320498413EF77C4F8E1D1E69',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 15:20:23',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','收款王','4444555566667777',111.010000,NULL,NULL,'張大山',NULL,NULL,'13684','支付寶',NULL,NULL),(32,'201809192321436404F52FBE27A176232',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 15:21:16',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','收款王','4444555566667777',111.010000,NULL,NULL,'張大山',NULL,NULL,'02965','支付寶',NULL,NULL),(33,'20180919232839697DD6CCD0BFECDBED2',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 15:28:12',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','收款王','4444555566667777',111.010000,NULL,NULL,'張大山',NULL,NULL,'87145','支付寶',NULL,NULL),(34,'20180919233448367ACAC3D7FE51DD5EE',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 15:34:21',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','張大川','3333222211110000',111.010000,NULL,NULL,'張大山',NULL,NULL,'87285','支付寶',NULL,NULL),(35,'20180919233833810729666D64A9A8FE0',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 15:38:07',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','收款王','4444555566667777',111.010000,NULL,NULL,'張大山',NULL,NULL,'58833','支付寶',NULL,NULL),(36,'20180919233925552FE900B7F7B141C51',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 15:38:58',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','收款王','4444555566667777',111.010000,NULL,NULL,'張大山',NULL,NULL,'74572','支付寶',NULL,NULL),(37,'20180919234046993961477F3FBD617BE',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 15:40:20',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','張大川','3333222211110000',111.010000,NULL,NULL,'張大山',NULL,NULL,'82972','支付寶',NULL,NULL),(38,'20180919234214467927A07AC59E62ABF',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 15:41:47',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','張大川','3333222211110000',111.010000,NULL,NULL,'張大山',NULL,NULL,'36225','支付寶',NULL,NULL),(39,'201809192357293354942E5524A26A617',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 15:57:02',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','收款王','4444555566667777',111.010000,NULL,NULL,'張大山',NULL,NULL,'81640','支付寶',NULL,NULL),(40,'20180919235958499E183385120D8EFB7',NULL,NULL,NULL,111.010000,NULL,NULL,'2018-09-20 08:27:49',3,NULL,NULL,'中文',NULL,'2018-09-20 16:27:41',NULL,NULL,'招商銀行','張大川','3333222211110000',111.010000,NULL,NULL,'張大山',NULL,NULL,'88473','支付寶',NULL,NULL),(41,'201809200000589040E1FE15024129F9E',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 16:00:32',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','收款王','4444555566667777',111.010000,NULL,NULL,'張大山',NULL,NULL,'25361','支付寶',NULL,NULL),(42,'2018092000132141025CBED35A1919EEE',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-19 16:12:54',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','張大川','3333222211110000',111.010000,NULL,NULL,'張大山',NULL,NULL,'29996','支付寶',NULL,NULL),(43,'20180920100717621FF7796DB8EDCB6B9',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-20 02:06:49',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','張大川','3333222211110000',31.010000,NULL,NULL,'張大山',NULL,NULL,'64904','支付寶',NULL,NULL),(44,'2018092010080332311289938668E8016',NULL,NULL,NULL,NULL,NULL,NULL,'2018-09-20 02:07:35',1,NULL,NULL,'中文',NULL,NULL,NULL,NULL,'招商銀行','張大川','3333222211110000',31.100000,NULL,NULL,'張大山',NULL,NULL,'41761','支付寶',NULL,NULL);
/*!40000 ALTER TABLE `depositRecord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deposit_interface`
--

DROP TABLE IF EXISTS `deposit_interface`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deposit_interface` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `company_id` bigint(20) DEFAULT NULL,
  `apikey` varchar(100) DEFAULT NULL,
  `secretkey` varchar(1024) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `whitelist` varchar(100) DEFAULT NULL,
  `callback` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposit_interface`
--

LOCK TABLES `deposit_interface` WRITE;
/*!40000 ALTER TABLE `deposit_interface` DISABLE KEYS */;
INSERT INTO `deposit_interface` VALUES (1,1,'427C83A0BCB1C22490FD97AE15E7DD18','89C7E9A97F8018B25C5F84BB32C01165',1,NULL,'http://127.0.0.1:8991/test/addbankinfo');
/*!40000 ALTER TABLE `deposit_interface` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `depositdata`
--

DROP TABLE IF EXISTS `depositdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `depositdata` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_number` varchar(100) DEFAULT NULL,
  `amount` varchar(100) DEFAULT NULL,
  `deposit_cardnumber` varchar(100) DEFAULT NULL,
  `deposit_cardbalance` varchar(100) DEFAULT NULL,
  `client_bankname` varchar(100) DEFAULT NULL,
  `client_accountname` varchar(100) DEFAULT NULL,
  `client_cardnumber` varchar(100) DEFAULT NULL,
  `client_postscript` varchar(100) DEFAULT NULL,
  `client_transtype` varchar(100) DEFAULT NULL,
  `remark` varchar(100) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `depositdata`
--

LOCK TABLES `depositdata` WRITE;
/*!40000 ALTER TABLE `depositdata` DISABLE KEYS */;
/*!40000 ALTER TABLE `depositdata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupinfo`
--

DROP TABLE IF EXISTS `groupinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groupinfo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `enname` varchar(100) DEFAULT NULL,
  `principal` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupinfo`
--

LOCK TABLES `groupinfo` WRITE;
/*!40000 ALTER TABLE `groupinfo` DISABLE KEYS */;
INSERT INTO `groupinfo` VALUES (1,'中文好','godbless','領導好','12345678','myhome'),(2,'中文好3','godbless2','領導好3','123456784','myhome1'),(3,'dddd','d','d','d','d'),(4,'中文好3','中文好3','領導好3d','123456784','myhome1'),(5,'d31231','d31231','d','d','d'),(6,'dddd','d31231','ddasdad','d','d'),(7,'a','a','c','d','e');
/*!40000 ALTER TABLE `groupinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `op_log`
--

DROP TABLE IF EXISTS `op_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `op_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `op_acc` varchar(100) DEFAULT NULL,
  `op_type` varchar(100) DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  `content` varchar(100) DEFAULT NULL,
  `op_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `op_log`
--

LOCK TABLES `op_log` WRITE;
/*!40000 ALTER TABLE `op_log` DISABLE KEYS */;
INSERT INTO `op_log` VALUES (1,'a','a','a','a','2018-08-20 09:50:51'),(2,'a','a','a','a','2018-08-20 09:50:52'),(3,'a','a','a','a','2018-08-20 09:50:53'),(4,'a','a','a','a','2018-08-20 09:51:10'),(5,'a','a','a','a','2018-08-20 09:59:18'),(6,'znikang','Log01','127.0.0.1','','2018-09-12 07:41:05'),(7,'znikang','登陆成功','127.0.0.1','','2018-09-12 14:32:12'),(8,'znikang','登陆成功','127.0.0.1','','2018-09-12 14:34:11'),(9,'znikang','登陆成功','118.150.195.232','','2018-09-12 15:06:30'),(10,NULL,'登出','118.150.195.232','','2018-09-12 15:29:12'),(11,'znikang','登陆成功','118.150.195.232','','2018-09-12 15:29:14'),(12,'znikang','登陆成功','127.0.0.1','','2018-09-13 02:23:27'),(13,'znikang','登陆成功','61.222.110.31','','2018-09-13 09:29:09'),(14,'znikang','登陆成功','61.222.110.31','','2018-09-13 09:53:25'),(15,'znikang','登陆成功','127.0.0.1','','2018-09-13 10:13:43'),(16,'znikang','登陆成功','118.150.195.232','','2018-09-13 14:38:16'),(17,'leo','登陆成功','127.0.0.1','','2018-09-14 23:08:24'),(18,'znikang','登陆成功','127.0.0.1','','2018-09-15 02:13:23'),(19,'znikang','登陆成功','127.0.0.1','','2018-09-15 02:13:40'),(20,'znikang','登陆成功','127.0.0.1','','2018-09-15 05:09:18'),(21,'znikang','登陆成功','61.222.110.31','','2018-09-17 02:13:08'),(22,NULL,'登出','61.222.110.31','','2018-09-17 06:37:19'),(23,'znikang','登陆成功','61.222.110.31','','2018-09-17 06:37:25'),(24,'znikang','登陆成功','127.0.0.1','','2018-09-17 06:38:41'),(25,NULL,'登出','127.0.0.1','','2018-09-17 06:38:58'),(26,'panda','登陆成功','127.0.0.1','','2018-09-17 06:39:04'),(27,'znikang','登陆成功','127.0.0.1','','2018-09-17 06:40:10'),(28,NULL,'登出','127.0.0.1','','2018-09-17 06:40:28'),(29,'admin','登陆成功','127.0.0.1','','2018-09-17 06:40:32'),(30,'admin','登陆成功','127.0.0.1','','2018-09-17 06:55:37'),(31,'admin','登陆成功','127.0.0.1','','2018-09-17 09:13:15'),(32,'znikang','登陆成功','127.0.0.1','','2018-09-18 06:28:29'),(33,'znikang','登陆成功','127.0.0.1','','2018-09-18 09:37:03'),(34,'znikang','登陆成功','127.0.0.1','','2018-09-19 05:27:09'),(35,'znikang','登陆成功','127.0.0.1','','2018-09-19 05:27:48'),(36,'znikang','登陆成功','61.222.110.31','','2018-09-20 09:05:42'),(37,'znikang','登陆成功','127.0.0.1','','2018-09-21 03:01:19'),(38,'znikang','登陆成功','118.150.195.232','','2018-09-22 16:07:44'),(39,'znikang','登陆成功','118.150.195.232','','2018-09-22 16:31:35'),(40,'znikang','登陆成功','127.0.0.1','','2018-09-23 05:01:20'),(41,'znikang','登陆成功','127.0.0.1','','2018-09-23 05:56:01'),(42,'znikang','登陆成功','127.0.0.1','','2018-09-23 12:01:43'),(43,'znikang','登陆成功','127.0.0.1','','2018-09-23 12:08:52'),(44,'znikang','登陆成功','127.0.0.1','','2018-09-23 12:13:27'),(45,'znikang','登陆成功','127.0.0.1','','2018-09-23 12:32:31'),(46,'znikang','登陆成功','127.0.0.1','','2018-09-23 12:36:26'),(47,'znikang','登陆成功','127.0.0.1','','2018-09-23 15:35:45');
/*!40000 ALTER TABLE `op_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pay_interface`
--

DROP TABLE IF EXISTS `pay_interface`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pay_interface` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `company_id` bigint(20) DEFAULT NULL,
  `apikey` varchar(100) DEFAULT NULL,
  `secretkey` varchar(1024) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `whitelist` varchar(100) DEFAULT NULL,
  `callback` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pay_interface`
--

LOCK TABLES `pay_interface` WRITE;
/*!40000 ALTER TABLE `pay_interface` DISABLE KEYS */;
INSERT INTO `pay_interface` VALUES (1,1,'119C7F7CB76297304568E3FED9DFB88F','C09FD8DDE259A1047CC6ECA34B5C6829',0,NULL,'http://127.0.0.1:8991/test/addbankinfo');
/*!40000 ALTER TABLE `pay_interface` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentrecordhistory`
--

DROP TABLE IF EXISTS `paymentrecordhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paymentrecordhistory` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `orderNo` varchar(100) DEFAULT NULL,
  `ordertime` datetime DEFAULT NULL,
  `feeratio` decimal(10,0) DEFAULT NULL,
  `feetotal` decimal(10,0) DEFAULT NULL,
  `beforebalance` decimal(10,0) DEFAULT NULL,
  `afterbalance` decimal(10,0) DEFAULT NULL,
  `companyId` bigint(20) DEFAULT NULL,
  `confirmloginName` varchar(100) DEFAULT NULL,
  `confirmStatus` tinyint(4) DEFAULT NULL,
  `confirmTime` datetime DEFAULT NULL,
  `readstatus` bit(1) DEFAULT NULL,
  `readtime` datetime DEFAULT NULL,
  `paymentstatus` tinyint(4) DEFAULT NULL,
  `paymenttime` datetime DEFAULT NULL,
  `paymentFailInfo` text,
  `noticestatus` tinyint(4) DEFAULT NULL,
  `noticelasttime` datetime DEFAULT NULL,
  `noticetimes` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentrecordhistory`
--

LOCK TABLES `paymentrecordhistory` WRITE;
/*!40000 ALTER TABLE `paymentrecordhistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `paymentrecordhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `age` smallint(6) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'a'),(2,'b');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-23 23:44:36
