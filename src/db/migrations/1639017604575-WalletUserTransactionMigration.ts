import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class WalletUserTransactionMigration1639017604575 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'wallet_user_transaction',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'wallet_id',
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
                        name: 'detailable_type',
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
            'wallet_user_transaction',
            new TableForeignKey({
                columnNames: ['wallet_id'],
                referencedTableName: 'wallet',
                referencedColumnNames: ['id']
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE wallet_user_transaction');
    }

}
