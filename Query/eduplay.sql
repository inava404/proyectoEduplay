-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-12-2024 a las 06:50:17
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
-- Base de datos: `eduplay`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `ID` int(11) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `apodo` varchar(30) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `grado_curso` int(11) NOT NULL,
  `ID_Estadisticas` int(11) NOT NULL,
  `Eliminado` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`ID`, `nombres`, `apellidos`, `apodo`, `fecha_nacimiento`, `grado_curso`, `ID_Estadisticas`, `Eliminado`) VALUES
(1, 'Sherlyn', 'Viveros Reyes', 'User', '2018-07-17', 1, 1, 0),
(2, 'Julieta', 'Martinez', 'User', '2020-04-29', 1, 2, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadisticas`
--

CREATE TABLE `estadisticas` (
  `ID` int(11) NOT NULL,
  `porcen_español` int(11) NOT NULL DEFAULT 0,
  `porcen_matematicas` int(11) NOT NULL DEFAULT 0,
  `porcen_ingles` int(11) NOT NULL DEFAULT 0,
  `ID_reto_diario1` int(11) NOT NULL DEFAULT 0,
  `check_rd1` int(11) NOT NULL DEFAULT 0,
  `ID_reto_diario2` int(11) NOT NULL DEFAULT 0,
  `check_rd2` int(11) NOT NULL DEFAULT 0,
  `ID_reto_diario3` int(11) NOT NULL DEFAULT 0,
  `check_rd3` int(11) NOT NULL DEFAULT 0,
  `reto_sem` int(11) NOT NULL DEFAULT 0,
  `check_rs` int(11) NOT NULL DEFAULT 0,
  `reto_mens` int(11) NOT NULL DEFAULT 0,
  `check_rm` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `estadisticas`
--

INSERT INTO `estadisticas` (`ID`, `porcen_español`, `porcen_matematicas`, `porcen_ingles`, `ID_reto_diario1`, `check_rd1`, `ID_reto_diario2`, `check_rd2`, `ID_reto_diario3`, `check_rd3`, `reto_sem`, `check_rs`, `reto_mens`, `check_rm`) VALUES
(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `material`
--

CREATE TABLE `material` (
  `ID` int(11) NOT NULL,
  `grado` int(11) NOT NULL DEFAULT 1,
  `materia` varchar(15) NOT NULL,
  `tipo_material` varchar(50) NOT NULL,
  `actividad` varchar(300) NOT NULL,
  `respuesta` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `material`
--

INSERT INTO `material` (`ID`, `grado`, `materia`, `tipo_material`, `actividad`, `respuesta`) VALUES
(1, 1, 'Español', 'Vocabulario', 'Pregunta1', 'B'),
(2, 1, 'Español', 'Vocabulario', 'Pregunta2', 'A'),
(3, 1, 'Español', 'Vocabulario', 'Pregunta3', 'C'),
(4, 1, 'Español', 'Vocabulario', 'Pregunta4', 'A'),
(5, 1, 'Español', 'Colores', '¿De qué color es el cielo cuando no hay nubes?', 'Azul'),
(6, 1, 'Español', 'Colores', '¿Cuál de estos objetos es de color amarillo?', 'Plátano'),
(7, 1, 'Español', 'Colores', 'El color de una fresa es:', 'Rojo'),
(8, 1, 'Español', 'Colores', '¿Qué color se forma al mezclar azul y amarillo?', 'Verde');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `retos`
--

CREATE TABLE `retos` (
  `ID` int(11) NOT NULL,
  `materia_reto` varchar(15) NOT NULL,
  `descripción` varchar(300) NOT NULL,
  `utilizado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesiones`
--

CREATE TABLE `sesiones` (
  `ID` int(11) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `ID_Tutor` int(11) NOT NULL,
  `ID_Alumno` int(11) NOT NULL,
  `clave` int(11) NOT NULL,
  `eliminado` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sesiones`
--

INSERT INTO `sesiones` (`ID`, `usuario`, `contrasena`, `ID_Tutor`, `ID_Alumno`, `clave`, `eliminado`) VALUES
(1, 'haciel@gmail.com', '$2y$10$2bl/X5ntIGo9vBcVz1dM6.GVNaKYo.B6vSRqh4YvyPUWz5omBWmBe', 1, 1, 12345, 0),
(2, 'mario@gmail.com', '$2y$10$FfrPtgC9zN5v3c.C74uvw.JYDJQGZRzFu..pCoJcfQOUMZPbREBA2', 2, 2, 12345, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutores`
--

CREATE TABLE `tutores` (
  `ID` int(11) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `eliminado` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `tutores`
--

INSERT INTO `tutores` (`ID`, `nombres`, `apellidos`, `fecha_nacimiento`, `eliminado`) VALUES
(1, 'Haciel Antonio', 'Viveros Reyes', '2004-04-29', 0),
(2, 'Mario', 'Martinez', '2001-04-21', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_ID_Estadisticas` (`ID_Estadisticas`);

--
-- Indices de la tabla `estadisticas`
--
ALTER TABLE `estadisticas`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `sesiones`
--
ALTER TABLE `sesiones`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD KEY `FK_ID_Tutores` (`ID_Tutor`),
  ADD KEY `FK_ID_Alumnos` (`ID_Alumno`);

--
-- Indices de la tabla `tutores`
--
ALTER TABLE `tutores`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `estadisticas`
--
ALTER TABLE `estadisticas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `material`
--
ALTER TABLE `material`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `sesiones`
--
ALTER TABLE `sesiones`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tutores`
--
ALTER TABLE `tutores`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD CONSTRAINT `FK_ID_Estadisticas` FOREIGN KEY (`ID_Estadisticas`) REFERENCES `estadisticas` (`ID`);

--
-- Filtros para la tabla `sesiones`
--
ALTER TABLE `sesiones`
  ADD CONSTRAINT `FK_ID_Alumnos` FOREIGN KEY (`ID_Alumno`) REFERENCES `alumnos` (`ID`),
  ADD CONSTRAINT `FK_ID_Tutores` FOREIGN KEY (`ID_Tutor`) REFERENCES `tutores` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
