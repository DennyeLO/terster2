import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class BetMigration1638696639892 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'bet',
              columns: [
                  {
                      name: 'id',
                      type: 'int',
                      isPrimary: true,
                      isGenerated: true,
                      generationStrategy: 'increment',
                  },
                  {
                      name: 'user_id',
                      type: 'int'
                  },
                  {
                      name: 'room_id',
                      type: 'int',
                  },
                  {
                      name: 'result_id',
                      type: 'int',
                  },
                  {
                      name: 'amount',
                      type: 'decimal(14,2)',
                      unsigned: true
                  },
                  {
                      name: 'created_at',
                      type: 'datetime',
                      default: 'CURRENT_TIMESTAMP'
                  },
                  {
                      name: 'updated_at',
                      type: 'datetime',
                      default: 'CURRENT_TIMESTAMP'
                  },
              ]
          })
        );

        await queryRunner.createForeignKey(
          'bet',
          new TableForeignKey({
              columnNames: ['user_id'],
              referencedTableName: 'user',
              referencedColumnNames: ['id']
          })
        );

        await queryRunner.createForeignKey(
          'bet',
          new TableForeignKey({
              columnNames: ['room_id'],
              referencedTableName: 'room',
              referencedColumnNames: ['id']
          })
        );

        await queryRunner.createForeignKey(
          'bet',
          new TableForeignKey({
              columnNames: ['result_id'],
              referencedTableName: 'card_result',
              referencedColumnNames: ['id']
          })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE bet');
    }

}
