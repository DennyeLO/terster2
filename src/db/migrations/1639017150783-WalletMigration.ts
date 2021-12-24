import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class WalletMigration1639017150783 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'wallet',
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
                        name: 'balance',
                        type: 'decimal(14,2)',
                        default: "0.00",
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
            'wallet',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedTableName: 'user',
                referencedColumnNames: ['id']
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE wallet');
    }

}
