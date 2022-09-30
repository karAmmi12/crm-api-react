<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220928082621 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE invoice CHANGE amount amount VARCHAR(255) NOT NULL, CHANGE inv_number inv_number VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE user ADD adresse VARCHAR(255) DEFAULT NULL, ADD company VARCHAR(255) DEFAULT NULL, ADD phone VARCHAR(30) DEFAULT NULL, ADD logo VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE invoice CHANGE amount amount DOUBLE PRECISION NOT NULL, CHANGE inv_number inv_number INT NOT NULL');
        $this->addSql('ALTER TABLE user DROP adresse, DROP company, DROP phone, DROP logo');
    }
}
