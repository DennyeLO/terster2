import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class UserMigration1638585874479 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'user',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'username',
                  type: 'varchar',
                  isNullable: false,
                  isUnique: true
                },
                {
                  name: 'email',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'password',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'player_name',
                  type: 'varchar',
                  isNullable: false,
                  isUnique: true
                },
                {
                  name: 'phone',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'status',
                  type: 'boolean',
                  isNullable: false,
                  default: 'true'
                },
                {
                  name: 'created_at',
                  type: 'datetime',
                  isNullable: false,
                  default:'CURRENT_TIMESTAMP'
                },
                {
                  name: 'updated_at',
                  type: 'datetime',
                  isNullable: false,
                  default: 'CURRENT_TIMESTAMP'
                },
              ],
            }),
            false,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE user`)
    }

}
