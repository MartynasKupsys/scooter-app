-- phpMyAdmin SQL Dump
-- version 4.9.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 14, 2022 at 06:33 PM
-- Server version: 10.3.24-MariaDB
-- PHP Version: 7.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kolt_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `kolt_scooters`
--

CREATE TABLE `kolt_scooters` (
  `id` int(11) UNSIGNED NOT NULL,
  `scooter_name` varchar(20) NOT NULL,
  `creation_date` date NOT NULL DEFAULT current_timestamp(),
  `registration_code` char(8) NOT NULL,
  `is_busy` tinyint(1) UNSIGNED DEFAULT 0,
  `last_use_date` date DEFAULT NULL,
  `total_ride_kilometres` decimal(6,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `kolt_scooters`
--

INSERT INTO `kolt_scooters` (`id`, `scooter_name`, `creation_date`, `registration_code`, `is_busy`, `last_use_date`, `total_ride_kilometres`) VALUES
(2, 'Scooter2', '2022-04-17', '258ABFGH', 0, NULL, '0.00'),
(4, 'Scooter4', '2022-04-17', '569HLJKY', 0, NULL, '0.00'),
(21, 'Scooter5', '2022-04-18', '2589GHJK', 0, NULL, '0.00'),
(22, 'Scooter6', '2022-04-18', '78954DFG', 0, NULL, '0.00'),
(23, 'Scooter7', '2022-04-18', 'QDFGH466', 0, NULL, '0.00'),
(27, 'Scooter9', '2022-04-18', '1236DGHT', 0, NULL, '0.00'),
(28, 'Scooter10', '2022-04-18', 'REWR1658', 0, NULL, '0.00'),
(29, 'Scooter11', '2022-04-18', '125FGHJY', 0, NULL, '0.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kolt_scooters`
--
ALTER TABLE `kolt_scooters`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kolt_scooters`
--
ALTER TABLE `kolt_scooters`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
