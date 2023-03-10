-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 10 Mar 2023, 15:39
-- Wersja serwera: 10.4.24-MariaDB
-- Wersja PHP: 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

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
(1, 'elektronika'),
(2, 'meble');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `inventory_list`
--

CREATE TABLE `inventory_list` (
  `id` int(11) NOT NULL,
  `lab_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `place_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `inventory_number` varchar(40) NOT NULL,
  `state` enum('Stanowy','Bezstanowy') NOT NULL,
  `damaged` enum('Tak','Nie') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `inventory_list`
--

INSERT INTO `inventory_list` (`id`, `lab_id`, `user_id`, `place_id`, `category_id`, `amount`, `name`, `inventory_number`, `state`, `damaged`) VALUES
(9, 1, 1, 3, 1, 1, 'Kabel HDMI', 'H3M1', 'Stanowy', 'Nie'),
(10, 1, 3, 4, 2, 2, 'Krzesło biurowe', 'KR3B18', 'Stanowy', 'Tak'),
(11, 2, 2, NULL, 1, 2, 'Przedłużacz 3 gniazdkowy', 'PR333GN1', 'Stanowy', 'Tak'),
(12, 2, 4, 4, 1, 1, 'Biurko', 'B1URK0', 'Stanowy', 'Nie');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `labs`
--

CREATE TABLE `labs` (
  `id` int(11) NOT NULL,
  `firstname` varchar(80) NOT NULL,
  `surname` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `labs`
--

INSERT INTO `labs` (`id`, `firstname`, `surname`) VALUES
(1, 'Raul', 'Wierzbiński'),
(2, 'Kamil', 'Bank');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `places`
--

CREATE TABLE `places` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `places`
--

INSERT INTO `places` (`id`, `name`) VALUES
(3, 'parking'),
(4, 'sala 24');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(80) NOT NULL,
  `surname` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `firstname`, `surname`) VALUES
(1, 'Sebastian', 'Kowalski'),
(2, 'Andrzej', 'Nowak'),
(3, 'Janusz', 'Rybak'),
(4, 'Stanisław', 'Kamiński');

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
  ADD KEY `inventory_list_ibfk_2` (`user_id`),
  ADD KEY `inventory_list_ibfk_3` (`place_id`),
  ADD KEY `inventory_list_ibfk_4` (`category_id`);

--
-- Indeksy dla tabeli `labs`
--
ALTER TABLE `labs`
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
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `inventory_list`
--
ALTER TABLE `inventory_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT dla tabeli `labs`
--
ALTER TABLE `labs`
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
  ADD CONSTRAINT `inventory_list_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `inventory_list_ibfk_3` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `inventory_list_ibfk_4` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;
