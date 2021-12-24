import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreditMigration1639021111478 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'credit',
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
            'credit',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedTableName: 'user',
                referencedColumnNames: ['id']
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
