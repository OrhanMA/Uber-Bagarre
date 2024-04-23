<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240423113933 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE fight (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, title VARCHAR(255) NOT NULL, message LONGTEXT DEFAULT NULL, fighters_needed INT NOT NULL, address VARCHAR(255) DEFAULT NULL, is_fighting TINYINT(1) NOT NULL, cover TINYINT(1) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_21AA4456A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE fight_category (fight_id INT NOT NULL, category_id INT NOT NULL, INDEX IDX_AB38F2F9AC6657E4 (fight_id), INDEX IDX_AB38F2F912469DE2 (category_id), PRIMARY KEY(fight_id, category_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE fight_fighter (fight_id INT NOT NULL, fighter_id INT NOT NULL, INDEX IDX_696BBD96AC6657E4 (fight_id), INDEX IDX_696BBD9634934341 (fighter_id), PRIMARY KEY(fight_id, fighter_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE fighter (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE fighter_skill (fighter_id INT NOT NULL, skill_id INT NOT NULL, INDEX IDX_843286EB34934341 (fighter_id), INDEX IDX_843286EB5585C142 (skill_id), PRIMARY KEY(fighter_id, skill_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE skill (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', email VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_IDENTIFIER_USERNAME (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', available_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', delivered_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE fight ADD CONSTRAINT FK_21AA4456A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE fight_category ADD CONSTRAINT FK_AB38F2F9AC6657E4 FOREIGN KEY (fight_id) REFERENCES fight (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE fight_category ADD CONSTRAINT FK_AB38F2F912469DE2 FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE fight_fighter ADD CONSTRAINT FK_696BBD96AC6657E4 FOREIGN KEY (fight_id) REFERENCES fight (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE fight_fighter ADD CONSTRAINT FK_696BBD9634934341 FOREIGN KEY (fighter_id) REFERENCES fighter (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE fighter_skill ADD CONSTRAINT FK_843286EB34934341 FOREIGN KEY (fighter_id) REFERENCES fighter (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE fighter_skill ADD CONSTRAINT FK_843286EB5585C142 FOREIGN KEY (skill_id) REFERENCES skill (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE fight DROP FOREIGN KEY FK_21AA4456A76ED395');
        $this->addSql('ALTER TABLE fight_category DROP FOREIGN KEY FK_AB38F2F9AC6657E4');
        $this->addSql('ALTER TABLE fight_category DROP FOREIGN KEY FK_AB38F2F912469DE2');
        $this->addSql('ALTER TABLE fight_fighter DROP FOREIGN KEY FK_696BBD96AC6657E4');
        $this->addSql('ALTER TABLE fight_fighter DROP FOREIGN KEY FK_696BBD9634934341');
        $this->addSql('ALTER TABLE fighter_skill DROP FOREIGN KEY FK_843286EB34934341');
        $this->addSql('ALTER TABLE fighter_skill DROP FOREIGN KEY FK_843286EB5585C142');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE fight');
        $this->addSql('DROP TABLE fight_category');
        $this->addSql('DROP TABLE fight_fighter');
        $this->addSql('DROP TABLE fighter');
        $this->addSql('DROP TABLE fighter_skill');
        $this->addSql('DROP TABLE skill');
        $this->addSql('DROP TABLE `user`');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
