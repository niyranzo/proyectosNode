-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-02-2025 a las 10:34:52
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cards`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `card`
--

CREATE TABLE `card` (
  `id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `suit` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `card`
--

INSERT INTO `card` (`id`, `number`, `suit`, `image`) VALUES
(1, 1, 'oros', 'oro.jpg'),
(2, 2, 'oros', 'oro.jpg'),
(3, 3, 'oros', 'oro.jpg'),
(4, 4, 'oros', 'oro.jpg'),
(5, 5, 'oros', 'oro.jpg'),
(6, 6, 'oros', 'oro.jpg'),
(7, 7, 'oros', 'oro.jpg'),
(8, 10, 'oros', 'oro.jpg'),
(9, 11, 'oros', 'oro.jpg'),
(10, 12, 'oros', 'oro.jpg'),
(11, 1, 'copas', 'copa.jpg'),
(12, 2, 'copas', 'copa.jpg'),
(13, 3, 'copas', 'copa.jpg'),
(14, 4, 'copas', 'copa.jpg'),
(15, 5, 'copas', 'copa.jpg'),
(16, 6, 'copas', 'copa.jpg'),
(17, 7, 'copas', 'copa.jpg'),
(18, 10, 'copas', 'copa.jpg'),
(19, 11, 'copas', 'copa.jpg'),
(20, 12, 'copas', 'copa.jpg'),
(21, 1, 'espadas', 'espada.jpg'),
(22, 2, 'espadas', 'espada.jpg'),
(23, 3, 'espadas', 'espada.jpg'),
(24, 4, 'espadas', 'espada.jpg'),
(25, 5, 'espadas', 'espada.jpg'),
(26, 6, 'espadas', 'espada.jpg'),
(27, 7, 'espadas', 'espada.jpg'),
(28, 10, 'espadas', 'espada.jpg'),
(29, 11, 'espadas', 'espada.jpg'),
(30, 12, 'espadas', 'espada.jpg'),
(31, 1, 'bastos', 'basto.jpg'),
(32, 2, 'bastos', 'basto.jpg'),
(33, 3, 'bastos', 'basto.jpg'),
(34, 4, 'bastos', 'basto.jpg'),
(35, 5, 'bastos', 'basto.jpg'),
(36, 6, 'bastos', 'basto.jpg'),
(37, 7, 'bastos', 'basto.jpg'),
(38, 10, 'bastos', 'basto.jpg'),
(39, 11, 'bastos', 'basto.jpg'),
(40, 12, 'bastos', 'basto.jpg'),
(41, 8, 'oros', 'oro.jpg'),
(42, 9, 'oros', 'oro.jpg'),
(43, 8, 'copas', 'copa.jpg'),
(44, 9, 'copas', 'copa.jpg'),
(45, 8, 'espadas', 'espada.jpg'),
(46, 9, 'espadas', 'espada.jpg'),
(47, 8, 'bastos', 'basto.jpg'),
(48, 9, 'bastos', 'basto.jpg'),
(49, 5, 'pedro', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20250113114342', '2025-01-13 12:44:02', 115),
('DoctrineMigrations\\Version20250115111934', '2025-01-15 12:19:51', 374),
('DoctrineMigrations\\Version20250127095908', '2025-01-27 10:59:20', 62),
('DoctrineMigrations\\Version20250129080318', '2025-01-29 09:03:49', 118);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `game`
--

CREATE TABLE `game` (
  `id` int(11) NOT NULL,
  `player1_id` int(11) NOT NULL,
  `player2_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `date` datetime NOT NULL,
  `result` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `game`
--

INSERT INTO `game` (`id`, `player1_id`, `player2_id`, `name`, `state`, `date`, `result`) VALUES
(5, 3, 2, 'rafa', 1, '2025-01-17 20:34:04', 3),
(6, 2, 3, 'nuevo juego de niki creo', 1, '2025-01-17 20:47:55', 2),
(7, 2, 3, 'hv v bhgv', 1, '2025-01-17 22:15:17', 2),
(8, 2, 4, 'biki patdasa', 1, '2025-01-20 08:33:32', 4),
(9, 2, 1, 'rocio juego', 1, '2025-01-20 11:07:23', 2),
(10, 1, 3, 'hola', 1, '2025-01-20 11:55:40', 3),
(11, 2, 3, 'empate ? ', 1, '2025-01-20 12:00:25', 0),
(12, 3, 2, 'partida saraarias', 1, '2025-01-20 12:05:11', 0),
(13, 1, 6, 'puto juan ', 1, '2025-01-20 20:40:17', 6),
(14, 2, 3, 'prueba juego con imagen ', 1, '2025-01-27 13:43:11', 3),
(15, 2, 1, 'juego nuevo', 1, '2025-01-28 18:44:11', 1),
(16, 3, NULL, 'rafa juego ', 0, '2025-01-28 18:45:48', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(180) NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '(DC2Type:json)' CHECK (json_valid(`roles`)),
  `password` varchar(255) NOT NULL,
  `card_id` int(11) DEFAULT NULL,
  `card2_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `username`, `roles`, `password`, `card_id`, `card2_id`) VALUES
(1, 'saraarias', '[\"ROLE_USER\"]', '$2y$13$bDSeoCPtLgzs8Ho7h.4sDOnZ8v0N.1mnD9La8LnEZ1.IN7/4g0E8.', NULL, NULL),
(2, 'niki', '[\"ROLE_USER\", \"ROLE_ADMIN\"]', '$2y$13$9uGl7ij7LpvBn17FMpITlOTZsCkgl4nhX/FZvTAHoFBFF2OfULQHK', NULL, NULL),
(3, 'rafa', '[]', '$2y$13$JOJjLnvdc87vLu/z6Oxqa.YSfd0/iboQFb4NfwBPIOMahcO72vue6', 10, NULL),
(4, 'ro', '[\"ROLE_USER\"]', '$2y$13$h3fDp5G/7xnsiWXj6SPITuFX9R3rh3.p82RYWvcUNvHM8mAyZeAXG', NULL, NULL),
(6, 'juan', '[]', '$2y$13$yRJre9C95kT3Au0gjrnyrOaY9zE7d9nFBwOn78L2AbUs3XFU6bZAS', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `card`
--
ALTER TABLE `card`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indices de la tabla `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_232B318CC0990423` (`player1_id`),
  ADD KEY `IDX_232B318CD22CABCD` (`player2_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_IDENTIFIER_USERNAME` (`username`),
  ADD KEY `IDX_8D93D6494ACC9A20` (`card_id`),
  ADD KEY `IDX_8D93D649FFFD6E2F` (`card2_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `card`
--
ALTER TABLE `card`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `game`
--
ALTER TABLE `game`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `game`
--
ALTER TABLE `game`
  ADD CONSTRAINT `FK_232B318CC0990423` FOREIGN KEY (`player1_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_232B318CD22CABCD` FOREIGN KEY (`player2_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_8D93D6494ACC9A20` FOREIGN KEY (`card_id`) REFERENCES `card` (`id`),
  ADD CONSTRAINT `FK_8D93D649FFFD6E2F` FOREIGN KEY (`card2_id`) REFERENCES `card` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
