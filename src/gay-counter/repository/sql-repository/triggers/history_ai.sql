CREATE TRIGGER `history_ai` AFTER INSERT ON `history`
 FOR EACH ROW UPDATE `players` SET `score` = `score` + NEW.`quantity` WHERE `id` = NEW.`playerId`