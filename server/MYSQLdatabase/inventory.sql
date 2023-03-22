-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 22 Mar 2023, 23:08
-- Wersja serwera: 10.4.11-MariaDB
-- Wersja PHP: 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `lab_id` varchar(120) DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `place` varchar(100) DEFAULT NULL,
  `name` varchar(400) NOT NULL,
  `inventory_number` varchar(40) NOT NULL,
  `user_name` varchar(150) DEFAULT NULL,
  `category` varchar(60) DEFAULT NULL,
  `state` enum('Stanowy','Bezstanowy') NOT NULL,
  `damaged` enum('Tak','Nie') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `inventory_list`
--

INSERT INTO `inventory_list` (`id`, `lab_id`, `amount`, `place`, `name`, `inventory_number`, `user_name`, `category`, `state`, `damaged`) VALUES
(71, '789Raul1012', 4, 'Parking', 'Opony', '420213769@#', 'Kamil Bank', 'Urządzenia pomiarowe', 'Bezstanowy', 'Nie'),
(72, '123ADMIN456', 10, NULL, 'stoły', '159753456$@%12', NULL, 'Mebel', 'Stanowy', 'Nie'),
(73, '123ADMIN456', 10, 'Piwnica', 'Krzesła', '15975365896*58/', NULL, 'Mebel', 'Stanowy', 'Nie'),
(74, '789Raul1012', 1, 'Piwnica', 'Przedłużacz', '124578852/*85', 'Raul Wierzbiński', 'Kable', 'Bezstanowy', 'Tak'),
(75, '123ADMIN456', 1, 'Piwnica', 'Monitor tracer', '25698745/8*0', NULL, 'Elektronika', 'Stanowy', 'Nie'),
(76, '123ADMIN456', 1, NULL, 'TEST', 'TEST', 'Kamil Bank', 'Urządzenia pomiarowe', 'Stanowy', 'Nie'),
(77, '123ADMIN456', 0, 'Parking', 'TEST', 'TEST', 'Raul Wierzbiński', 'Kable', 'Stanowy', 'Nie'),
(78, '123ADMIN456', 9, 'Piwnica', 'TEST', 'TEST', 'Raul Wierzbiński', 'Mebel', 'Stanowy', 'Nie'),
(79, '123ADMIN456', 23, 'Piwnica', 'TEST', 'TEST', NULL, 'Mebel', 'Bezstanowy', 'Tak'),
(80, '789Raul1012', 5, NULL, 'TEST', 'TEST', 'Raul Wierzbiński', 'Kable', 'Bezstanowy', 'Nie'),
(81, '123ADMIN456', 20, 'Parking', 'TEST', 'TEST', 'Raul Wierzbiński', NULL, 'Stanowy', 'Tak'),
(82, '123ADMIN456', 1, NULL, 'T', 'T', NULL, NULL, 'Stanowy', 'Tak'),
(83, '123ADMIN456', 1, NULL, 'T', 'T', NULL, NULL, 'Stanowy', 'Tak'),
(84, '123ADMIN456', 1, NULL, 'T', 'T', NULL, NULL, 'Stanowy', 'Tak'),
(85, '123ADMIN456', 2, NULL, 'T', 'T', NULL, NULL, 'Stanowy', 'Tak'),
(86, '123ADMIN456', 1, NULL, 'T', 'T', NULL, NULL, 'Stanowy', 'Tak'),
(87, '123ADMIN456', 5, NULL, 'T', 'T', NULL, NULL, 'Stanowy', 'Tak'),
(88, '123ADMIN456', 69, NULL, 'T', 'T', NULL, NULL, 'Stanowy', 'Tak'),
(89, '123ADMIN456', 420, NULL, 'T', 'T', NULL, NULL, 'Stanowy', 'Tak'),
(90, '123ADMIN456', 1109, NULL, 'T', 'T', NULL, NULL, 'Stanowy', 'Tak'),
(91, '123ADMIN456', 1444, NULL, 'T', '0TToM@N', NULL, NULL, 'Stanowy', 'Tak');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `labs`
--

CREATE TABLE `labs` (
  `id` int(11) NOT NULL,
  `lab_id` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `labs`
--

INSERT INTO `labs` (`id`, `lab_id`) VALUES
(3, '123ADMIN456'),
(4, '789Raul1012');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `logins`
--

CREATE TABLE `logins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`lab_id`);

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
-- AUTO_INCREMENT for dumped tables
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

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
  ADD CONSTRAINT `inventory_list_ibfk_1` FOREIGN KEY (`lab_id`) REFERENCES `labs` (`Lab_Id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `inventory_list_ibfk_3` FOREIGN KEY (`place`) REFERENCES `places` (`name`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `inventory_list_ibfk_4` FOREIGN KEY (`category`) REFERENCES `categories` (`category_name`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `inventory_list_ibfk_5` FOREIGN KEY (`user_name`) REFERENCES `users` (`username`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
