import { MigrationInterface, QueryRunner } from 'typeorm';

export class UptdateEmployeeEntity1738873112962 implements MigrationInterface {
  name = 'UptdateEmployeeEntity1738873112962';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`employee\` DROP COLUMN \`solde_conge\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee\` ADD \`email\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee\` ADD UNIQUE INDEX \`IDX_817d1d427138772d47eca04885\` (\`email\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee\` ADD \`mot_de_passe\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`department\` CHANGE \`responsable_id\` \`responsable_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`leave_request\` DROP FOREIGN KEY \`FK_cbfa58135b7b1b847147e81ac04\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`leave_request\` DROP FOREIGN KEY \`FK_6658c4d15d233d0796af5d2a847\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`leave_request\` CHANGE \`date_soumission\` \`date_soumission\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`leave_request\` CHANGE \`commentaire\` \`commentaire\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`leave_request\` CHANGE \`employeId\` \`employeId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`leave_request\` CHANGE \`typeCongeId\` \`typeCongeId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee\` DROP FOREIGN KEY \`FK_4bec475144f7d63421684dfc595\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee\` CHANGE \`departementId\` \`departementId\` int NULL`,
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
    await queryRunner.query(
      `ALTER TABLE \`employee\` CHANGE \`departementId\` \`departementId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee\` ADD CONSTRAINT \`FK_4bec475144f7d63421684dfc595\` FOREIGN KEY (\`departementId\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`leave_request\` CHANGE \`typeCongeId\` \`typeCongeId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`leave_request\` CHANGE \`employeId\` \`employeId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`leave_request\` CHANGE \`commentaire\` \`commentaire\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`leave_request\` CHANGE \`date_soumission\` \`date_soumission\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`leave_request\` ADD CONSTRAINT \`FK_6658c4d15d233d0796af5d2a847\` FOREIGN KEY (\`typeCongeId\`) REFERENCES \`leave_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`leave_request\` ADD CONSTRAINT \`FK_cbfa58135b7b1b847147e81ac04\` FOREIGN KEY (\`employeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`department\` CHANGE \`responsable_id\` \`responsable_id\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee\` DROP COLUMN \`mot_de_passe\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`employee\` DROP INDEX \`IDX_817d1d427138772d47eca04885\``,
    );
    await queryRunner.query(`ALTER TABLE \`employee\` DROP COLUMN \`email\``);
    await queryRunner.query(
      `ALTER TABLE \`employee\` ADD \`solde_conge\` int NOT NULL DEFAULT '0'`,
    );
  }
}
