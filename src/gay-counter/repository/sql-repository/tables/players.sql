CREATE TABLE players(
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(31) NOT NULL,
  `score` INT NOT NULL DEFAULT 0,
  `img` VARCHAR(1000),
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)