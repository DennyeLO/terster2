import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CardResultMigration1638696325949 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'card_result',
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
                      name: 'step',
                      type: 'boolean',
                  },
                  {
                      name: 'touch',
                      type: 'int',
                      default: '0'
                  },
                  {
                      name: 'card',
                      type: 'varchar',
                  },
                  {
                      name: 'rank',
                      type: 'varchar',
                  },
                  {
                      name: 'status_game',
                      type: 'boolean',
                      default: 'false'
                  },
                  {
                      name: 'status_player',
                      type: 'boolean',
                      default: 'false'
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
          'card_result',
          new TableForeignKey({
              columnNames: ['user_id'],
              referencedTableName: 'user',
              referencedColumnNames: ['id']
          })
        );

        await queryRunner.createForeignKey(
          'card_result',
          new TableForeignKey({
              columnNames: ['room_id'],
              referencedTableName: 'room',
              referencedColumnNames: ['id']
          })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE card_result');
    }

}
