-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 14, 2021 at 03:57 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `amusement_park`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_calendar_package`
--

CREATE TABLE `tb_calendar_package` (
  `id_calendar_package` int(11) NOT NULL,
  `id_package` int(11) NOT NULL,
  `inventory_ticket` int(10) UNSIGNED NOT NULL,
  `price_child` int(11) DEFAULT NULL,
  `price_adult` int(11) DEFAULT NULL,
  `promotion_code` varchar(20) DEFAULT NULL,
  `date_no_of_ticket` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_calendar_package`
--

INSERT INTO `tb_calendar_package` (`id_calendar_package`, `id_package`, `inventory_ticket`, `price_child`, `price_adult`, `promotion_code`, `date_no_of_ticket`) VALUES
(1, 2, 50, 200, 250, 'code', '2021-02-14');

-- --------------------------------------------------------

--
-- Table structure for table `tb_img_package`
--

CREATE TABLE `tb_img_package` (
  `id_img_package` int(11) NOT NULL,
  `id_package` int(11) NOT NULL,
  `name_img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_img_package`
--

INSERT INTO `tb_img_package` (`id_img_package`, `id_package`, `name_img`) VALUES
(1, 2, 'asdasd'),
(2, 3, 'sub_imgs-16132238960853984.jpg'),
(4, 5, 'sub_imgs-16132240034355834.jpg'),
(5, 5, 'sub_imgs-16132240034374907.jpg'),
(6, 5, 'sub_imgs-16132240034402870.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tb_member`
--

CREATE TABLE `tb_member` (
  `id_member` int(11) NOT NULL,
  `id_status_member` int(11) NOT NULL,
  `id_amusement` int(10) UNSIGNED NOT NULL,
  `fname` varchar(60) NOT NULL,
  `lname` varchar(60) NOT NULL,
  `email` varchar(70) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_member`
--

INSERT INTO `tb_member` (`id_member`, `id_status_member`, `id_amusement`, `fname`, `lname`, `email`, `password`) VALUES
(1, 2078987349, 2021000001, 'Sanit', 'Pongkaew', 'admin@admin.com', 'admin'),
(2, 1, 2021000002, 'Sanit', 'Pongkaew', 'user@user.com', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `tb_package`
--

CREATE TABLE `tb_package` (
  `id_package` int(11) NOT NULL,
  `id_amusement` int(10) UNSIGNED NOT NULL,
  `package_name` varchar(120) NOT NULL,
  `package_detail` text NOT NULL,
  `main_img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_package`
--

INSERT INTO `tb_package` (`id_package`, `id_amusement`, `package_name`, `package_detail`, `main_img`) VALUES
(2, 2021000001, 'pk name', 'detail', NULL),
(3, 2021000001, 's', 's', 'main_img-16132238960958204.jpg'),
(5, 2021000001, 'package name', 'package detail', 'main_img-16132240034468416.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tb_status_member`
--

CREATE TABLE `tb_status_member` (
  `id_status_member` int(11) NOT NULL,
  `status_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_status_member`
--

INSERT INTO `tb_status_member` (`id_status_member`, `status_name`) VALUES
(1, 'admin'),
(2078987349, 'super admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_calendar_package`
--
ALTER TABLE `tb_calendar_package`
  ADD PRIMARY KEY (`id_calendar_package`),
  ADD KEY `id_package` (`id_package`);

--
-- Indexes for table `tb_img_package`
--
ALTER TABLE `tb_img_package`
  ADD PRIMARY KEY (`id_img_package`),
  ADD KEY `id_package_FK` (`id_package`);

--
-- Indexes for table `tb_member`
--
ALTER TABLE `tb_member`
  ADD PRIMARY KEY (`id_member`),
  ADD KEY `id_status_member_FK` (`id_status_member`),
  ADD KEY `id_amusement` (`id_amusement`);

--
-- Indexes for table `tb_package`
--
ALTER TABLE `tb_package`
  ADD PRIMARY KEY (`id_package`),
  ADD KEY `id_amusement_FK` (`id_amusement`);

--
-- Indexes for table `tb_status_member`
--
ALTER TABLE `tb_status_member`
  ADD PRIMARY KEY (`id_status_member`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_calendar_package`
--
ALTER TABLE `tb_calendar_package`
  MODIFY `id_calendar_package` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_img_package`
--
ALTER TABLE `tb_img_package`
  MODIFY `id_img_package` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tb_member`
--
ALTER TABLE `tb_member`
  MODIFY `id_member` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_package`
--
ALTER TABLE `tb_package`
  MODIFY `id_package` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tb_status_member`
--
ALTER TABLE `tb_status_member`
  MODIFY `id_status_member` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2078987350;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_calendar_package`
--
ALTER TABLE `tb_calendar_package`
  ADD CONSTRAINT `id_package` FOREIGN KEY (`id_package`) REFERENCES `tb_package` (`id_package`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tb_img_package`
--
ALTER TABLE `tb_img_package`
  ADD CONSTRAINT `id_package_FK` FOREIGN KEY (`id_package`) REFERENCES `tb_package` (`id_package`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tb_member`
--
ALTER TABLE `tb_member`
  ADD CONSTRAINT `id_status_member_FK` FOREIGN KEY (`id_status_member`) REFERENCES `tb_status_member` (`id_status_member`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tb_package`
--
ALTER TABLE `tb_package`
  ADD CONSTRAINT `id_amusement_FK` FOREIGN KEY (`id_amusement`) REFERENCES `tb_member` (`id_amusement`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
