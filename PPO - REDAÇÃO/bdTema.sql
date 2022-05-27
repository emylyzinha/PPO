-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`tema`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tema` (
  `idtema` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(120) NOT NULL,
  PRIMARY KEY (`idtema`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`referencia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`referencia` (
  `idreferencia` INT NOT NULL,
  `nomeAutor` VARCHAR(45) NOT NULL,
  `sobrenomeAutor` VARCHAR(45) NOT NULL,
  `dataPublicacao` DATE NULL,
  PRIMARY KEY (`idreferencia`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`texto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`texto` (
  `idtexto` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(120) NULL,
  `corpoTexto` LONGTEXT NOT NULL,
  `tema_idtema` INT NOT NULL,
  `referencia_idreferencia` INT NOT NULL,
  PRIMARY KEY (`idtexto`),
  INDEX `fk_texto_tema_idx` (`tema_idtema` ASC) VISIBLE,
  INDEX `fk_texto_referencia1_idx` (`referencia_idreferencia` ASC) VISIBLE,
  CONSTRAINT `fk_texto_tema`
    FOREIGN KEY (`tema_idtema`)
    REFERENCES `mydb`.`tema` (`idtema`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_texto_referencia1`
    FOREIGN KEY (`referencia_idreferencia`)
    REFERENCES `mydb`.`referencia` (`idreferencia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
