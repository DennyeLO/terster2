import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreditUserTransactionMigration1639024276857 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'credit_user_transaction',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'credit_id',
                        type: 'int'
                    },
                    {
                        name: 'opening_balance',
                        type: 'decimal(14,2)',
                        unsigned: true
                    },
                    {
                        name: 'amount',
                        type: 'decimal(14,2)',
                        unsigned: true
                    },
                    {
                        name: 'closing_balance',
                        type: 'decimal(14,2)',
                        unsigned: true
                    },
                    {
                        name: 'type',
                        type: 'varchar'
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
            'credit_user_transaction',
            new TableForeignKey({
                columnNames: ['credit_id'],
                referencedTableName: 'credit',
                referencedColumnNames: ['id']
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
