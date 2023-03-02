-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 03 Mar 2023, 00:50
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
-- Baza danych: `przedmioty_inwentarzowe`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `inwentarz`
--

CREATE TABLE `inwentarz` (
  `id` int(11) NOT NULL,
  `Nr_laboranta` varchar(20) NOT NULL,
  `Ilość` varchar(20) NOT NULL DEFAULT '',
  `Miejsce` varchar(20) NOT NULL,
  `Nazwa_sprzętu` varchar(20) NOT NULL DEFAULT '',
  `Nr_inwentarzowy` varchar(20) NOT NULL DEFAULT '',
  `Użytkownik_sprzętu` varchar(50) DEFAULT NULL,
  `Rodzaj_sprzętu` varchar(20) NOT NULL DEFAULT '',
  `Typ_sprzętu` varchar(20) NOT NULL DEFAULT '',
  `Do_wybrakowania` varchar(3) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `inwentarz`
--

INSERT INTO `inwentarz` (`id`, `Nr_laboranta`, `Ilość`, `Miejsce`, `Nazwa_sprzętu`, `Nr_inwentarzowy`, `Użytkownik_sprzętu`, `Rodzaj_sprzętu`, `Typ_sprzętu`, `Do_wybrakowania`) VALUES
(1, '224', '1', 'sala 225', 'Laptop acer', '12655', 'Kamil Bank', 'Elektronika', 'stanowy', 'Nie'),
(2, '1265', '1', 'sala 22', 'Komputer', '2255', '', 'Elektronika', 'Bezstanowy', 'Tak');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `inwentarz`
--
ALTER TABLE `inwentarz`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `inwentarz`
--
ALTER TABLE `inwentarz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `inwentarz`
--
ALTER TABLE `inwentarz`
  ADD CONSTRAINT `inwentarz_ibfk_1` FOREIGN KEY (`Nr_laboranta`) REFERENCES `osoby` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
