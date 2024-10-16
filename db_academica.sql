-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         11.3.2-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para db_academica
CREATE DATABASE IF NOT EXISTS `db_academica` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `db_academica`;

-- Volcando estructura para tabla db_academica.alumnos
CREATE TABLE IF NOT EXISTS `alumnos` (
  `idAlumno` int(10) NOT NULL AUTO_INCREMENT,
  `codigo` char(10) NOT NULL DEFAULT '',
  `nombre` char(75) NOT NULL DEFAULT '',
  `direccion` char(150) NOT NULL DEFAULT '',
  `telefono` char(9) NOT NULL DEFAULT '',
  `email` char(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`idAlumno`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla db_academica.alumnos: ~4 rows (aproximadamente)
INSERT INTO `alumnos` (`idAlumno`, `codigo`, `nombre`, `direccion`, `telefono`, `email`) VALUES
	(1, 'ING0070704', 'Sandra Guzman', 'Usulutan', '77777777', 'sandra@ugb.edu.sv'),
	(3, 'MAG1052021', 'Mango', 'Jiquilisco', '0000-0000', 'mango@ugb.edu.sv'),
	(4, 'LIM092021', 'Limoncito', 'Jiquilisco', '0000-0000', 'limon@ugb.edu.sv');

-- Volcando estructura para tabla db_academica.docentes
CREATE TABLE IF NOT EXISTS `docentes` (
  `idDocente` int(10) NOT NULL AUTO_INCREMENT,
  `codigo` char(10) NOT NULL DEFAULT '0',
  `nombre` char(75) NOT NULL DEFAULT '0',
  `direccion` char(150) NOT NULL DEFAULT '0',
  `telefono` char(9) NOT NULL DEFAULT '0',
  `email` char(100) NOT NULL DEFAULT '0',
  `dui` char(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idDocente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla db_academica.docentes: ~0 rows (aproximadamente)

-- Volcando estructura para tabla db_academica.materias
CREATE TABLE IF NOT EXISTS `materias` (
  `idMaterias` int(10) NOT NULL AUTO_INCREMENT,
  `codigo` char(10) NOT NULL DEFAULT '0',
  `nombre` char(75) NOT NULL DEFAULT '0',
  `uv` smallint(2) NOT NULL DEFAULT 0,
  PRIMARY KEY (`idMaterias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla db_academica.materias: ~0 rows (aproximadamente)

-- Volcando estructura para tabla db_academica.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `idUsuario` int(10) NOT NULL AUTO_INCREMENT,
  `usuario` char(35) NOT NULL DEFAULT '0',
  `clave` char(35) NOT NULL DEFAULT '0',
  `nombre` char(85) NOT NULL DEFAULT '0',
  `direccion` char(100) NOT NULL DEFAULT '0',
  `telefono` char(9) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla db_academica.usuarios: ~0 rows (aproximadamente)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
