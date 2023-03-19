-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 19 Mar 2023, 12:47
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `inventory`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `categories`
--

INSERT INTO `categories` (`id`, `category_name`) VALUES
(3, 'Elektronika'),
(5, 'Kable'),
(4, 'Mebel'),
(6, 'Urządzenia pomiarowe');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `inventory_list`
--

CREATE TABLE `inventory_list` (
  `id` int(11) NOT NULL,
  `lab_id` int(11) DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `place` varchar(100) DEFAULT NULL,
  `name` varchar(400) NOT NULL,
  `inventory_number` varchar(40) NOT NULL,
  `user_name` varchar(150) DEFAULT NULL,
  `category` varchar(60) DEFAULT NULL,
  `state` enum('Stanowy','Bezstanowy') NOT NULL,
  `damaged` enum('Tak','Nie') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `inventory_list`
--

INSERT INTO `inventory_list` (`id`, `lab_id`, `amount`, `place`, `name`, `inventory_number`, `user_name`, `category`, `state`, `damaged`) VALUES
(1, 3, 1, 'Parking', 'Kabel HDMI', '25452515', 'Kamil Bank', 'Elektronika', 'Stanowy', 'Nie'),
(16, 4, 1, 'Piwnica', 'Monitor Acer', '1236665', 'Kamil Bank', 'elektronika', 'Stanowy', 'Nie'),
(17, 4, 10, 'Piwnica', 'Stół', '21222545', 'Kamil Bank', 'mebel', 'Bezstanowy', 'Tak'),
(18, 3, 5, 'Parking', 'Pacholek', 'Pach33ek', 'Raul Wierzbiński', 'mebel', 'Stanowy', 'Nie'),
(19, 3, 3, 'Piwnica', 'Zestaw do zarabiania skretki', 'SKZ5', 'Kamil Bank', 'elektronika', 'Stanowy', 'Nie'),
(20, 3, 1, 'Piwnica', 'Mop', 'M0PPP', 'Kamil Bank', 'elektronika', 'Stanowy', 'Nie'),
(21, 3, 1, 'Piwnica', 'Mop', 'M0PPP', 'Kamil Bank', 'elektronika', 'Stanowy', 'Nie'),
(22, 3, 1, 'Piwnica', 'Mop', 'M0PPP', 'Kamil Bank', 'elektronika', 'Stanowy', 'Nie'),
(23, 3, 1, 'Piwnica', 'Mop', 'M0PPP', 'Raul Wierzbiński', 'elektronika', 'Stanowy', 'Nie'),
(24, 3, 1, 'Piwnica', 'Mop', 'M0PPP', 'Raul Wierzbiński', 'elektronika', 'Stanowy', 'Nie'),
(25, 3, 1, 'Piwnica', 'Mop', 'M0PPP', 'Raul Wierzbiński', 'elektronika', 'Stanowy', 'Nie'),
(26, 3, 1, 'Piwnica', 'Mop', 'M0PPP', 'Raul Wierzbiński', 'elektronika', 'Stanowy', 'Nie'),
(27, 3, 2, 'Parking', 'Mlotek', 'M#P', 'Kamil Bank', 'mebel', 'Stanowy', 'Nie'),
(28, 3, 2, 'Parking', 'Mlotek', 'M#P', 'Kamil Bank', 'mebel', 'Stanowy', 'Nie'),
(29, 3, 2, 'Parking', 'Mlotek', 'M#P', 'Kamil Bank', 'mebel', 'Stanowy', 'Nie'),
(30, 3, 2, 'Parking', 'Mlotek', 'M#P', 'Kamil Bank', 'mebel', 'Stanowy', 'Nie'),
(31, 3, 2, 'Parking', 'Mlotek', 'M#P', 'Kamil Bank', 'mebel', 'Stanowy', 'Nie'),
(46, 3, 2, 'Parking', 'Garnek', '', 'Raul Wierzbiński', 'mebel', 'Bezstanowy', 'Nie'),
(47, 3, 2, 'Parking', 'asdasd', 'asdasd', 'Kamil Bank', 'elektronika', 'Stanowy', 'Tak'),
(48, 3, 5, 'Parking', 'TEST', 'TEST', 'Kamil Bank', 'elektronika', 'Stanowy', 'Tak'),
(49, 3, 0, 'Parking', '', '', 'Kamil Bank', 'elektronika', 'Stanowy', 'Tak'),
(50, 3, 5, 'Parking', 'Ogorki - Sloik', 'OGOR3', 'Kamil Bank', 'mebel', 'Stanowy', 'Tak'),
(51, 3, 1, 'Parking', 'Krzeslo', 'KR#', 'Kamil Bank', 'mebel', 'Stanowy', 'Tak'),
(52, 4, 1, 'Parking', 'Jablko', 'JAB55', 'Kamil Bank', 'mebel', 'Stanowy', 'Tak'),
(53, 3, 1, 'Parking', 'Apple watch', 'APPW3C', 'Kamil Bank', 'elektronika', 'Stanowy', 'Nie'),
(54, 3, 0, 'Parking', 'a123', '', 'Kamil Bank', 'elektronika', 'Stanowy', 'Tak'),
(55, 4, 3, 'Parking', '12asd', 'asda123', 'Kamil Bank', 'elektronika', 'Stanowy', 'Tak'),
(56, 4, 3, 'Parking', 'asdasd', 'asdasdasdasd', 'Kamil Bank', 'elektronika', 'Stanowy', 'Tak'),
(57, 3, 2, 'Parking', 'PPPP', 'PPPP', 'Raul Wierzbiński', 'mebel', 'Stanowy', 'Tak'),
(58, 3, 33, 'Parking', 'TESTUJE OWY KOD', 'KODDD', 'Raul Wierzbiński', 'mebel', 'Bezstanowy', 'Nie'),
(59, 3, 123, 'Parking', 'asdasd', 'asdasd', 'Kamil Bank', 'mebel', 'Stanowy', 'Tak'),
(60, 3, 4, 'Parking', 'asdasd', '123123', 'Kamil Bank', 'Kable', 'Stanowy', 'Nie'),
(61, 3, 2, 'Parking', 'TEST-1234', '1234', 'Raul Wierzbiński', 'Kable', 'Stanowy', 'Tak'),
(63, 3, 5, 'Parking', 'TESTOWY - MIEJSCE', '12345', 'Raul Wierzbiński', 'Kable', 'Stanowy', 'Tak');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `labs`
--

CREATE TABLE `labs` (
  `id` int(11) NOT NULL,
  `username` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `labs`
--

INSERT INTO `labs` (`id`, `username`) VALUES
(3, 'Kamil Bank'),
(4, 'Raul Wierzbiński');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `logins`
--

CREATE TABLE `logins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `logins`
--

INSERT INTO `logins` (`id`, `username`, `password`) VALUES
(2, 'admin', '+wAd/P/RyJnzKXhxQGJC8JeuzxpTQszz680RYUYYjks=');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `places`
--

CREATE TABLE `places` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `places`
--

INSERT INTO `places` (`id`, `name`) VALUES
(2, 'Parking'),
(1, 'Piwnica');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `username`) VALUES
(1, 'Kamil Bank'),
(2, 'Raul Wierzbiński');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indeksy dla tabeli `inventory_list`
--
ALTER TABLE `inventory_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inventory_list_ibfk_1` (`lab_id`),
  ADD KEY `inventory_list_ibfk_3` (`place`),
  ADD KEY `inventory_list_ibfk_4` (`category`),
  ADD KEY `inventory_list_ibfk_2` (`user_name`) USING BTREE;

--
-- Indeksy dla tabeli `labs`
--
ALTER TABLE `labs`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `logins`
--
ALTER TABLE `logins`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `places`
--
ALTER TABLE `places`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT dla tabeli `inventory_list`
--
ALTER TABLE `inventory_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT dla tabeli `labs`
--
ALTER TABLE `labs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `logins`
--
ALTER TABLE `logins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `places`
--
ALTER TABLE `places`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `inventory_list`
--
ALTER TABLE `inventory_list`
  ADD CONSTRAINT `inventory_list_ibfk_3` FOREIGN KEY (`place`) REFERENCES `places` (`name`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `inventory_list_ibfk_4` FOREIGN KEY (`category`) REFERENCES `categories` (`category_name`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `inventory_list_ibfk_5` FOREIGN KEY (`user_name`) REFERENCES `users` (`username`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `inventory_list_ibfk_6` FOREIGN KEY (`lab_id`) REFERENCES `labs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `inventory_list_ibfk_7` FOREIGN KEY (`user_name`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
