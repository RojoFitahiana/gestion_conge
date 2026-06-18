import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1738781230736 implements MigrationInterface {
  name = 'InitialMigration1738781230736';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`department\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nom_departement\` varchar(255) NOT NULL, \`responsable_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`leave_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`leave_request\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date_debut\` date NOT NULL, \`date_fin\` date NOT NULL, \`statut\` varchar(255) NOT NULL DEFAULT 'en_attente', \`date_soumission\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`commentaire\` varchar(255) NULL, \`employeId\` int NULL, \`typeCongeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`employee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nom\` varchar(255) NOT NULL, \`prenom\` varchar(255) NOT NULL, \`date_naissance\` date NOT NULL, \`genre\` varchar(255) NOT NULL, \`date_embauche\` date NOT NULL, \`poste\` varchar(255) NOT NULL, \`solde_conge\` int NOT NULL DEFAULT '0', \`statut\` varchar(255) NOT NULL DEFAULT 'actif', \`departementId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`leave_request\` ADD CONSTRAINT \`FK_cbfa58135b7b1b847147e81ac04\` FOREIGN KEY (\`employeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`leave_request\` ADD CONSTRAINT \`FK_6658c4d15d233d0796af5d2a847\` FOREIGN KEY (\`typeCongeId\`) REFERENCES \`leave_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee\` ADD CONSTRAINT \`FK_4bec475144f7d63421684dfc595\` FOREIGN KEY (\`departementId\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`employee\` DROP FOREIGN KEY \`FK_4bec475144f7d63421684dfc595\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`leave_request\` DROP FOREIGN KEY \`FK_6658c4d15d233d0796af5d2a847\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`leave_request\` DROP FOREIGN KEY \`FK_cbfa58135b7b1b847147e81ac04\``,
    );
    await queryRunner.query(`DROP TABLE \`employee\``);
    await queryRunner.query(`DROP TABLE \`leave_request\``);
    await queryRunner.query(`DROP TABLE \`leave_type\``);
    await queryRunner.query(`DROP TABLE \`department\``);
  }
}
