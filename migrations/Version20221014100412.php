<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221014100412 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE logo ADD user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE logo ADD CONSTRAINT FK_E48E9A13A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_E48E9A13A76ED395 ON logo (user_id)');
        $this->addSql('ALTER TABLE user DROP logo');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE logo DROP FOREIGN KEY FK_E48E9A13A76ED395');
        $this->addSql('DROP INDEX IDX_E48E9A13A76ED395 ON logo');
        $this->addSql('ALTER TABLE logo DROP user_id');
        $this->addSql('ALTER TABLE user ADD logo VARCHAR(255) DEFAULT NULL');
    }
}
